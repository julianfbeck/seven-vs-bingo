import { trpc } from "../utils/trpc";

const Board: React.FC = () => {
  const { data: entries } = trpc.useQuery(["auth.pointshighscore"]);
  return (
    <>
      <div className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {entries?.map((entry, index) => (
          <a
            key={entry.id}
            href="#"
            aria-current="true"
            className="block py-2 px-4 w-full text-white bg-blue-700 rounded-t-lg border-b border-gray-200 cursor-pointer dark:bg-gray-800 dark:border-gray-600"
          >
            {index + 1}. {entry.userName} - {entry.score}
          </a>
        ))}
      </div>
    </>
  );
};

export default Board;
