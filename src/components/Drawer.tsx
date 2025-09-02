"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome } from "react-icons/fi";
import { FaRegLightbulb } from "react-icons/fa";
import { LuPlug2 } from "react-icons/lu";
import { IoSpeedometerOutline } from "react-icons/io5";
import { MdSensors } from "react-icons/md";
import { RiAlarmWarningLine } from "react-icons/ri";
import { FaFaucet } from "react-icons/fa6";
import { MdDevicesOther } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { MdConnectedTv } from "react-icons/md";

type MenuItemKey = {
  groupName: string;
  key: string;
  item: MenuItem[];
};

type MenuItem = {
  key: string;
  label: string;
  icon: React.ReactNode;
  link?: string;
};

export default function Drawer() {
  const pathname = usePathname();
  const [active, setActive] = useState<string>(pathname);
  const [expanded, setExpanded] = useState<boolean>(true);
  const menuItems: MenuItemKey[] = [
    {
      key: "dashboard",
      groupName: "Dashboard",
      item: [
        { key: "Home", label: "Home", icon: <FiHome />, link: "/dashboard" },
        {
          key: "Light",
          label: "Light",
          icon: <FaRegLightbulb />,
          link: "/dashboard/light",
        },
        { key: "Plug", label: "Plug", icon: <LuPlug2 /> },
        {
          key: "PowerMeter",
          label: "Power Meter",
          icon: <IoSpeedometerOutline />,
        },
        { key: "Sensor", label: "Sensor", icon: <MdSensors /> },
        { key: "Alarm", label: "Alarm", icon: <RiAlarmWarningLine /> },
        { key: "Water", label: "Water", icon: <FaFaucet /> },
      ],
    },
    {
      key: "settings",
      groupName: "Settings",
      item: [
        { key: "Device", label: "Device", icon: <MdDevicesOther /> },
        { key: "Mqtt", label: "Mqtt", icon: <MdConnectedTv />, link: "/mqtt" },
        { key: "User", label: "User", icon: <FaRegUser /> },
      ],
    },
  ];

  return (
    <aside
      className={`h-auto bg-white border-r shadow-sm flex flex-col  transition-all duration-300 
		${expanded ? "sm:w-64 w-16" : "w-16"}`}
    >
      {/* Brand Section */}
      {expanded ? (
        <div
          className="px-6 py-4 border-b border-gray-200 bg-primary text-gray-700 font-bold text-2xl hover:cursor-pointer sm:block hidden"
          onClick={() => setExpanded(!expanded)}
        >
          HEXDAS
          <div className="text-sm font-light text-gray-400">
            Controls System
          </div>
        </div>
      ) : (
        <div
          className="px-2 py-4 border-b border-gray-200 bg-primary text-gray-700 font-bold text-2xl hover:cursor-pointer sm:block hidden"
          onClick={() => setExpanded(!expanded)}
        >
          HDS
        </div>
      )}

      {/* Menu Items */}
      <nav className="flex-1 text-gray-500 overflow-auto px-2 py-4">
        {menuItems.map((menu) => (
          <div key={menu.key} className="mb-4">
            <div
              className={`px-4 py-2 font-medium text-sm ${
                expanded ? "sm:block hidden" : "hidden"
              }`}
            >
              {menu.groupName}
            </div>
            {menu.item.map((item) => (
              <Link key={item.key} href={item.link || "#"}>
                <div
                  className={`flex items-center content-center align-center py-2 rounded-md hover:cursor-pointer  transition-all duration-100 ${
                    expanded ? "sm:px-4 px-3" : "px-3"}
                  ${active != item.link ? "hover:bg-gray-100 hover:text-gray-500" : ""} 
                  ${active === item.link ? "bg-indigo-600 text-white" : ""}  `}
                  onClick={() => setActive(item.link || "")}
                >
                  <span className="mr-3 sm:text-xl text-2xl">{item.icon}</span>
                  <span
                    className={`${expanded ? "sm:block hidden" : "hidden"}`}
                  >
                    {item.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="px-4 py-3 border-t border-gray-200 text-sm text-gray-500 sm:block hidden">
        ⚙️ ผู้ดูแลระบบ
      </div>
    </aside>
  );
}
