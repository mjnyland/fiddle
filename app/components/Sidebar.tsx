import React from "react";
import Image from "next/image";

type NavItemProps = {
  icon: string;
  label: string;
  active?: boolean;
  hasSubItems?: boolean;
  expanded?: boolean;
};

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  active = false,
  hasSubItems = false,
  expanded = false,
}) => {
  return (
    <div
      className={`flex items-center px-4 py-2 text-sm ${
        active ? "bg-gray-100" : "hover:bg-gray-50"
      } cursor-pointer`}
    >
      <div className="w-5 h-5 mr-2 flex items-center justify-center">
        {hasSubItems && (
          <span className="text-gray-400 mr-1">{expanded ? "▼" : "▶"}</span>
        )}
        <span className="text-gray-500">{icon}</span>
      </div>
      <span className="text-gray-700">{label}</span>
    </div>
  );
};

const Sidebar: React.FC = () => {
  return (
    <div className="w-[205px] bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden mr-2">
            <Image
              src="/placeholder-avatar.png"
              alt="User avatar"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          <div>
            <div className="text-sm font-medium">Omar Apollo</div>
            <div className="text-xs text-gray-500">World Tour: West Coast</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <NavItem
          icon="▼"
          label="World Tour: West Coast"
          active
          hasSubItems
          expanded
        />
        <NavItem icon="👤" label="Personnel" />
        <NavItem icon="✈️" label="Travel" />
        <NavItem icon="📄" label="Documents" />
        <NavItem icon="⚙️" label="Settings" />

        <div className="mt-4 pt-4 border-t border-gray-200">
          <NavItem icon="📅" label="Calendar" hasSubItems expanded />

          <div className="pl-6 py-2">
            {[2, 3, 4, 5, 6, 7, 8, 9].map((day) => (
              <div key={day} className="flex items-center py-1 text-xs">
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center mr-2 ${
                    day === 6
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {day}
                </div>
                <div>
                  <div className="text-xs font-medium">Show Day</div>
                  <div className="text-xs text-gray-500">Kia Forum</div>
                  <div className="text-xs text-gray-500">Los Angeles, CA</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
