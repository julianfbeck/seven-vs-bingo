import { Projection } from "@prisma/client";
import React, { useState } from "react";
import SelectProjectionModal from "./ProjectionModal";

interface TextProps {
  fieldNumber: number;
  projection?: Projection;
}

export const Field: React.FC<TextProps> = ({ fieldNumber, projection }) => {
  const [isEditMode, editMode] = useState(false);

  function CustomButton() {
    if (projection && projection.hasBecomeTrue) {
      return <CorrectField fieldNumber={fieldNumber} projection={projection} />;
    } else if (projection) {
      return <NormalField fieldNumber={fieldNumber} projection={projection} />;
    } else {
      return <EmptyField />;
    }
  }
  return (
    <>
      <button onClick={() => editMode(true)}>
        <CustomButton />
      </button>
      {projection && (
        <SelectProjectionModal
          fieldNumber={fieldNumber}
          isOpen={isEditMode}
          projection={projection}
          onClose={() => {
            editMode(false);
          }}
        ></SelectProjectionModal>
      )}
    </>
  );
};

const EmptyField = () => {
  return (
    <div className="container aspect-square rounded-xl p-3 bg-slate-800  opacity-70">
      <div className="flex flex-col justify-center items-center h-full text-white text-xs hover:decoration-green-500 hover:underline">
        Bingo Karte hinzufügen
      </div>
    </div>
  );
};

const NormalField = ({ projection }: TextProps) => {
  return (
    <div className="container aspect-square  rounded-xl  bg-slate-800  text-white border border-white">
      <div className="flex flex-col justify-center items-center h-full text-white text-xs lg:text-lg hover:decoration-green-500 hover:underline overflow-hidden">
        {projection?.text}
      </div>
    </div>
  );
};

const CorrectField = ({ projection }: TextProps) => {
  return (
    <div className="container aspect-square  rounded-xl bg-green-500  text-white border border-green-900">
      <div className="flex flex-col justify-center items-center h-full text-white text-xs lg:text-lg hover:decoration-green-500 hover:underline overflow-hidden">
        {projection?.text}
      </div>
    </div>
  );
};
