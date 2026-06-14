import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const ALLOWED_ORIGINS = new Set([
  "https://foldsters.com",
  "https://www.foldsters.com",
  "http://localhost:4321",
  "http://localhost:4322",
]);

const TIER_LABELS: Record<string, string> = {
  "asset-pack": "Asset Pack",
  "live-integration": "Live Integration",
  "end-to-end": "End-to-End Pipeline",
  partnership: "Ongoing Tooling Partnership",
  donation: "Donation",
  "not-sure": "Not sure yet",
};

const FROM = "Foldster's Projects <hello@foldsters.com>";
const NOTIFY_TO = "foldster@foldsters.com";

function corsHeaders(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.has(origin) ? origin : "https://foldsters.com";
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function notifyHtml(d: {
  name: string;
  email: string;
  creatorHandle?: string;
  tierLabel: string;
  message: string;
}) {
  return `<table style="font-family:-apple-system,system-ui,sans-serif;color:#2c3d42;max-width:560px;line-height:1.55">
    <tr><td style="padding:0 0 14px;font-size:15px"><strong>New inquiry</strong></td></tr>
    <tr><td style="padding:3px 0"><strong>Project type:</strong> ${escapeHtml(d.tierLabel)}</td></tr>
    <tr><td style="padding:3px 0"><strong>Name:</strong> ${escapeHtml(d.name)}</td></tr>
    <tr><td style="padding:3px 0"><strong>Email:</strong> <a href="mailto:${escapeHtml(d.email)}" style="color:#487d90">${escapeHtml(d.email)}</a></td></tr>
    ${d.creatorHandle ? `<tr><td style="padding:3px 0"><strong>Handle:</strong> ${escapeHtml(d.creatorHandle)}</td></tr>` : ""}
    <tr><td style="padding:14px 0 4px"><strong>What do you want it to feel like?</strong></td></tr>
    <tr><td style="padding:4px 0;white-space:pre-wrap">${escapeHtml(d.message)}</td></tr>
  </table>`;
}

function confirmHtml(d: { name: string; tierLabel: string; creatorHandle?: string; message: string }) {
  return `<table style="font-family:-apple-system,system-ui,sans-serif;color:#2c3d42;max-width:560px;line-height:1.55">
    <tr><td style="padding:0 0 12px;font-size:16px">Hi ${escapeHtml(d.name)},</td></tr>
    <tr><td style="padding:0 0 12px">Thanks for reaching out about a <strong>${escapeHtml(d.tierLabel)}</strong> project. We&rsquo;ve got your submission and will reply within one week.</td></tr>
    <tr><td style="padding:14px 0 4px;font-size:13px;color:#487d90;border-top:1px solid rgba(44,61,66,0.18)"><strong>Copy of what you sent:</strong></td></tr>
    ${d.creatorHandle ? `<tr><td style="padding:4px 0;font-size:13px"><strong>Handle:</strong> ${escapeHtml(d.creatorHandle)}</td></tr>` : ""}
    <tr><td style="padding:8px 0;font-size:13px;white-space:pre-wrap">${escapeHtml(d.message)}</td></tr>
    <tr><td style="padding:18px 0 0;font-size:13px;color:rgba(44,61,66,0.7)">&mdash; Foldster&rsquo;s Projects &middot; <a href="https://foldsters.com" style="color:#487d90">foldsters.com</a></td></tr>
  </table>`;
}

async function sendEmail(payload: {
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  replyTo: string;
  subject: string;
  html: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY env var not set on Convex deployment");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: payload.from,
      to: payload.to,
      ...(payload.cc && payload.cc.length > 0 ? { cc: payload.cc } : {}),
      ...(payload.bcc && payload.bcc.length > 0 ? { bcc: payload.bcc } : {}),
      reply_to: payload.replyTo,
      subject: payload.subject,
      html: payload.html,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend ${res.status}: ${text}`);
  }
}

const submitContact = httpAction(async (ctx, request) => {
  const origin = request.headers.get("origin");
  const headers = { ...corsHeaders(origin), "Content-Type": "application/json" };

  let body: Record<string, string>;
  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      body = await request.json();
    } else {
      const form = await request.formData();
      body = {};
      form.forEach((value, key) => {
        if (typeof value === "string") body[key] = value;
      });
    }
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "bad_payload" }), { status: 400, headers });
  }

  // Honeypot: bots fill every visible field; this hidden one stays empty for humans.
  if (body.website && body.website.trim() !== "") {
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const creatorHandle = (body.creator_handle ?? "").trim() || undefined;
  const projectType = (body.project_type ?? "not-sure").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ ok: false, error: "missing_fields" }), { status: 400, headers });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return new Response(JSON.stringify({ ok: false, error: "bad_email" }), { status: 400, headers });
  }
  if (name.length > 200 || email.length > 320 || message.length > 8000) {
    return new Response(JSON.stringify({ ok: false, error: "too_long" }), { status: 400, headers });
  }

  const tierLabel = TIER_LABELS[projectType] ?? projectType;

  await ctx.runMutation(internal.submissions.save, {
    name,
    email,
    creatorHandle,
    projectType,
    message,
    userAgent: request.headers.get("user-agent") ?? undefined,
    createdAt: Date.now(),
  });

  // Notify Matt
  await sendEmail({
    from: FROM,
    to: [NOTIFY_TO],
    replyTo: email,
    subject: `New ${tierLabel} inquiry — ${name}`,
    html: notifyHtml({ name, email, creatorHandle, tierLabel, message }),
  });

  // Confirm to submitter (echo back what they sent). CC Matt's domain
  // address — visible to the submitter (signals an institutional kickoff
  // contact, not just a Gmail) — and gives Matt a copy he can Reply All
  // to so his response continues the confirmation thread. (Plain Reply
  // goes to NOTIFY_TO via Reply-To; Reply All adds the submitter from
  // the To: line.)
  await sendEmail({
    from: FROM,
    to: [email],
    cc: [NOTIFY_TO],
    replyTo: NOTIFY_TO,
    subject: `Foldster's Projects — ${name}'s ${tierLabel} inquiry`,
    html: confirmHtml({ name, tierLabel, creatorHandle, message }),
  });

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
});

const corsPreflight = httpAction(async (_ctx, request) => {
  return new Response(null, {
    status: 204,
    headers: {
      ...corsHeaders(request.headers.get("origin")),
      "Access-Control-Max-Age": "86400",
    },
  });
});

const http = httpRouter();
http.route({ path: "/contact", method: "POST", handler: submitContact });
http.route({ path: "/contact", method: "OPTIONS", handler: corsPreflight });

export default http;
