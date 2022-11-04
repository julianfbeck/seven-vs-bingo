import React from "react";
import { styled } from "@stitches/react";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  IconButton,
} from "./components/ModalStyle";

// Your app...
const Flex = styled("div", { display: "flex" });

//props
interface SelectProjectionModalProps {
  isOpen: boolean;
  onGenerate: () => void;
  onClose: () => void;
}

const ConfirmModal: React.FC<SelectProjectionModalProps> = ({
  isOpen,
  onGenerate,
  onClose,
}) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogTitle>Bingo Board erstellen</DialogTitle>
        <DialogDescription>
          Willst du mit den ausgewählten Ereignissen ein Bingo Board erstellen?
          Danach kannst du die Ereignisse nicht mehr ändern.
        </DialogDescription>
        <Flex css={{ marginTop: 25, justifyContent: "flex-end" }}>
          <DialogClose asChild>
            <button
              className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-800 mr-3"
              onClick={async () => {
                await onGenerate();
              }}
            >
              Board erstellen
            </button>
          </DialogClose>
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

export default ConfirmModal;
