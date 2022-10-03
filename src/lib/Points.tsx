import { BingoEntry, Projection } from "@prisma/client";
import { Constants } from "../utils/points";

interface PointsProps {
  points: number[][];
  entries: (BingoEntry & {
    projection: Projection;
  })[];
}

const Points = ({ points, entries }: PointsProps) => {
  const calcualtePoints = () => {
    let total = entries
      .filter((entry) => entry.projection.hasBecomeTrue)
      .reduce((acc) => {
        return acc + Constants.PointsPerCorrectEntry;
      }, 0);

    return (total += points.length * Constants.PointsPerCorrectRow);
  };

  return (
    <>
      <div className="py-8 px-4 mx-auto max-w-screen-lg lg:py-10 lg:px-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">
          Deine Punkte
        </h1>
        <table className="w-full">
          <tbody className="border-slate-500 border-b bg-gray-800 ">
            {entries
              .filter((filter) => filter.projection.hasBecomeTrue)
              .map((entries) => (
                <tr
                  key={entries.id}
                  className="hover:cursor-pointer hover:bg-gray-700 border-b-2 border-gray-900"
                >
                  <td className="px-6 py-2 whitespace-no-wrap round">
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
                  <td className="pr-6 py-4 whitespace-nowrap text-right lg:table-cell">
                    <div className="text-sm leading-5 text-gray-200">
                      Richtiges Field
                    </div>
                  </td>
                  <td className="pr-5 py-4 whitespace-nowrap text-white text-lg font-bold text-right flex-none ">
                    + {Constants.PointsPerCorrectEntry}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {points.length > 0 && (
          <table className="w-full">
            <tbody>
              {points.map((row, i) => (
                <tr
                  key={i}
                  className=" bg-gradient-to-r from-green-400 to-blue-500 hover:cursor-pointer hover:bg-gray-700 transform duration-150 last:border-0"
                >
                  <td className="px-6 py-4 whitespace-no-wrap ">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <div className="text-lg leading-5 font-medium text-left text-gray-100">
                          Bingo in den Feldern {row.map((field) => field + " ")}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="pr-6 py-4 whitespace-nowrap text-right lg:table-cell">
                    <div className="text-sm leading-5 text-gray-200">
                      Bingo!
                    </div>
                  </td>
                  <td className="pr-5 py-4 whitespace-nowrap text-white text-lg font-bold text-right flex-none ">
                    + {Constants.PointsPerCorrectRow}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <table className="w-full">
          <tbody>
            <tr className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 last:border-0">
              <td className="px-6 py-4 whitespace-no-wrap ">
                <div className="flex items-center">
                  <div className="ml-3">
                    <div className="text-lg leading-5 font-medium text-gray-100">
                      Punkte insgesamt
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-white text-lg font-bold text-right flex-none ">
                + {calcualtePoints()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Points;
