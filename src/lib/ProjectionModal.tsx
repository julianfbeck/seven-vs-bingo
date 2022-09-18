import React, { useState } from "react";
import { styled } from "@stitches/react";
import { violet, whiteA } from "@radix-ui/colors";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./components/ModalStyle";
import ProjectionSelect from "./ProjectionSelect";
import { trpc } from "../utils/trpc";

// Your app...
const Flex = styled("div", { display: "flex" });

const IconButton = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 25,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: violet.violet11,
  position: "absolute",
  top: 10,
  right: 10,

  "&:hover": { backgroundColor: violet.violet4 },
  "&:focus": { boxShadow: `0 0 0 2px ${violet.violet7}` },
});

const Fieldset = styled("fieldset", {
  all: "unset",
  display: "flex",
  gap: 20,
  alignItems: "center",
  marginBottom: 15,
});

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
  const { data: projections } = trpc.useQuery(["projection.getAll"]);
  const ctx = trpc.useContext();
  const [selectedProjectionId, setSelectedProjectionID] = useState("");
  const postBingoInsert = trpc.useMutation("auth.bingoEntriesInsert", {
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
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogTitle>Neue Vorhersage</DialogTitle>
        <DialogDescription>
          Wähle deine Vorhersage für dieses Feld aus
        </DialogDescription>
        <Fieldset>
          <Label htmlFor="username">Feld {fieldNumber}</Label>
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
