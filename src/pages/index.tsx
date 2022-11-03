import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";
import { CustomHeader } from "../lib/CustomHeader";
import Navbar from "../lib/navbar";
import Projections from "../lib/NewProjection";
import { ProjectionList } from "../lib/ProjectionList";
import ScoreBoard from "../lib/ScoreBoard";
import { Steps } from "../lib/Steps";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: entries } = trpc.useQuery(["projection.getAll"]);
  return (
    <>
      <Navbar />
      <CustomHeader title="7 vs. Wild Bingo" />

      <main className="min-h-screen bg-black p-2">
        <div className="max-w-screen-xl mx-auto container">
          <div className="py-10">
            <div className="container mx-auto">
              <div className=" mx-20 text-2xl font-extrabold tracking-tight leading-none  md:text-3xl lg:text-3xl text-white">
                {entries && (
                  <Typewriter
                    words={
                      entries
                        ?.map((entry) => entry.text)
                        .sort(() => 0.5 - Math.random()) || []
                    }
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
                Deine Ideen für das <br></br>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-700 via-green-500 to-lime-500">
                  7 vs. Wild {""}
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
        </div>
        <div className="container max-w-screen-xl  mx-auto flex flex-wrap mt-10">
          <div className="flex flex-wrap w-full justify-center md:justify-start">
            <Link href={"/bingo"}>
              <button className="button py-4 px-4 items-center text-sm font-medium text-center text-white bg-gradient-to-r from-green-700 to-green-500  rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-800 mr-2 ml-1">
                Erstelle jetzt dein eignes Board
              </button>
            </Link>
          </div>
        </div>

        <Steps />
        <div className="container mx-auto">
          <div className="grid grid-cols-1 content-center md:grid-cols-2 gap-3 ">
            <div className="justify-center justify-self-center ">
              <ProjectionList projections={entries || []} />
            </div>

            <div className="justify-center justify-self-center md:justify-start md:justify-self-start order-first md:order-last mt-20 col-span-1 ">
              <ScoreBoard />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
