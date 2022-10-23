import type { GetServerSideProps, NextPage } from "next";
import { CustomHeader } from "../../lib/CustomHeader";
import Navbar from "../../lib/navbar";
import SharedBoard from "../../lib/SharedBoard";
import { prisma } from "../../server/db/client";
import { bingoWinningEntries } from "../../server/router/points";
import { trpc } from "../../utils/trpc";

interface SharedBoardProps {
  points: number[][];
  username: string;
  boardId: string;
}
export const getServerSideProps: GetServerSideProps<SharedBoardProps> = async (
  context
) => {
  const id = context.query.boardId;
  if (!id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const user = await prisma.user.findUnique({
    where: {
      shareId: id as string,
    },
  });
  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const entries = await prisma.bingoEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      projection: {
        select: {
          id: true,
          text: true,
          isApproved: true,
          hasBecomeTrue: true,
        },
      },
      position: true,
      userId: true,
      id: true,
      projectionId: true,
    },
  });
  // get positions that win
  // get positions that win
  const winningPositions = entries
    .filter((e) => e.projection.hasBecomeTrue)
    .map((entry) => entry.position);
  // check if any of the winning positions are in the winning entries
  const points = bingoWinningEntries.filter((winningEntry) => {
    return winningEntry.every((position) =>
      winningPositions.includes(position)
    );
  });

  return {
    props: {
      username: user.name || "Unknown User",
      points: points,
      boardId: id as string,
    },
  };
};
const SharedBoardPage: NextPage<SharedBoardProps> = ({
  username,
  points,
  boardId,
}) => {
  const { data: entries } = trpc.useQuery([
    "auth.bingoEntries.getByBoardId",
    { boardId: boardId },
  ]);
  return (
    <>
      <Navbar />
      <CustomHeader title={username + " Bingo Board"} />

      <main className="min-h-screen bg-black">
        {entries && (
          <SharedBoard entries={entries} points={points} username={username} />
        )}
      </main>
    </>
  );
};

export default SharedBoardPage;
