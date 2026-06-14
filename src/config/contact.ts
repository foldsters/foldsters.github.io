// Convex HTTP endpoint for the contact form.
// After `npx convex deploy` (or `npx convex dev`), Convex prints a URL like
//   https://wonderful-pelican-123.convex.site
// Use the `.convex.site` form (HTTP actions), NOT the `.convex.cloud` form
// (that one's for query/mutation RPC). Append `/contact` for the route.
//
// Swap this string with your prod deployment's URL. The dev deployment can
// keep using the same URL — Convex isolates dev/prod by project, not URL.
export const CONTACT_ENDPOINT =
  "https://valuable-seal-156.convex.site/contact";
