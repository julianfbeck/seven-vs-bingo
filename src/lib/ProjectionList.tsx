import { trpc } from "../utils/trpc";

export const ProjectionList = () => {
  const { data: entries } = trpc.useQuery(["projection.getAll"]);

  return (
    <>
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
