import { Projection } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import ConfirmModal from "./ConfirmModal";
import Table from "./Table";

export const CreateBoard = () => {
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

  const selectRandomProjections = () => {
    const map = new Map();
    entries?.forEach((entry) => map.set(entry.id, false));
    const randomEntries = entries?.sort(() => 0.5 - Math.random());
    const selectedEntries = randomEntries?.slice(0, 25);
    selectedEntries?.forEach((entry) => map.set(entry.id, true));
    setSelectedProjections(map);
  };

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
          Erstelle dein Bingo Board
        </h1>
        <p className="mt-5 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-400">
          Wähle 25 Ereignisse aus, die du für wahrscheinlich hältst und erstelle
          dein individuelles Bingo Board für die zweite Staffel von {`"`}Seven
          vs. Wild{`"`}
        </p>
      </div>
      <div>
        <Table
          numberSelectedProjections={numberSelectedProjections}
          selectedProjections={selectedProjections}
          projections={entries || []}
          disabled={numberSelectedProjections >= 25}
          onProjectionClick={(projection: Projection) => {
            const map = new Map(selectedProjections);
            map.set(projection.id, !map.get(projection.id));
            setSelectedProjections(map);
          }}
        />
      </div>
      <div className="flex justify-center py-10">
        <button
          className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-800 mr-3"
          onClick={selectRandomProjections}
        >
          Zufällig auswählen
        </button>
        <button
          className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-800 mr-3 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={numberSelectedProjections != 25}
          onClick={() => setConfirmModal(true)}
        >
          {numberSelectedProjections}/25 Auswählen
        </button>
        <button
          className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 mr-3 disabled:opacity-50"
          onClick={() => {
            const map = new Map();
            entries?.forEach((entry) => map.set(entry.id, false));
            setSelectedProjections(map);
          }}
          disabled={numberSelectedProjections == 0}
        >
          Abbrechen
        </button>
        <ConfirmModal
          onGenerate={selectBingoEntries}
          isOpen={confirmModal}
          onClose={() => setConfirmModal(false)}
        />
      </div>
    </>
  );
};
