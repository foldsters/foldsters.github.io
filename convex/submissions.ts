import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const save = internalMutation({
  args: {
    name: v.string(),
    email: v.string(),
    creatorHandle: v.optional(v.string()),
    projectType: v.string(),
    message: v.string(),
    userAgent: v.optional(v.string()),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("submissions", args);
  },
});
