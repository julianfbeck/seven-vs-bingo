import { GetServerSideProps, NextPage } from "next";
import { CustomHeader } from "../lib/CustomHeader";
import Navbar from "../lib/navbar";

import { prisma } from "../server/db/client";
import { Projection } from "@prisma/client";
import CardTable from "../lib/CardTable";

interface KartenProps {
  projections: Projection[];
}
export const getServerSideProps: GetServerSideProps<KartenProps> = async ({
  res,
}) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=120"
  );
  const score = await prisma.projection.findMany({
    orderBy: [
      {
        hasBecomeTrue: "desc",
      },
      {
        difficulty: "asc",
      },
    ],
    where: {
      isApproved: true,
    },
  });

  return {
    props: {
      projections: JSON.parse(JSON.stringify(score)),
    },
  };
};

const Punkte: NextPage<KartenProps> = ({ projections }) => {
  return (
    <>
      <Navbar />
      <CustomHeader title="Alle Bingo Karten" />

      <main className="min-h-screen bg-black p-2">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-10 lg:px-12">
          <h1 className="text-4xl font-extrabold tracking-tight leading-none  md:text-5xl lg:text-6xl text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-700 via-green-500 to-lime-500">
              Bingo Karten:
            </span>
          </h1>
          <div className="text-gray-200 mt-5">
            Liste aller Bingo Ereignisse die von der Community erstellt wurden
            und von uns als Bingo Karten freigeschaltet wurden. Bingo Karten die
            eingetroffen sind werden grün angezeigt.
          </div>
        </div>
        <div>
          <CardTable projections={projections || []} />
        </div>
      </main>
    </>
  );
};

export default Punkte;
