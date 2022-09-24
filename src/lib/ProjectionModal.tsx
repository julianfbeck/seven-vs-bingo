import React, { useState } from "react";
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
  defaultProjectionId?: string;
  onClose: () => void;
}

const SelectProjectionModal: React.FC<SelectProjectionModalProps> = ({
  isOpen,
  fieldNumber,
  defaultProjectionId,
  onClose,
}) => {
  const { data: projections } = trpc.useQuery(["projection.getAllModal"]);
  const ctx = trpc.useContext();
  const [selectedProjectionId, setSelectedProjectionID] =
    useState(defaultProjectionId);
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
            projections={projections || []}
            defaulValue={defaultProjectionId}
            onSelect={(projection: string) => {
              setSelectedProjectionID(projection);
            }}
          />
        </Fieldset>
        <Flex css={{ marginTop: 25, justifyContent: "flex-end" }}>
          <DialogClose asChild>
            <button
              disabled={!selectedProjectionId}
              className="text-green-50 border border-green-300 rounded bg-green-500 bg  p-2 text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={async () => {
                if (!selectedProjectionId) {
                  return;
                }
                await postBingoInsert.mutateAsync({
                  projectionId: selectedProjectionId,
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
