import { BingoEntry, Projection } from "@prisma/client";
import { Field } from "./Field";
import Points from "./Points";

interface SharedBoardProps {
  points: number[][];
  username: string;
  entries: (BingoEntry & {
    projection: Projection;
  })[];
}
const SharedBoard = ({ entries, username, points }: SharedBoardProps) => {
  const fields = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ];

  const getProjection = (field: number) => {
    return entries?.find((entry) => entry.position === field)?.projection;
  };
  return (
    <>
      <div className="py-3 px-4 mx-auto max-w-screen-lg lg:py-10 lg:px-12">
        <h1 className="text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">
          {username}
          {"'"}s Board
        </h1>
      </div>
      <div className="max-w-screen-sm mx-auto  container p-2^">
        <div className="mx-auto  container ">
          <div className="grid grid-cols-5 gap-2 gap-y-0.5">
            {fields.map((field) => (
              <Field
                key={field}
                fieldNumber={field}
                projection={getProjection(field)}
              />
            ))}
          </div>
        </div>
      </div>
      {points && entries && (
        <Points entries={entries} points={points} external />
      )}
    </>
  );
};

export default SharedBoard;
