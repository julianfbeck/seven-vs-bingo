import React from "react";
import { styled } from "@stitches/react";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  Fieldset,
  IconButton,
} from "./components/ModalStyle";
import { Projection } from "@prisma/client";
import { indexToText, indexToPoints } from "../utils/constants";
import { DialogDescription } from "@radix-ui/react-dialog";
// Your app...
const Flex = styled("div", { display: "flex" });

//props
interface SelectProjectionModalProps {
  fieldNumber: number;
  isOpen: boolean;
  projection: Projection;
  onClose: () => void;
}

const SelectProjectionModal: React.FC<SelectProjectionModalProps> = ({
  isOpen,
  fieldNumber,
  projection,
  onClose,
}) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogTitle>Bingo Ereignis {fieldNumber}:</DialogTitle>
        <DialogTitle>{projection.text}</DialogTitle>
        <div className="text-white mt-3">
          <DialogDescription>
            {indexToText(projection.difficulty)} -{" "}
            {indexToPoints(projection.difficulty)} Punkte
          </DialogDescription>
        </div>
        <Fieldset></Fieldset>
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
