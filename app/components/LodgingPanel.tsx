import React from "react";

type LodgingPanelProps = {
  name: string;
  address: string;
  breakfast: boolean;
  restaurantHours: string;
  roomService: string;
  amenities: string[];
  checkIn: {
    date: string;
    time: string;
  };
  checkOut: {
    date: string;
    time: string;
  };
  phone: string;
};

const LodgingPanel: React.FC<LodgingPanelProps> = ({
  name,
  address,
  breakfast,
  restaurantHours,
  roomService,
  amenities,
  checkIn,
  checkOut,
  phone,
}) => {
  return (
    <div className="bg-cardBackgroundPrimary rounded-lg border border-cardBorderColor overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-cardBorderColor">
        <div className="flex items-center">
          <span className="font-medium">Lodging</span>
          <span className="ml-2 text-gray-500 text-sm">2</span>
        </div>
        <button className="text-blue-500 hover:text-blue-600">
          <span>+</span>
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-lg">{name}</h3>
        <p className="text-sm text-gray-600 mt-1">{address}</p>

        <div className="mt-4 text-sm">
          <div className="flex items-center mb-1">
            <span className="text-gray-600">Breakfast included</span>
            <span className="ml-1">{breakfast ? "✓" : "✗"}</span>
          </div>
          <div className="mb-1">
            <span className="text-gray-600">Restaurant Hours: </span>
            <span>{restaurantHours}</span>
          </div>
          <div className="mb-1">
            <span className="text-gray-600">Room Service: </span>
            <span>{roomService}</span>
          </div>
          <div className="mb-1">
            <span className="text-gray-600">Amenities: </span>
            <span>{amenities.join(" / ")}</span>
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <div>
            <div className="text-sm text-gray-500">Check In</div>
            <div className="font-medium">{checkIn.date}</div>
            <div className="text-sm">{checkIn.time}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Check Out</div>
            <div className="font-medium">{checkOut.date}</div>
            <div className="text-sm">{checkOut.time}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Phone</div>
            <div className="font-medium">{phone}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LodgingPanel;
