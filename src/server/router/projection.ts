import { Projection } from "@prisma/client";
import { createRouter } from "./context";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const projectionRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.projection.findMany({
        where: {
          isApproved: true,
        },
        orderBy: {
          hasBecomeTrue: "desc",
        },
      });
    },
  })

  .query("getAll.current", {
    async resolve({ ctx }) {
      return await ctx.prisma.projection.findMany({
        where: {
          isApproved: true,
          hasBecomeTrue: false,
        },
        orderBy: {
          difficulty: "asc",
        },
      });
    },
  })
  .mutation("Insert", {
    input: z.object({
      text: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (input.text.length > 50) {
        throw new Error("Text too long");
      }
      if (input.text.length > 300) {
        throw new Error("Text too long");
      }
      try {
        await ctx.prisma.projection.create({
          data: {
            text: input.text,
          },
        });
      } catch (error) {
        console.log(error);
      }
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
  .query("auth.getAllNew", {
    async resolve({ ctx }) {
      return await ctx.prisma.projection.findMany({
        where: {
          isApproved: false,
        },
      });
    },
  })
  .mutation("auth.Approve", {
    input: z.object({
      id: z.string(),
    }),
    //TODO: add check if user is admin
    async resolve({ ctx, input }) {
      try {
        await ctx.prisma.projection.update({
          where: {
            id: input.id,
          },
          data: {
            isApproved: true,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  })
  .mutation("auth.Delete", {
    input: z.object({
      id: z.string(),
    }),
    //TODO: add check if user is admin
    async resolve({ ctx, input }) {
      try {
        await ctx.prisma.projection.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  })
  .mutation("auth.Update", {
    input: z.object({
      id: z.string(),
      text: z.string(),
      points: z.number(),
    }),
    //TODO add check if user is admin
    async resolve({ ctx, input }) {
      if (input.text.length > 50) {
        throw new Error("Text too long");
      }
      if (input.text.length > 300) {
        throw new Error("Text too long");
      }
      try {
        await ctx.prisma.projection.update({
          where: {
            id: input.id,
          },
          data: {
            text: input.text,
            difficulty: input.points,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  })
  .mutation("auth.HasBecomeTrue", {
    input: z.object({
      id: z.string(),
    }),
    //TODO add check if user is admin
    async resolve({ ctx, input }) {
      try {
        await ctx.prisma.projection.update({
          where: {
            id: input.id,
          },
          data: {
            hasBecomeTrue: true,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  })
  .query("getAllModal", {
    async resolve({ ctx }) {
      if (!ctx.session?.user?.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const response = await ctx.prisma.projection.findMany({
        where: {
          isApproved: true,
          hasBecomeTrue: false,
        },
        include: {
          bingoEntries: true,
        },
      });
      //remove all entries that are already in the users bingo
      const filteredResponse = response.filter((projection) => {
        return projection.bingoEntries.every((bingoEntry) => {
          return bingoEntry.userId !== ctx.session?.user?.id;
        });
      });

      return filteredResponse as Projection[];
    },
  });
