import React from "react";

type EventTagType =
  | "Band Party"
  | "Crew Party"
  | "Artist Party"
  | "Lighting"
  | "SFX"
  | "Production"
  | "Carps"
  | "Managers";

type EventTagProps = {
  type: EventTagType;
  count?: number;
};

const EventTag: React.FC<EventTagProps> = ({ type, count }) => {
  const getTagStyles = () => {
    switch (type) {
      case "Band Party":
        return "bg-purple-100 text-purple-800";
      case "Crew Party":
        return "bg-green-100 text-green-800";
      case "Artist Party":
        return "bg-blue-100 text-blue-800";
      case "Lighting":
        return "bg-yellow-100 text-yellow-800";
      case "SFX":
        return "bg-orange-100 text-orange-800";
      case "Production":
        return "bg-teal-100 text-teal-800";
      case "Carps":
        return "bg-pink-100 text-pink-800";
      case "Managers":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getTagStyles()}`}
    >
      {type}
      {count !== undefined && (
        <span className="ml-1 bg-white bg-opacity-30 rounded-full w-4 h-4 flex items-center justify-center text-xs">
          {count}
        </span>
      )}
    </div>
  );
};

export default EventTag;
