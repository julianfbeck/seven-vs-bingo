import { Projection } from "@prisma/client";
import { useState } from "react";
import EditProjectionModal from "./EditProjectionModal";

interface AdminProposalProps {
  projection: Projection;
  onReject: () => void;
  onAccept: () => void;
  reloadData: () => void;
}

export const AdminProposal: React.FC<AdminProposalProps> = ({
  projection,
  onAccept,
  onReject,
  reloadData,
}) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <div className="p-6 max-w-md rounded-lg border  shadow-md bg-gray-800 border-gray-700 mb-4">
      <EditProjectionModal
        projection={projection}
        isOpen={editMode}
        onClose={async () => {
          setEditMode(false);
          await reloadData();
        }}
      />
      <div>
        <h5 className="mb-2 text-2xl font-bold tracking-tight  text-white">
          {projection.text}
        </h5>
      </div>
      <p className="mb-3 font-normal  text-gray-400">
        {projection.description}
      </p>
      <button
        className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-800 mr-3"
        onClick={async () => await onAccept()}
      >
        Annehmen
      </button>
      <button
        className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 mr-3"
        onClick={async () => await onReject()}
      >
        Ablehnen
      </button>
      <button
        className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 mr-3"
        onClick={() => setEditMode(true)}
      >
        Bearbeiten
      </button>
    </div>
  );
};
