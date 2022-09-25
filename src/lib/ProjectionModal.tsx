import React, { useEffect, useState } from "react";
import { styled } from "@stitches/react";
import { whiteA } from "@radix-ui/colors";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Fieldset,
  IconButton,
} from "./components/ModalStyle";
import ProjectionSelect from "./ProjectionSelect";
import { trpc } from "../utils/trpc";
import { Projection } from "@prisma/client";

// Your app...
const Flex = styled("div", { display: "flex" });

const Label = styled("label", {
  fontSize: 15,
  color: whiteA.whiteA11,
  width: 90,
  textAlign: "right",
});

//props
interface SelectProjectionModalProps {
  fieldNumber: number;
  isOpen: boolean;
  defaultProjection?: Projection;
  onClose: () => void;
}

const SelectProjectionModal: React.FC<SelectProjectionModalProps> = ({
  isOpen,
  fieldNumber,
  defaultProjection,
  onClose,
}) => {
  const { data: projections } = trpc.useQuery(["projection.getAllModal"]);
  const ctx = trpc.useContext();
  const [selectedProjection, setSelectedProjection] =
    useState(defaultProjection);
  const [modalProjetions, setModalProjections] = useState<Projection[]>([]);
  const postBingoInsert = trpc.useMutation("auth.bingoEntriesInsert", {
    onMutate: () => {
      ctx.cancelQuery(["projection.getAllModal"]);

      const optimisticUpdate = ctx.getQueryData(["projection.getAllModal"]);
      if (optimisticUpdate) {
        ctx.setQueryData(["projection.getAllModal"], optimisticUpdate);
      }
    },
    onSettled: () => {
      ctx.invalidateQueries(["projection.getAllModal"]);
    },
  });




  
  useEffect(() => {
    if (projections && projections?.length > 0 && defaultProjection) {
      setModalProjections([...projections, defaultProjection]);
    } else {
      projections && setModalProjections(projections);
    }
  }, [projections, defaultProjection]);

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogTitle>Bingo Karte bearbeiten</DialogTitle>
        <DialogDescription>
          Wähle deine Vorhersage für die Bingokarte {fieldNumber} aus.
        </DialogDescription>
        <Fieldset>
          <Label htmlFor="username">Vorhersage</Label>
          <ProjectionSelect
            projections={modalProjetions}
            defaulValue={defaultProjection}
            onSelect={(projection: string) => {
              setSelectedProjection(
                projections?.find((p) => p.id === projection)
              );
            }}
          />
        </Fieldset>
        <Flex css={{ marginTop: 25, justifyContent: "flex-end" }}>
          <DialogClose asChild>
            <button
              className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-800 mr-3"
              onClick={async () => {
                onClose();
              }}
            >
              Schließen
            </button>
          </DialogClose>
          <DialogClose asChild>
            <button
              disabled={!selectedProjection || projections?.length === 0}
              className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-800 mr-3 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={async () => {
                if (!selectedProjection) {
                  return;
                }
                await postBingoInsert.mutateAsync({
                  projectionId: selectedProjection.id,
                  position: fieldNumber,
                });
                onClose();
              }}
            >
              Speichern
            </button>
          </DialogClose>
        </Flex>
        <DialogClose onClick={onClose}>
          <IconButton aria-label="Close">
            <Cross2Icon />
          </IconButton>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default SelectProjectionModal;
