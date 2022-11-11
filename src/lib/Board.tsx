import { trpc } from "../utils/trpc";
import { Field } from "./Field";
import Points from "./Points";

import { useState } from "react";
import FeedbackModal from "./FeedbackModal";
import { TwitterShareButton } from "react-share";
import { Icon } from "@iconify/react";
interface BoardProps {
  boardId: string;
}
const Board = ({ boardId }: BoardProps) => {
  const { data: entries, isLoading } = trpc.useQuery(["auth.bingoEntriesget"]);
  const { data: points } = trpc.useQuery(["auth.points.get"]);
  const [feedbackVisibla, setFeedbackVisible] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const sendFeedback = trpc.useMutation("auth.bingoEntriesFeedback");
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
        <div className="inline-flex mt-1">
          <button
            className="bg-white text-black font-bold py-2 px-4 rounded"
            onClick={copyClipboard}
          >
            Board Teilen
          </button>
          {boardId && totalPoints && (
            <TwitterShareButton
              title={`Ich hab ${totalPoints} Punkte beim 7 vs. Wild Bingo!`}
              url={"https://sevenvsbingo.de/board/" + boardId}
              hashtags={["7vswild", "7vsbingo"]}
            >
              <button className="bg-[#2297ed] ml-2 text-white font-bold py-2 px-4 rounded text-center inline-flex items-center">
                <Icon
                  className="w-4 h-4 mr-2"
                  icon="akar-icons:twitter-fill"
                  color="white"
                />
                Teilen
              </button>
            </TwitterShareButton>
          )}
        </div>
      </div>
      <div className="max-w-screen-sm mx-auto container p-2">
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
      </div>
      <div className="py-8 px-4 mx-auto max-w-screen-lg lg:py-10 lg:px-12">
        <div className="flex flex-wrap w-full justify-center">
          <button
            className="button py-4 px-4 items-center text-sm font-medium text-center text-white bg-gradient-to-r from-green-700 to-green-500  rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-800 mr-2 ml-1"
            onClick={() => setFeedbackVisible(true)}
          >
            Ereignis noch nicht eingetragen? Schreib uns!
          </button>
        </div>
        <FeedbackModal
          isOpen={feedbackVisibla}
          onClose={() => setFeedbackVisible(false)}
          onSend={async (text: string) => {
            await sendFeedback.mutateAsync({ text });
            setFeedbackVisible(false);
          }}
        />
      </div>
      {points && entries && (
        <Points
          entries={entries}
          points={points}
          setTotalPoints={setTotalPoints}
        />
      )}
    </>
  );
};

export default Board;
