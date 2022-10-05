import { Projection } from "@prisma/client";
import { Cross2Icon } from "@radix-ui/react-icons";
import { styled } from "@stitches/react";
import { useState } from "react";
import { trpc } from "../utils/trpc";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  IconButton,
} from "./components/ModalStyle";

interface EditModalProps {
  projection: Projection;
  isOpen: boolean;
  onClose: () => void;
}

const Flex = styled("div", { display: "flex" });

const EditProjectionModal = ({
  isOpen,
  projection,
  onClose,
}: EditModalProps) => {
  const [newProjection, setNewProjection] = useState(projection.text);
  const editEntry = trpc.useMutation("projection.auth.Update");
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogTitle>Bingo Karte bearbeiten</DialogTitle>
        <DialogDescription>
          Bearbeite die Karte und klicke auf Speichern, um die Änderungen zu
          übernehmen.
          {JSON.stringify(projection)}
        </DialogDescription>
        <div className="relative">
          <input
            type="search"
            id="default-search"
            className="block p-4 w-full text-sm  rounded-lg border   bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Bingo Vorschlag (kurzer Titel)"
            value={newProjection}
            onChange={(e) => setNewProjection(e.target.value)}
            maxLength={50}
          />
          <div className="absolute right-2 bottom-32 text-white">
            {newProjection.length}/{50}
          </div>
        </div>
        <Flex css={{ marginTop: 25, justifyContent: "flex-end" }}>
          <DialogClose asChild>
            <button
              disabled={projection.text === newProjection}
              className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 mr-3"
              onClick={async () => {
                await editEntry.mutateAsync({
                  id: projection.id,
                  text: newProjection
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
export default EditProjectionModal;
