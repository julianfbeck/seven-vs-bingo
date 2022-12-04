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
    } else if (projection && projection.blocked) {
      return <BlockedField fieldNumber={fieldNumber} projection={projection} />;
    } else if (projection) {
      return <NormalField fieldNumber={fieldNumber} projection={projection} />;
    }
    return <></>;
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

const NormalField = ({ projection }: TextProps) => {
  const getBorderColor = () => {
    if (!projection) {
      return "border-white";
    }
    switch (projection.difficulty) {
      case 0:
        return "border-green-white";
      case 1:
        return "border-amber-300";
      case 2:
        return "border-purple-400";
      default:
        return "border-gray-900";
    }
  };
  return (
    <div
      className={
        "container aspect-square  rounded-xl border-  bg-slate-800  text-white border " +
        getBorderColor()
      }
    >
      <div className="flex flex-col text-[9px] justify-center items-center h-full text-white  sm:text-base hover:decoration-green-500 hover:underline overflow-hidden">
        {projection?.text}
      </div>
    </div>
  );
};

const CorrectField = ({ projection }: TextProps) => {
  const getBorderColor = () => {
    if (!projection) {
      return "border-white";
    }
    switch (projection.difficulty) {
      case 0:
        return "border-green-white";
      case 1:
        return "border-amber-300";
      case 2:
        return "border-purple-400";
      default:
        return "border-gray-900";
    }
  };
  return (
    <div
      className={
        "container aspect-square  rounded-xl bg-green-500 text-white border " +
        getBorderColor()
      }
    >
      <div className="flex flex-col text-[9px] justify-center items-center h-full text-white sm:text-base hover:decoration-green-500 hover:underline overflow-hidden">
        {projection?.text}
      </div>
    </div>
  );
};

const BlockedField = ({ projection }: TextProps) => {
  const getBorderColor = () => {
    if (!projection) {
      return "border-white";
    }
    switch (projection.difficulty) {
      case 0:
        return "border-green-white";
      case 1:
        return "border-amber-300";
      case 2:
        return "border-purple-400";
      default:
        return "border-gray-900";
    }
  };
  return (
    <div
      className={
        "container aspect-square  rounded-xl bg-slate-800 text-white border opacity-50 " +
        getBorderColor()
      }
    >
      <div className="flex flex-col text-[9px] justify-center items-center h-full text-white sm:text-base hover:decoration-red-500 hover:underline overflow-hidden">
        {projection?.text}
      </div>
    </div>
  );
};
