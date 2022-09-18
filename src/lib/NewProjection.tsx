import { useState } from "react";
import { trpc } from "../utils/trpc";

export default function NewProjection() {
  const { data: projections } = trpc.useQuery(["projection.getAll"]);
  const ctx = trpc.useContext();
  const [newProjection, setNewProjection] = useState("");
  const [description, setDescription] = useState("");
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
      <div className="container mx-auto bg-slate-100 rounded-xl p-3 dark:bg-slate-900">
        <form>
          <div className="relative">
            <input
              type="search"
              id="default-search"
              className="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Bingo Vorschlag (kurzer Titel)"
              onChange={(e) => setNewProjection(e.target.value)}
              maxLength={50}
            />
            <div className="absolute right-2 bottom-32 text-white">
              {newProjection.length}/{50}
            </div>

            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"></label>
            <textarea
              id="message"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Genauere Beschreibung über die Bingo Karte"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              postProjection.mutate({
                text: newProjection,
                description: description,
              });
            }}
            disabled={
              postProjection.isLoading ||
              newProjection.length === 0 ||
              description.length === 0
            }
            className="float-right mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
          >
            Absenden
          </button>
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
