import { Projection } from "@prisma/client";
import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import Table from "./Table";

export const CreateBoard = () => {
  const { data: entries } = trpc.useQuery(["projection.getAll"]);
  const [selectedProjections, setSelectedProjections] = useState<
    Map<string, boolean>
  >(new Map());
  useEffect(() => {
    const map = new Map();
    entries?.forEach((entry) => map.set(entry.id, false));
    setSelectedProjections(map);
  }, []);
  return (
    <>
      <Table
        selectedProjections={selectedProjections}
        projections={entries || []}
        onProjectionClick={(projection: Projection) => {
          const map = new Map(selectedProjections);
          map.set(projection.id, !map.get(projection.id));
          setSelectedProjections(map);
        }}
      />
    </>
  );
};
