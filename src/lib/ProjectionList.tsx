import { Typewriter } from "react-simple-typewriter";
import { trpc } from "../utils/trpc";

export const ProjectionList = () => {
  const { data: entries } = trpc.useQuery(["projection.getAll"]);
  return (
    <>
      <div className="mt-20 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
        <Typewriter
          words={entries?.map((entry) => entry.text) || []}
          loop={5}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </div>
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-10 lg:px-12">
        <h1 className="mt-9 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
          Aktuelle Bingo Karten
        </h1>
      </div>
      {entries?.map((entry) => (
        <div
          key={entry.id}
          className="p-6 max-w-md bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mb-4"
        >
          <div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {entry.text}
            </h5>
          </div>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {entry.description}
          </p>
        </div>
      ))}
    </>
  );
};
