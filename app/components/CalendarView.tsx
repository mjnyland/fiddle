import React from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarToolbar from "./CalendarToolbar";
import ScheduleList from "./ScheduleList";
import VenuePanel from "./VenuePanel";
import LodgingPanel from "./LodgingPanel";
import NotesPanel from "./NotesPanel";
import { ScheduleItemProps } from "./ScheduleItem";

const scheduleItems: ScheduleItemProps[] = [
  {
    timeStart: "8:00 AM",
    timeEnd: "10:00 AM",
    title: "Breakfast",
    completed: true,
  },
  {
    timeStart: "11:00 AM",
    title: "Crew Load In",
    tags: ["Band Party", "Crew Party"],
  },
  {
    timeStart: "12:00 PM",
    title: "Lighting and Video Call",
    description: "Soft lighting, eye-level camera.",
    tags: ["Crew Party"],
  },
  {
    timeStart: "12:00 PM",
    timeEnd: "3:00 PM",
    title: "Lunch",
    completed: true,
  },
  {
    timeStart: "3:30 PM",
    timeEnd: "4:15 PM",
    title: "Band Setup",
    tags: ["Band Party", "Crew Party"],
  },
  {
    timeStart: "4:15 PM",
    timeEnd: "5:15 PM",
    title: "Sound Check",
    tags: ["Artist Party", "Band Party", "Crew Party"],
  },
  {
    timeStart: "5:00 PM",
    timeEnd: "6:00 PM",
    title: "Production Meeting",
    description: "Meet at 5+, ensure equipment is set up.",
    tags: ["Crew Party"],
  },
  {
    timeStart: "5:00 PM",
    timeEnd: "8:00 PM",
    title: "Dinner",
  },
  {
    timeStart: "8:00 PM",
    timeEnd: "9:00 PM",
    title: "Take Stage",
    tags: ["Artist Party", "Band Party"],
  },
  {
    timeStart: "9:15 PM",
    title: "Breakdown and Load Out",
    tags: ["Band Party", "Crew Party"],
  },
  {
    timeStart: "9:45 PM",
    timeEnd: "10:15 PM",
    title: "Shuttle Venue to Hotel",
    description: "Tagged parties and anyone else who requires a shuttle.",
    isTransportation: true,
    transportationDetails: {
      type: "car",
      taggedParties: true,
      destination: "Hotel",
    },
    tags: ["Lighting", "SFX", "Production", "Carps"],
  },
  {
    timeStart: "10:30 PM",
    timeEnd: "2:44 AM",
    title: "B Party to Chicago",
    isTransportation: true,
    transportationDetails: {
      type: "bus",
      destination: "Chicago",
    },
    tags: ["Band Party"],
  },
  {
    timeStart: "10:55 PM",
    timeEnd: "1:00 AM",
    title: "Managers to MEX",
    description: "MIA to MEX • 2 Stops • DL 1234, DL3201, DL1023",
    isTransportation: true,
    transportationDetails: {
      type: "plane",
      destination: "MEX",
      flightDetails: "MIA to MEX • 2 Stops • DL 1234, DL3201, DL1023",
    },
    tags: ["Managers"],
  },
];

const CalendarView: React.FC = () => {
  return (
    <div className="h-full flex flex-col p-6 ">
      <div className="flex-none mb-6">
        <CalendarHeader
          date="Monday, October 6"
          title="Show Day"
          subtitle="Kia Forum"
        />

        <CalendarToolbar />
      </div>

      <div className="grid grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="col-span-2 flex flex-col">
          <div className="flex-none">
            <ScheduleList items={scheduleItems} title="6" />
          </div>
        </div>

        <div className="overflow-y-auto pr-2 pb-6 space-y-6">
          <VenuePanel
            name="Palacio de los Deportes"
            address="Colonia Granjas México, Iztacalco, 08400 Mexico City, CDMX, Mexico"
            capacity={74201}
            sunset="5:47 PM"
          />

          <LodgingPanel
            name="InterContinental Presidente"
            address="Campos Elíseos 218, Polanco, Col. Chapultepec Polanco, Miguel Hidalgo, 11560 Ciudad de México, CDMX, Mexico"
            breakfast={true}
            restaurantHours="9AM - 7:30PM"
            roomService="24 Hours"
            amenities={["Gym", "Spa", "Pool"]}
            checkIn={{
              date: "1/19",
              time: "3:00 PM",
            }}
            checkOut={{
              date: "1/22",
              time: "12:00 PM",
            }}
            phone="917-617-9668"
          />

          <NotesPanel
            notes={[
              {
                content:
                  "If you need your laundry done please bring 161,951.99 IDR (~10 equivalent) and we will send a runner out to have it laundered.",
                type: "normal",
              },
              {
                content:
                  "If you need IDR there is a ATM machine at the hotel near the escalators to the tunnel to the mall or at the mall.",
                type: "normal",
              },
              {
                content: "Note",
                type: "automation",
              },
              {
                content: "Note",
                type: "normal",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
