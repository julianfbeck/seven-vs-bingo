import { Projection } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import ConfirmModal from "./ConfirmModal";
import Table from "./Table";

export const CreateBoardTemp = () => {
  const { data: entries } = trpc.useQuery(["projection.getAll"]);
  const postBingoInsert = trpc.useMutation("auth.bingoEntriesGenerate");
  const router = useRouter();
  const [numberSelectedProjections, setNumberSelectedProjections] = useState(0);
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedProjections, setSelectedProjections] = useState<
    Map<string, boolean>
  >(new Map());
  useEffect(() => {
    const map = new Map();
    entries?.forEach((entry) => map.set(entry.id, false));
    setSelectedProjections(map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectBingoEntries = async () => {
    const selectedEntries = entries?.filter((entry) =>
      selectedProjections.get(entry.id)
    );
    await postBingoInsert.mutateAsync({
      projections: selectedEntries?.map((entry) => entry.id) || [],
    });
    router.reload();
  };

  useEffect(() => {
    let number = 0;
    selectedProjections.forEach((value) => {
      if (value) {
        number++;
      }
    });
    setNumberSelectedProjections(number);
  }, [selectedProjections]);
  return (
    <>
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-10 lg:px-12">
        <h1 className="text-4xl font-extrabold tracking-tight leading-none  md:text-5xl lg:text-6xl text-white">
          Erstelle dein{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-700 via-green-500 to-lime-500">
            Bingo Board
          </span>
        </h1>
        <p className="mt-5 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-400">
          Wähle 25 Ereignisse aus, die du für wahrscheinlich hältst und erstelle
          dein individuelles Bingo Board für die zweite Staffel von{" "}
          <span className=" underline decoration-lime-500 font-bold">
            {" "}
            7 vs. Wild{" "}
          </span>{" "}
        </p>{" "}
        <p className="mt-5 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-400">
          Warte bis zum 1.November! Erst dann kannst du dein eigenens Board
          erstellen.
        </p>
      </div>
      <div className="opacity-50">
        <Table
          numberSelectedProjections={numberSelectedProjections}
          selectedProjections={selectedProjections}
          projections={entries || []}
          disabled={true}
          onProjectionClick={(projection: Projection) => {
            const map = new Map(selectedProjections);
            map.set(projection.id, !map.get(projection.id));
            setSelectedProjections(map);
          }}
        />
      </div>
      <div className="flex items-center justify-center">
        <p className="mt-5 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-400">
          Warte bis zum 1.November! Erst dann kannst du dein eigenens Board
          erstellen.
        </p>
      </div>
      <div className="flex items-center justify-center">
        <div className="inline-flex justify-center p-2">
          <button
            className="py-2 px-3 items-center  text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-800 mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={true}
            onClick={() => setConfirmModal(true)}
          >
            {numberSelectedProjections}/25 Board erstellen
          </button>
          <button
            className=" py-2 px-3 items-center  text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 mr-1 disabled:opacity-50"
            onClick={() => {
              const map = new Map();
              entries?.forEach((entry) => map.set(entry.id, false));
              setSelectedProjections(map);
            }}
            disabled={true}
          >
            Abbrechen
          </button>
          <ConfirmModal
            onGenerate={selectBingoEntries}
            isOpen={confirmModal}
            onClose={() => setConfirmModal(false)}
          />
        </div>
      </div>
    </>
  );
};