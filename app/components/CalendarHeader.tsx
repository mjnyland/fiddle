import React from "react";
import PrimaryButton from "./buttons/PrimaryButton";
import { Plus, Download } from "lucide-react";
import SecondaryButton from "./buttons/SecondaryButton";
type CalendarHeaderProps = {
  date: string;
  title: string;
  subtitle: string;
};

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  date,
  title,
  subtitle,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="p-4 bg-surface2 text-primary">
        <h1 className="text-2xl font-semibold">{date}</h1>
        <div className="flex items-center text-secondary">
          <span>{title}</span>
          <span className="mx-2">•</span>
          <span>{subtitle}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <SecondaryButton leadingIcon={<Download size={16} />}>
          Export
        </SecondaryButton>
        <PrimaryButton leadingIcon={<Plus size={16} />}>Add</PrimaryButton>
      </div>
    </div>
  );
};

export default CalendarHeader;
