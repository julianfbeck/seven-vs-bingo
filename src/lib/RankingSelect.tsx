import React from "react";
import { CheckIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "./components/SelectStyle";
import { Constants } from "../utils/constants";

interface ProjectionSelectProps {
  defaulValue?: string;
  onSelect: (projection: string) => void;
}

// three difficulties per projection
const DIFFICULTY = [
  Constants.PointsPerEasyEntry,
  Constants.PointsPerMediumEntry,
  Constants.PointsPerHardEntry,
];

export const RankingSelect: React.FC<ProjectionSelectProps> = ({
  defaulValue,
  onSelect,
}) => {
  return (
    <Select onValueChange={onSelect} defaultValue={defaulValue}>
      <SelectTrigger aria-label="Punkte">
        <SelectValue placeholder="Punkte..." />
      </SelectTrigger>
      <SelectContent>
        <SelectScrollUpButton>
          <ChevronUpIcon />
        </SelectScrollUpButton>
        <SelectViewport>
          <SelectGroup>
            <SelectLabel>Punkte</SelectLabel>
            {DIFFICULTY.map((difficulty, index) => (
              <SelectItem key={index} value={String(index)}>
                <SelectItemText>Punkte: {difficulty}</SelectItemText>
                <SelectItemIndicator>
                  <CheckIcon />
                </SelectItemIndicator>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectViewport>
      </SelectContent>
    </Select>
  );
};

export default RankingSelect;
