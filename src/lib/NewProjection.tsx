import { trpc } from "../utils/trpc";

export default function NewProjection() {
  const { data: projections, isLoading } = trpc.useQuery(["projection.getAll"]);

  const ctx = trpc.useContext();
  const postProjection = trpc.useMutation("projection.Insert", {
    onMutate: () => {
      ctx.cancelQuery(["projection.getAll"]);

      const optimisticUpdate = ctx.getQueryData(["projection.getAll"]);
      if (optimisticUpdate) {
        ctx.setQueryData(["projection.getAll"], optimisticUpdate);
      }
    },
    onSettled: () => {
      ctx.invalidateQueries(["projection.getAll"]);
    },
  });
  return (
    <>
      <div className=" container mx-auto bg-slate-100 rounded-xl p-8 dark:bg-slate-900">
        <form>
          <div className="relative">
            <input
              type="search"
              id="default-search"
              className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Bingo Idee hinzufügen"
            />
            <button
              onClick={() => {
                postProjection.mutate({
                  text: "test",
                });
              }}
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Hinzufügen
            </button>
          </div>
        </form>
      </div>

      {projections?.map((projection) => {
        return (
          <div
            key={projection.id}
            className="container mx-auto bg-slate-100 rounded-xl p-3 dark:bg-slate-900 mt-3 text-white text-2xl border-2 border-white"
          >
            {projection.text}
          </div>
        );
      })}
    </>
  );
}
