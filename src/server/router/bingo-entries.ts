import { prisma } from "./../db/client";
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
  .mutation("Generate", {
    input: z.object({
      projections: z.array(z.string()),
    }),
    async resolve({ ctx, input }) {
      console.log("input", input);
      if (input.projections.length !== 25) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
      try {
        //shuffle the array
        const shuffled = input.projections.sort(() => 0.5 - Math.random());

        await ctx.prisma.bingoEntry.deleteMany({
          where: {
            userId: ctx.session?.user?.id,
          },
        });

        if (!ctx.session?.user?.id) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }
        await ctx.prisma.bingoEntry.createMany({
          data: shuffled.map((projectionId, index) => ({
            userId: ctx.session?.user?.id || "",
            position: index + 1,
            projectionId,
          })),
        });
      } catch (error) {
        console.log("error", error);
      }
    },
  });
