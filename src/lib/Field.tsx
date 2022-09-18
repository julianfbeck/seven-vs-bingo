import { Projection } from "@prisma/client";
import React, { useState } from "react";
import SelectProjectionModal from "./ProjectionModal";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

interface TextProps {
  fieldNumber: number;
  projection?: Projection;
}

export const Field: React.FC<TextProps> = ({ fieldNumber, projection }) => {
  const [isEditMode, editMode] = useState(false);

  function CustomButton() {
    if (projection && projection.hasBecomeTrue) {
      return <CorrectField />;
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

const EmptyField = () => {
  return (
    <div className="container aspect-square bg-slate-100 rounded-xl p-3 dark:bg-slate-800 mt-3 opacity-70">
      <div className="flex flex-col justify-center items-center h-full text-white text-xs hover:decoration-green-500 hover:underline">
        Bingo Karte hinzufügen
      </div>
    </div>
  );
};

const NormalField = ({ fieldNumber, projection }: TextProps) => {
  return (
    <div className="container aspect-square bg-slate-100 rounded-xl p-0.5 dark:bg-slate-800 mt-3 text-white border-2 border-white">
      <div className="absolute  p-1 text-green-300 font-medium">{fieldNumber}</div>

      <div className="flex flex-col justify-center items-center h-full text-white text-xs lg:text-lg hover:decoration-green-500 hover:underline overflow-hidden">
        {projection?.text}
      </div>
    </div>
  );
};

const CorrectField = () => {
  return (
    <div className="container aspect-square bg-slate-100 rounded-xl p-3 dark:bg-slate-800 mt-3 text-white border-2 border-white"></div>
  );
};
