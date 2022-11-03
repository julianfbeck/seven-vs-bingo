import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Board from "../lib/Board";
import { CreateBoard } from "../lib/CreateBoard";
import { CustomHeader } from "../lib/CustomHeader";
import Navbar from "../lib/navbar";
import { prisma } from "../server/db/client";

interface BingoPageProps {
  count: number | undefined;
  boardId: string | undefined;
}
export const getServerSideProps: GetServerSideProps<BingoPageProps> = async (
  context
) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "api/auth/signin",
        permanent: false,
      },
    };
  }
  let count = await prisma.bingoEntry.count({
    where: {
      userId: session?.user?.id,
    },
  });

  //reset board for undefined state
  if (count !== 0 && count !== 25) {
    await prisma.bingoEntry.deleteMany({
      where: {
        userId: session?.user?.id,
      },
    });
    count = 0;
  }
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id || "",
    },
  });

  return {
    props: {
      count: count,
      boardId: user?.shareId || "Undefined",
    },
  };
};

const Bingo: NextPage<BingoPageProps> = ({ count, boardId }) => {
  const getState = () => {
    if (count === 0) {
      return <CreateBoard />;
    } else if (count === 25) {
      return <Board boardId={boardId || "Unknown"} />;
    } else {
      return <>Empty Board</>;
    }
  };

  return (
    <>
      <Navbar />
      <CustomHeader title="Dein 7 vs. Wild Bingo" />

      <main className="min-h-screen bg-black">{getState()}</main>
    </>
  );
};

export default Bingo;
