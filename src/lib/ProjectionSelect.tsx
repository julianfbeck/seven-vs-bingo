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
import { Projection } from "@prisma/client";

interface ProjectionSelectProps {
  projections: Projection[];
  defaulValue?: string;
  onSelect: (projection: string) => void;
}

export const ProjectionSelect: React.FC<ProjectionSelectProps> = ({
  projections,
  defaulValue,
  onSelect,
}) => {
  return (
    <Select onValueChange={onSelect} defaultValue={defaulValue}>
      <SelectTrigger aria-label="Vorhersagen">
        <SelectValue placeholder="Auswählen..." />
      </SelectTrigger>
      <SelectContent>
        <SelectScrollUpButton>
          <ChevronUpIcon />
        </SelectScrollUpButton>
        <SelectViewport>
          <SelectGroup>
            <SelectLabel>Vorhersagen</SelectLabel>
            {projections?.map((projection) => (
              <SelectItem key={projection.id} value={projection.id}>
                <SelectItemText>{projection.text}</SelectItemText>
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

export default ProjectionSelect;
