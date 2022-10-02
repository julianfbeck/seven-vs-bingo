import { trpc } from "../utils/trpc";

const Board: React.FC = () => {
  const { data: entries } = trpc.useQuery(["auth.pointshighscore"]);
  return (
    <>
      <div className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <button
          aria-current="true"
          type="button"
          className="py-2 px-4 w-full font-medium text-left text-white bg-blue-700 rounded-t-lg border-b border-gray-200 cursor-pointer focus:outline-none dark:bg-gray-800 dark:border-gray-600"
        >
          Highscore
        </button>
        {entries?.map((entry, index) => (
          <button
            key={entry.id}
            className="block py-2 px-4 w-full rounded-b-lg cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
          >
            {index + 1}. {entry.userName} - {entry.score}
          </button>
        ))}
      </div>
    </>
  );
};

export default Board;
