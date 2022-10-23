import { trpc } from "../utils/trpc";
import { Field } from "./Field";
import Points from "./Points";
import {
  TransformComponent,
  TransformWrapper,
} from "@pronestor/react-zoom-pan-pinch";
interface BoardProps {
  boardId: string;
}
const Board = ({ boardId }: BoardProps) => {
  const { data: entries, isLoading } = trpc.useQuery(["auth.bingoEntriesget"]);
  const { data: points } = trpc.useQuery(["auth.points.get"]);

  const fields = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ];

  const copyClipboard = async () => {
    const text = window.location.origin + "/board/" + boardId;
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(text);
      alert("Board Link in der Zwischenablage gespeichert");
    } else {
      document.execCommand("copy", true, text);
      alert("Board Link in der Zwischenablage gespeichert");
    }
  };
  const getProjection = (field: number) => {
    return entries?.find((entry) => entry.position === field)?.projection;
  };
  return (
    <>
      <div className="py-3 px-4 mx-auto max-w-screen-lg lg:py-10 lg:px-12">
        <h1 className="text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">
          Dein{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-700 via-green-500 to-lime-500">
            Bingo Board
          </span>
        </h1>
        <button
          className="bg-white text-black font-bold py-2 px-4 rounded"
          onClick={copyClipboard}
        >
          Board Teilen
        </button>
      </div>
      <div className="max-w-screen-sm mx-auto container p-2">
        <TransformWrapper>
          <TransformComponent>
            <div className="grid grid-cols-5 gap-2 overflow-visible">
              {!isLoading &&
                fields.map((field) => (
                  <Field
                    key={field}
                    fieldNumber={field}
                    projection={getProjection(field)}
                  />
                ))}
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
      {points && entries && <Points entries={entries} points={points} />}
    </>
  );
};

export default Board;
