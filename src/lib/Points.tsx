import { BingoEntry, Projection } from "@prisma/client";
import Head from "next/head";
import Navbar from "../lib/navbar";
import { Constants } from "../utils/points";

interface PointsProps {
  points: number[][];
  entries: (BingoEntry & {
    projection: Projection;
  })[];
}

const Points = ({ points, entries }: PointsProps) => {
  return (
    <>
      <div className="py-8 px-4 mx-auto max-w-screen-lg lg:py-10 lg:px-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Deine Punkte:
        </h1>
        <table className="w-full">
          <tbody className="border-cyan-50">
            {entries
              .filter((filter) => filter.projection.hasBecomeTrue)
              .map((entries) => (
                <tr
                  key={entries.id}
                  className=" bg-gray-800 hover:cursor-pointer hover:bg-gray-700 transform duration-150 last:border-0"
                >
                  <td className="px-6 py-4 whitespace-no-wrap ">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <div className="text-sm leading-5 font-medium text-gray-100">
                          {entries.projection.text}
                        </div>
                        <div className="text-sm font-thin leading-5 text-gray-300">
                          {entries.projection.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center lg:table-cell">
                    <div className="text-sm leading-5 text-gray-200">
                      Richtiges Field
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white text-lg font-bold text-right flex-none ">
                    + {Constants.PointsPerCorrectEntry}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      k
    </>
  );
};

export default Points;
