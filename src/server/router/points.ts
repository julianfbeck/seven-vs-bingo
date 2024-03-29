import { createRouter } from "./context";
import { TRPCError } from "@trpc/server";
import { Constants, indexToPoints } from "../../utils/constants";
import { z } from "zod";
import { Projection } from "@prisma/client";

export const bingoWinningEntries = [
  //rows
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25],
  //collums
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
  [5, 10, 15, 20, 25],
  //diagonals
  [1, 7, 13, 19, 25],
  [5, 9, 13, 17, 21],
];

export const pointsRouter = createRouter()
  .query("highscore", {
    async resolve({ ctx }) {
      return await ctx.prisma.score.findMany({
        orderBy: {
          score: "desc",
        },
        take: 10,
      });
    },
  })
  .query("highscore.all", {
    async resolve({ ctx }) {
      return await ctx.prisma.score.findMany({
        orderBy: {
          score: "desc",
        },
      });
    },
  })
  .mutation("Open", {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.userId,
        },
      });
      return user?.shareId;
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
  .query(".get", {
    async resolve({ ctx }): Promise<number[][]> {
      if (!ctx.session?.user?.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const entries = await ctx.prisma.bingoEntry.findMany({
        where: {
          userId: ctx.session.user.id,
        },
        include: {
          projection: true,
        },
      });

      // get positions that win
      const winningPositions = entries
        .filter((e) => e.projection.hasBecomeTrue)
        .map((entry) => entry.position);

      // check if any of the winning positions are in the winning entries
      return bingoWinningEntries.filter((winningEntry) => {
        return winningEntry.every((position) =>
          winningPositions.includes(position)
        );
      });
    },
  })
  .query(".getPlace", {
    async resolve({ ctx }): Promise<number> {
      const score = await ctx.prisma.score.findMany({
        orderBy: {
          score: "desc",
        },
      });
      if (!ctx.session?.user?.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return score.findIndex((s) => s.userId === ctx.session?.user?.id) + 1;
    },
  })
  .mutation(".recalculate", {
    async resolve({ ctx }) {
      if (!ctx.session?.user?.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      //check if user is admin
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });
      if (!user?.role?.includes("admin")) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      // get all users
      const users = await ctx.prisma.user.findMany();

      // get all projections
      const projections = await ctx.prisma.projection.findMany();

      //iterate over users
      for (const user of users) {
        const entries = await ctx.prisma.bingoEntry.findMany({
          where: {
            userId: user.id,
          },
        });
        if (entries.length > 0) {
          const winningPositions = entries
            .filter(
              (e) =>
                getProjectionById(e.projectionId, projections)?.hasBecomeTrue
            )
            .map((entry) => entry.position);

          // check if any of the winning positions are in the winning entries
          const positionArray = bingoWinningEntries.filter((winningEntry) => {
            return winningEntry.every((position) =>
              winningPositions.includes(position)
            );
          });
          const pointsTotal = entries
            .filter(
              (entry) =>
                getProjectionById(entry.projectionId, projections)
                  ?.hasBecomeTrue
            )
            .reduce((acc, entry) => {
              return (
                acc +
                indexToPoints(
                  getProjectionById(entry.projectionId, projections)
                    ?.difficulty || 0
                )
              );
            }, 0);

          // calculate points for rings
          const bingoPoints = positionArray.reduce((acc, row) => {
            const currentPositions = entries.filter((entry) =>
              row.includes(entry.position)
            );
            const currentPoints = currentPositions.reduce((acc, entry) => {
              return (
                acc +
                indexToPoints(
                  getProjectionById(entry.projectionId, projections)
                    ?.difficulty || 0
                )
              );
            }, 0);

            return acc + currentPoints * Constants.MultiplierPerBingo;
          }, 0);
          await ctx.prisma.score.upsert({
            where: {
              userId: user.id,
            },
            create: {
              userId: user.id,
              score: pointsTotal + bingoPoints,
              userName: user.name ?? "Unknown User",
            },
            update: {
              score: pointsTotal + bingoPoints,
            },
          });
        }
      }
    },
  });

function getProjectionById(id: string, projections: Projection[]) {
  return projections.find((projection) => projection.id === id);
}
