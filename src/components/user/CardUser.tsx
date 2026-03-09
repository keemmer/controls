"use client";
import { FaRegUser } from "react-icons/fa";

interface UserProps {
  no: number;
  username: string;
  role: string;
  email?: string;
  status: boolean;
  onToggle: () => void;
}

export default function CardUser({
  no,
  username,
  email,
  role,
  status,
  onToggle,
}: UserProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col space-y-3 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        <div className="bg-indigo-100 p-3 rounded-full text-indigo-600 text-2xl">
          <FaRegUser />
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-500">#{no}</p>
          <h3 className="font-bold text-gray-800">{username}</h3>
          <p className="text-sm text-gray-500">{role}</p>
          {email && <p className="text-xs text-gray-400">{email}</p>}
        </div>
      </div>
      <button
        onClick={onToggle}
        className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
          status
            ? "bg-green-100 text-green-700 hover:bg-green-200"
            : "bg-red-100 text-red-700 hover:bg-red-200"
        }`}
      >
        {status ? "Active" : "Inactive"}
      </button>
    </div>
  );
}
