import { useState } from "react";
import { trpc } from "../utils/trpc";
import {
  Toast,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./components/ModelStyle";

export default function NewProjection() {
  const [newProjection, setNewProjection] = useState("");
  const [showConfirmToast, setShowConfirmToast] = useState(false);
  const postProjection = trpc.useMutation("projection.Insert");
  return (
    <ToastProvider>
      <div className="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        <form>
          <div className="relative">
            <input
              type="search"
              id="default-search"
              className="block p-4 w-full text-sm rounded border  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Bingo Vorschlag (kurzer Titel)"
              value={newProjection}
              onChange={(e) => setNewProjection(e.target.value)}
              maxLength={50}
            />
            <div className="absolute right-2 bottom-32 text-white">
              {newProjection.length}/{50}
            </div>
          </div>
          <button
            onClick={async (e) => {
              e.preventDefault();
              await postProjection.mutateAsync({
                text: newProjection,
              });
              setNewProjection("");
              setShowConfirmToast(true);
            }}
            disabled={postProjection.isLoading || newProjection.length === 0}
            className="float-right mt-6 text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 disabled:opacity-50"
          >
            Absenden
          </button>
        </form>
      </div>
      <Toast open={showConfirmToast} onOpenChange={setShowConfirmToast}>
        <ToastTitle>Bingo-Karten Idee Abgesendet</ToastTitle>
        <ToastDescription>
          Danke für deine Einsendung. Wir werden die Bingo Karte prüfen und
          anschließend freischalten.
        </ToastDescription>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}
