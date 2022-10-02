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
import { Projection } from "@prisma/client";

// Your app...
const Flex = styled("div", { display: "flex" });



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
  onClose,
}) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogTitle>Bingo Karte bearbeiten</DialogTitle>
        <DialogDescription>
          Wähle deine Vorhersage für die Bingokarte {fieldNumber} aus.
        </DialogDescription>
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
