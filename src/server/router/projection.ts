import { createRouter } from "./context";
import { z } from "zod";

export const projectionRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.projection.findMany();
    },
  })
  .mutation("Insert", {
    input: z.object({
      text: z.string(),
    }),
    async resolve({ ctx, input }) {
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
  });
