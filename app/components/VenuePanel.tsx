import React from "react";
import EventTag from "./EventTag";

type VenuePanelProps = {
  name: string;
  address: string;
  capacity: number;
  sunset: string;
};

const VenuePanel: React.FC<VenuePanelProps> = ({
  name,
  address,
  capacity,
  sunset,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <span className="font-medium">Venue</span>
          <span className="ml-2 text-gray-500 text-sm">1</span>
        </div>
        <button className="text-blue-500 hover:text-blue-600">
          <span>+</span>
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-lg">{name}</h3>
        <p className="text-sm text-gray-600 mt-1">{address}</p>

        <div className="mt-4 flex justify-between">
          <div>
            <div className="text-sm text-gray-500">Capacity</div>
            <div className="font-medium">{capacity.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Sunset</div>
            <div className="font-medium">{sunset}</div>
          </div>
        </div>

        <div className="mt-4">
          <EventTag type="Band Party" />
        </div>
      </div>
    </div>
  );
};

export default VenuePanel;
