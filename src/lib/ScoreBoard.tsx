import { trpc } from "../utils/trpc";

const Board: React.FC = () => {
  const { data: entries } = trpc.useQuery(["auth.pointshighscore"]);
  return (
    <>
      <div className="w-48 text-sm font-medium  rounded-lg border  bg-gray-700 border-gray-600 text-white">
        <button
          aria-current="true"
          type="button"
          className="py-2 px-4 w-full font-medium text-left text-white  rounded-t-lg border-b  cursor-pointer focus:outline-none bg-gray-800 border-gray-600"
        >
          Highscore
        </button>
        {entries?.map((entry, index) => (
          <button
            key={entry.id}
            className="block py-2 px-4 w-full rounded-b-lg cursor-pointer  focus:outline-none focus:ring-2  border-gray-600 hover:bg-gray-600 hover:text-white focus:ring-gray-500 focus:text-white"
          >
            {index + 1}. {entry.userName} - {entry.score}
          </button>
        ))}
      </div>
    </>
  );
};

export default Board;
