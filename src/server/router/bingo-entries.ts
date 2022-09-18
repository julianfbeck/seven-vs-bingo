import { createRouter } from "./context";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const bingoEntriesRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    // Any queries or mutations after this middleware will
    // raise an error unless there is a current session
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  })
  .query("get", {
    async resolve({ ctx }) {
      if (!ctx.session?.user?.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return await ctx.prisma.bingoEntry.findMany({
        where: {
          userId: ctx.session.user.id,
        },
        include: {
          projection: true,
        },
      });
    },
  })
  .mutation("Insert", {
    input: z.object({
      position: z.number(),
      projectionId: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (!ctx.session?.user?.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      await ctx.prisma.bingoEntry.upsert({
        where: {
          position_userId: {
            position: input.position,
            userId: ctx.session.user.id,
          },
        },
        create: {
          userId: ctx.session?.user?.id,
          position: input.position,
          projectionId: input.projectionId,
        },
        update: {
          projectionId: input.projectionId,
        },
      });
    },
  });
