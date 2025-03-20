// Define personnel role types
export type PersonnelRole =
  | "Artist"
  | "Band Member"
  | "Crew"
  | "Management"
  | "Production";

// Define personnel interface
export interface Personnel {
  id: string;
  name: string;
  role: PersonnelRole;
  email: string;
  phone: string;
  location: string;
  status: "Active" | "On Leave" | "Remote";
  notes?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  group: string;
  groupTags?: string[];
  travelProfile?: {
    hasPassport: boolean;
    hasTravelArrangements: boolean;
    hasEmergencyContact: boolean;
    hasFoodRestrictions: boolean;
  };
  permissions?: "Admin" | "Editor" | "Viewer";
  visibility?: boolean;
  canAddPersonnel?: boolean;
}

// Sample personnel data
export const personnelData: Personnel[] = [
  {
    id: "1",
    name: "Omar Apollo",
    role: "Artist",
    email: "omar@example.com",
    phone: "+1 (555) 123-4567",
    location: "Los Angeles, CA",
    status: "Active",
    notes:
      "Lead artist for the West Coast tour. Requires green room setup with specific rider items.",
    emergencyContact: {
      name: "Maria Apollo",
      relationship: "Sister",
      phone: "+1 (555) 987-6543",
    },
    group: "West Coast",
    groupTags: ["Singer", "VIP", "Artist Party"],
    travelProfile: {
      hasPassport: true,
      hasTravelArrangements: true,
      hasEmergencyContact: true,
      hasFoodRestrictions: true,
    },
    permissions: "Admin",
    visibility: true,
    canAddPersonnel: true,
  },
  {
    id: "2",
    name: "Maya Rodriguez",
    role: "Management",
    email: "maya@example.com",
    phone: "+1 (555) 234-5678",
    location: "New York, NY",
    status: "Active",
    notes: "Tour manager responsible for day-to-day operations and logistics.",
    emergencyContact: {
      name: "David Rodriguez",
      relationship: "Spouse",
      phone: "+1 (555) 876-5432",
    },
    group: "East Coast",
    groupTags: ["Management", "Production"],
    travelProfile: {
      hasPassport: true,
      hasTravelArrangements: true,
      hasEmergencyContact: true,
      hasFoodRestrictions: false,
    },
    permissions: "Admin",
    visibility: true,
    canAddPersonnel: true,
  },
  {
    id: "3",
    name: "James Wilson",
    role: "Band Member",
    email: "james@example.com",
    phone: "+1 (555) 345-6789",
    location: "Chicago, IL",
    status: "Active",
    notes: "Lead guitarist. Allergic to peanuts.",
    emergencyContact: {
      name: "Emma Wilson",
      relationship: "Mother",
      phone: "+1 (555) 765-4321",
    },
    group: "Midwest",
  },
  {
    id: "4",
    name: "Sarah Chen",
    role: "Production",
    email: "sarah@example.com",
    phone: "+1 (555) 456-7890",
    location: "Austin, TX",
    status: "Remote",
    notes: "Production manager handling technical aspects of the show.",
    emergencyContact: {
      name: "Michael Chen",
      relationship: "Brother",
      phone: "+1 (555) 654-3210",
    },
    group: "South",
  },
  {
    id: "5",
    name: "David Kim",
    role: "Crew",
    email: "david@example.com",
    phone: "+1 (555) 567-8901",
    location: "Seattle, WA",
    status: "Active",
    notes: "Sound engineer with 10+ years of experience.",
    emergencyContact: {
      name: "Jennifer Kim",
      relationship: "Spouse",
      phone: "+1 (555) 543-2109",
    },
    group: "West Coast",
  },
  {
    id: "6",
    name: "Aisha Johnson",
    role: "Band Member",
    email: "aisha@example.com",
    phone: "+1 (555) 678-9012",
    location: "Atlanta, GA",
    status: "On Leave",
    notes: "Drummer. On leave until October 15th for family emergency.",
    emergencyContact: {
      name: "Robert Johnson",
      relationship: "Father",
      phone: "+1 (555) 432-1098",
    },
    group: "South",
  },
  {
    id: "7",
    name: "Carlos Mendez",
    role: "Crew",
    email: "carlos@example.com",
    phone: "+1 (555) 789-0123",
    location: "Miami, FL",
    status: "Active",
    notes: "Lighting technician specializing in LED setups.",
    emergencyContact: {
      name: "Elena Mendez",
      relationship: "Mother",
      phone: "+1 (555) 321-0987",
    },
    group: "South",
  },
];
