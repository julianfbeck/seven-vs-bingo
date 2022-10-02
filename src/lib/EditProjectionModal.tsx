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
  const [description, setDescription] = useState(projection.description);
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
            className="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Bingo Vorschlag (kurzer Titel)"
            value={newProjection}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <Flex css={{ marginTop: 25, justifyContent: "flex-end" }}>
          <DialogClose asChild>
            <button
              disabled={
                projection.text === newProjection &&
                projection.description === description
              }
              className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 mr-3"
              onClick={async () => {
                await editEntry.mutateAsync({
                  id: projection.id,
                  text: newProjection,
                  description: description,
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
