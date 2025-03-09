import React from "react";

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
    <div className="flex flex-col mb-6">
      <div className="p-4 bg-surface2 text-primary">
        <h1 className="text-2xl font-semibold">{date}</h1>
        <div className="flex items-center text-secondary">
          <span>{title}</span>
          <span className="mx-2">•</span>
          <span>{subtitle}</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
