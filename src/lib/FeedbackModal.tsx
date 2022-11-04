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
  onSend: (text: string) => void;
  onClose: () => void;
}

const FeedbackModal: React.FC<SelectProjectionModalProps> = ({
  isOpen,
  onSend,
  onClose,
}) => {
  const [feedback, setFeedback] = React.useState("");
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogTitle>Schreib uns</DialogTitle>
        <DialogDescription>
          Ist ein Ereignis eingetroffen und du möchtest uns Bescheid geben? Dann
          schreib uns doch einfach eine Nachricht.
        </DialogDescription>
        <input
          type="search"
          id="default-search"
          className="block p-4 w-full text-sm rounded border  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          placeholder="Dein Feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          maxLength={500}
        />
        <Flex css={{ marginTop: 25, justifyContent: "flex-end" }}>
          <DialogClose asChild>
            <button
              className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-800 mr-3"
              onClick={async () => {
                await onSend(feedback);
              }}
            >
              Absenden
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

export default FeedbackModal;
