import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  submissions: defineTable({
    name: v.string(),
    email: v.string(),
    creatorHandle: v.optional(v.string()),
    projectType: v.string(),
    message: v.string(),
    userAgent: v.optional(v.string()),
    createdAt: v.number(),
  }).index("byCreatedAt", ["createdAt"]),
});
