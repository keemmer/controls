"use client";
import { FaRegLightbulb } from "react-icons/fa";
type Props = {
  no: number;
  name: string;
  switch: boolean;
  description?: string;
  onClick?: () => void;
};

const CartLight = (props: Props) => {
  return (
    <div
      className="bg-white text-gray-500 p-6 rounded-lg shadow-sm transition-all duration-200 cursor-pointer border-gray-100 
      hover:border-purple-500  hover:bg-purple-50 hover:shadow-lg hover:box-sizing-border-box"
      onClick={props.onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-bold">
          # {props.no.toString().padStart(2, "0")}
        </span>
        <h2 className="text-lg font-semibold text-transform: uppercase ">
          {props.name}
        </h2>
      </div>

      <div
        className={`min-h-18 rounded-xl flex items-center justify-around p-3 ${
          props.switch
            ? "bg-gradient-to-r from-indigo-700 to-purple-800 text-white"
            : "text-gray-400"
        }`}
      >
        <span className="text-md font-semibold mr-8">Light</span>
        <FaRegLightbulb className="text-6xl" />
      </div>

      {props.description && (
        <p className="text-gray-400 mt-8 text-sm text-right">
          {props.description}
        </p>
      )}
    </div>
  );
};
export default CartLight;
