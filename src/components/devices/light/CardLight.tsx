"use client";
import { FaRegLightbulb, FaLightbulb } from "react-icons/fa";

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
      // คลิกได้ทั้ง Card เพื่อสลับสถานะ
      onClick={props.onClick}
      className={`relative p-6 rounded-xl transition-all duration-500 border-2 cursor-pointer
          hover:border-purple-500  hover:bg-purple-50 hover:shadow-lg hover:box-sizing-border-box
      ${props.switch 
        ? "bg-white border-indigo-600/10" 
        : "bg-gray-50/50 border-transparent"
      }`} // ลบ shadow ออกตามที่ต้องการ และเพิ่ม border จางๆ แทน
    >
      {/* ส่วนบน: Icon และ Custom Toggle */}
      <div className="flex justify-between items-start mb-5">
        {/* Icon Container - ใช้สี indigo-600 เมื่อ Active */}
        <div className={`p-4 rounded-[1.5rem] transition-all duration-500 ${
          props.switch ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-400"
        }`}>
          {props.switch ? <FaLightbulb size={28} /> : <FaRegLightbulb size={28} />}
        </div>
        
        {/* Toggle Switch - ออกแบบตาม Template */}
        <div 
          className={`w-10 h-5 rounded-full p-1 transition-colors duration-500 relative ${
            props.switch ? "bg-indigo-600" : "bg-gray-200"
          }`}
        >
          <div className={`bg-white w-4 h-3 rounded-full transform transition-transform duration-500 ${
            props.switch ? "translate-x-4" : "translate-x-0"
          }`} />
        </div>
      </div>

      {/* ส่วนกลาง: ข้อมูลชื่อและสถานะ */}
      <div className="space-y-1">
        <h3 className={`font-semibold text-xl transition-colors ${
          props.switch ? "text-gray-900" : "text-gray-400"
        }`}>
          {props.name}
        </h3>
        <p className="text-sm  text-gray-400/80 tracking-wide uppercase">
          {props.switch ? "On" : "Off"}
        </p>
      </div>

      {/* ส่วนท้าย: Description */}
      {props.description && (
        <div className="mt-2 pt-2 border-t border-gray-100/50">
          <p className="text-xs text-gray-400 italic font-medium">
            {props.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default CartLight;
/*"use client";
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
*/