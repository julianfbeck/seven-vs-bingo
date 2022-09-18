import { Projection } from "@prisma/client";
import React, { useState } from "react";
import SelectProjectionModal from "./ProjectionModal";

interface TextProps {
  fieldNumber: number;
  text: string;
  projection?: Projection;
}

export const Field: React.FC<TextProps> = ({
  text,
  fieldNumber,
  projection,
}) => {
  const [isEditMode, editMode] = useState(false);
  return (
    <>
      <button onClick={() => editMode(true)}>
        <div className="container aspect-square bg-slate-100 rounded-xl p-3 dark:bg-slate-800 mt-3 text-white border-2 border-white">
          {text}
        </div>
      </button>
      <SelectProjectionModal
        fieldNumber={fieldNumber}
        isOpen={isEditMode}
        defaultProjectionId={projection?.id}
        onClose={function (): void {
          editMode(false);
        }}
      ></SelectProjectionModal>
    </>
  );
};
