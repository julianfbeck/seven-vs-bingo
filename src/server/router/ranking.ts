import { createRouter } from "./context";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const rankingRouter = createRouter()
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
      return await ctx.prisma.ranking.findUnique({
        where: {
          userId: ctx.session.user.id,
        },
      });
    },
  })
  .mutation("Insert", {
    input: z.object({
      candidateOneRanking: z.number(),
      candidateTwoRanking: z.number(),
      candidateThreeRanking: z.number(),
      candidateFourRanking: z.number(),
      candidateFiveRanking: z.number(),
      candidateSixRanking: z.number(),
      candidateSevenRanking: z.number(),
    }),
    async resolve({ ctx, input }) {
      if (!ctx.session?.user?.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      try {
        await ctx.prisma.ranking.upsert({
          //todo add filter ranking for user
          where: {
            userId: ctx.session.user.id,
          },
          create: {
            candidateOneRanking: input.candidateOneRanking,
            candidateTwoRanking: input.candidateTwoRanking,
            candidateThreeRanking: input.candidateThreeRanking,
            candidateFourRanking: input.candidateFourRanking,
            candidateFiveRanking: input.candidateFiveRanking,
            candidateSixRanking: input.candidateSixRanking,
            candidateSevenRanking: input.candidateSevenRanking,
            userId: ctx.session?.user?.id,
          },
          update: {
            candidateOneRanking: input.candidateOneRanking,
            candidateTwoRanking: input.candidateTwoRanking,
            candidateThreeRanking: input.candidateThreeRanking,
            candidateFourRanking: input.candidateFourRanking,
            candidateFiveRanking: input.candidateFiveRanking,
            candidateSixRanking: input.candidateSixRanking,
			candidateSevenRanking: input.candidateSevenRanking,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  });
