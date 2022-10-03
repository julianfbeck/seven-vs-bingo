import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import Navbar from "../lib/navbar";
import Projections from "../lib/NewProjection";
import { ProjectionList } from "../lib/ProjectionList";
import ScoreBoard from "../lib/ScoreBoard";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: entries } = trpc.useQuery(["projection.getAll"]);
  return (
    <>
      <Navbar />
      <Head>
        <title>Seven vs. Wild Bingo</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-black p-2">
        <div className="flex items-center py-10">
          <div className="container mx-auto">
            <div className=" mx-20 text-2xl font-extrabold tracking-tight leading-none  md:text-3xl lg:text-3xl text-white">
              {entries && (
                <Typewriter
                  words={entries?.map((entry) => entry.text) || []}
                  loop={5}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              )}
            </div>
          </div>
        </div>
        <div className="container mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full xl:w-2/5 lg:w-2/3 justify-center lg:items-start overflow-y-hidden">
            <h1 className="my-4 text-3xl md:text-5xl text-white font-bold leading-tight text-center md:text-left">
              Deine Ideen für das{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-900 via-green-500 to-lime-500">
                Seven vs. Wild {""}
              </span>
              Bingo
            </h1>
            <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left text-gray-500">
              Füge hier deine Ideen für das Seven vs. Wild Bingo ein und
              erstelle dir eine eigene Bingo Karte für die zweite Staffel von
              Seven vs. Wild.
            </p>
            <Projections />
          </div>
          <div className="w-full xl:w-3/5 lg:w-1/3 overflow-hidden justify-center hidden pl-10 lg:block">
            <Image
              className="mx-auto w-full md:w-4/5 rounded-3xl flex-col"
              src="/startpage.png"
              width={400}
              height={400}
              alt="Seven vs. Wild Bingo"
            />
          </div>
        </div>
        <div className="flex justify-center flex-row flex-wrap-reverse  space-x-20">
          <div className="">
            <ProjectionList projections={entries || []} />
          </div>

          <div className="flex-none flex-row-reverse mt-24">
            <ScoreBoard />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
