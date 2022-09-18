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
      description: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (input.text.length > 50) {
        throw new Error("Text too long");
      }
      try {
        await ctx.prisma.projection.create({
          data: {
            text: input.text,
            description: input.description,

          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  });
