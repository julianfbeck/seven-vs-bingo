import { createRouter } from "./context";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";

export const bingoEntriesRouter = createRouter()
  .query(".getByBoardId", {
    input: z.object({
      boardId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const user = await ctx.prisma.user.findUnique({
        where: {
          shareId: input.boardId,
        },
      });
      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return await ctx.prisma.bingoEntry.findMany({
        where: {
          userId: user.id,
        },
        include: {
          projection: true,
        },
      });
    },
  })
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
  .query("Feedback.get", {
    async resolve({ ctx }) {
      if (!ctx.session?.user?.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return await ctx.prisma.feedback.findMany();
    },
  })
  .mutation("Feedback", {
    input: z.object({
      text: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (!ctx.session?.user?.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      await ctx.prisma.feedback.create({
        data: {
          text: input.text,
          userId: ctx.session.user.id,
        },
      });
    },
  })
  .mutation("Feedback.delete", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (!ctx.session?.user?.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      await ctx.prisma.feedback.delete({
        where: {
          id: input.id,
        },
      });
    },
  })

  .mutation("Generate", {
    input: z.object({
      projections: z.array(z.string()),
    }),
    async resolve({ ctx, input }) {
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
        // generate random id to share the bingo board
        await ctx.prisma.user.update({
          where: {
            id: ctx.session?.user?.id || "",
          },
          data: {
            shareId: nanoid(12),
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    },
  });
