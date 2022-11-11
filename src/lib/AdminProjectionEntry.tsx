import { Projection } from "@prisma/client";
import { useState } from "react";
import { indexToPoints } from "../utils/constants";
import EditProjectionModal from "./EditProjectionModal";

interface AdminProposalProps {
  projection: Projection;
  onBlock: () => void;
  onHasBecomeTrue: () => void;
  reloadData: () => void;
}

export const AdminProjectionEntry: React.FC<AdminProposalProps> = ({
  projection,
  onHasBecomeTrue,
  reloadData,
  onBlock,
}) => {
  const [editMode, setEditMode] = useState(false);
  const getBorderColor = () => {
    if (projection.hasBecomeTrue) {
      return "border-green-500";
    }
    if (projection.blocked) {
      return "border-red-500";
    }
    return "border-gray-700";
  };

  return (
    <div
      key={projection.id}
      className={
        "p-6 max-w-md  rounded-lg border  shadow-md bg-gray-800  mb-4 " +
        getBorderColor()
      }
    >
      <div>
        <h5 className="mb-2 text-2xl font-bold tracking-tight  text-white">
          {projection.text}
        </h5>
        <h2 className="text-sm font-bold text-white mb-2">
          Punkte: {indexToPoints(projection.difficulty)}
        </h2>
      </div>

      <button
        className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 mr-3 disabled:bg-red-900 disabled:opacity-50"
        disabled={projection.hasBecomeTrue}
        onClick={async () => {
          //alert
          if (
            !confirm("Bist du sicher, dass diese Vorhersage eingetroffen ist?")
          ) {
            return;
          }
          await onHasBecomeTrue();
        }}
      >
        Ist eingetroffen
      </button>
      <button
        className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 mr-3 disabled:bg-red-900 disabled:opacity-50"
        disabled={projection.hasBecomeTrue || projection.blocked}
        onClick={async () => {
          //alert
          if (
            !confirm(
              "Bist du sicher, dass diese vorhersage nicht mehr eintreffen wird?"
            )
          ) {
            return;
          }
          await onBlock();
        }}
      >
        Kann nicht eintreffen
      </button>
      <button
        className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 mr-3 disabled:bg-red-900 disabled:opacity-50"
        onClick={() => setEditMode(true)}
        disabled={projection.hasBecomeTrue}
      >
        Bearbeiten
      </button>
      <EditProjectionModal
        projection={projection}
        isOpen={editMode}
        onClose={async () => {
          setEditMode(false);
          await reloadData();
        }}
      />
    </div>
  );
};
