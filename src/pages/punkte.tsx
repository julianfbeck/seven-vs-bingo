import { GetServerSideProps, NextPage } from "next";
import { CustomHeader } from "../lib/CustomHeader";
import Navbar from "../lib/navbar";
import PointTable from "../lib/PointTable";

import { prisma } from "../server/db/client";
import { Score } from "@prisma/client";

interface PointsProps {
  score: Score[];
}
export const getServerSideProps: GetServerSideProps<PointsProps> = async ({
  res,
}) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=120"
  );
  const score = await prisma.score.findMany({
    orderBy: {
      score: "desc",
    },
  });

  return {
    props: {
      score: JSON.parse(JSON.stringify(score)),
    },
  };
};

const Punkte: NextPage<PointsProps> = ({ score }) => {
  return (
    <>
      <Navbar />
      <CustomHeader title="7 vs. Wild Bingo Punkte" />

      <main className="min-h-screen bg-black p-2">
        <div className="pt-8 px-4 mx-auto max-w-screen-xl text-center lg:pt-10 lg:px-12">
          <h1 className="text-4xl font-extrabold tracking-tight leading-none  md:text-5xl lg:text-6xl text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-700 via-green-500 to-lime-500">
              Punkte:
            </span>
          </h1>
        </div>
        <div>
          <PointTable score={score || []} />
        </div>
      </main>
    </>
  );
};

export default Punkte;
