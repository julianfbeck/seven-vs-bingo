import { NextPage } from "next";
import { CustomHeader } from "../lib/CustomHeader";
import Navbar from "../lib/navbar";

const Bingo: NextPage = () => {
  return (
    <>
      <Navbar />
      <CustomHeader title="Dein 7 vs. Wild Bingo" />

      <main className="min-h-screen bg-black ">
	  <div className="pt-10 text-left max-w-screen-lg">
          <h1 className="pt-10  sm:px-16 xl:px-48 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-700 via-green-500 to-lime-500">
              About
            </span>
          </h1>
        </div>

        <div className="pt-10 text-left max-w-screen-lg p-2">
          <p className="text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-400 ">
            7 vs. Wild Bingo ist eine Webseite, die von Fans für Fans erstellt
            wurde. Wir sind keine offizielle Seite und haben keinen Kontakt zu dem 7 vs. Wild Team. Wir hoffen ihr habt Spaß beim Spielen!
          </p>
          <p className="mt-5 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-400">
            Die Webseite wurde erstellt von{" "}
            <a
              href="https://twitter.com/julianfbeck"
              className="underline decoration-lime-500 font-bold"
            >
              julianfbeck
            </a>{" "}
            .
          </p>
        </div>
      </main>
    </>
  );
};

export default Bingo;
