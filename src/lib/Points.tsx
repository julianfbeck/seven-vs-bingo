import { BingoEntry, Projection } from "@prisma/client";
import { Constants, indexToPoints, indexToText } from "../utils/constants";

interface PointsProps {
  points: number[][];
  entries: (BingoEntry & {
    projection: Projection;
  })[];
  external?: boolean;
  setTotalPoints?: (points: number) => void;
}

const Points = ({ points, entries, external, setTotalPoints }: PointsProps) => {
  const calcualtePoints = () => {
    const total = entries
      .filter((entry) => entry.projection.hasBecomeTrue)
      .reduce((acc, entry) => {
        return acc + indexToPoints(entry.projection.difficulty);
      }, 0);

    const bingoPoints = points.reduce((acc, row) => {
      return acc + calculatePointsPerRow(row);
    }, 0);
    if (setTotalPoints) {
      setTotalPoints(total + bingoPoints);
    }
    return total + bingoPoints;
  };
  const calculatePointsPerRow = (row: number[]) => {
    const currentPositions = entries.filter((entry) =>
      row.includes(entry.position)
    );
    const currentPoints = currentPositions.reduce((acc, entry) => {
      return acc + indexToPoints(entry.projection.difficulty);
    }, 0);

    const total = currentPoints * Constants.MultiplierPerBingo;
    return total;
  };

  return (
    <>
      <div className="py-8 px-4 mx-auto max-w-screen-lg lg:py-10 lg:px-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">
          {external ? " " : "Deine "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-700 via-green-500 to-lime-500">
            Punkte
          </span>
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
                  <td className="px-3 py-2 whitespace-no-wrap round">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-100">
                          {entries.projection.text}
                        </div>
                        <div className="text-sm font-thin text-gray-300">
                          {indexToText(entries.projection.difficulty)} {" - "}{" "}
                          {indexToPoints(entries.projection.difficulty)}
                          {" Punkte"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="pr-3 py-4 whitespace-nowrap text-white text-lg font-bold text-right flex-none ">
                    + {indexToPoints(entries.projection.difficulty)}
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
                  <td className="px-3 py-4 whitespace-no-wrap ">
                    <div className="flex items-center">
                      <div>
                        <div className="text-lg leading-5 font-medium text-left text-gray-100">
                          Bingo: {row.map((field) => field + " ")}
                        </div>
                        <div className="text-sm font-thin text-gray-300">
                          (
                          {entries
                            .filter((entry) => row.includes(entry.position))
                            .map(
                              (entry) =>
                                indexToPoints(entry.projection.difficulty) +
                                " + "
                            )
                            .join("")
                            .slice(0, -2)}
                          ) * {Constants.MultiplierPerBingo}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="pr-3 py-4 whitespace-nowrap text-white text-lg font-bold text-right flex-none ">
                    + {calculatePointsPerRow(row)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <table className="w-full">
          <tbody>
            <tr className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 last:border-0">
              <td className="px-3 py-4 whitespace-no-wrap ">
                <div className="flex items-center">
                  <div>
                    <div className="text-lg font-medium text-gray-100">
                      Punkte insgesamt
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-white text-lg font-bold text-right flex-none ">
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
