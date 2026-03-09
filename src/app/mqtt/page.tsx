
"use client";

import { useEffect, useState } from "react";
import { connectMQTT } from "@/lib/mqttClient";
import { MqttClient } from "mqtt";
import {  MdSend, MdOutlineHub, MdHistory, MdAccountCircle } from "react-icons/md";

export default function MQTTPublisherPage() {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [message, setMessage] = useState("{\"device\": \"D-0001\", \"status\": \"ON\"}");
  const [topic, setTopic] = useState("home/controls/light");
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    const mqttClient = connectMQTT(); // เชื่อมต่อ MQTT จาก lib ที่สร้างไว้
    
    mqttClient.on("connect", () => {
      setStatus("Connected");
      mqttClient.subscribe(topic);
    });

    mqttClient.on("error", () => setStatus("Disconnected"));
    setClient(mqttClient);
  }, []);

  const handlePublish = () => {
    if (client && client.connected) {
      client.publish(topic, message, { qos: 1 });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF] p-6 lg:p-10 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Section 1: Header (แบบเดียวกับหน้า Hello Rodriguez) --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <MdAccountCircle size={40} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-gray-900">Hello Keemmer!</h1>
              <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">ID: HEX-999783006</p>
            </div>
          </div>
          
          <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-tighter ${
            status === "Connected" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
          }`}>
            <span className={`w-2.5 h-2.5 rounded-full ${status === "Connected" ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
            Broker: {status}
          </div>
        </div>

        {/* --- Section 2: Main Content Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: MQTT Console Card */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[3rem] p-8 md:p-12 border-none transition-all">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl">
                  <MdOutlineHub size={28} />
                </div>
                <h2 className="text-xl font-black text-gray-800 tracking-tight">MQTT Publisher Console</h2>
              </div>

              <div className="space-y-8">
                {/* Topic Input */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Target Topic</label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 focus:bg-white border-2 border-transparent focus:border-indigo-600/10 px-6 py-4 rounded-2xl text-gray-700 outline-none transition-all"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>

                {/* Message Input */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">JSON Payload</label>
                  <textarea
                    className="w-full bg-gray-50 focus:bg-white border-2 border-transparent focus:border-indigo-600/10 px-6 py-5 rounded-[2rem] text-gray-600 font-mono text-sm outline-none transition-all resize-none"
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                {/* Action Button */}
                <button
                  onClick={handlePublish}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-[1.5rem] transition-all flex items-center justify-center gap-3 active:scale-[0.97] shadow-none"
                >
                  PUBLISH NOW
                  <MdSend size={22} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Information & History Cards */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Actions Card */}
            <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <MdHistory size={36} className="mb-4 opacity-40" />
                <h3 className="text-lg font-black mb-2">Quick Commands</h3>
                <p className="text-indigo-100 text-xs font-medium leading-relaxed opacity-80">
                  Select a template to quickly populate your message payload.
                </p>
                <div className="mt-6 space-y-2">
                   <button className="w-full bg-white/10 hover:bg-white/20 py-3 rounded-xl text-xs font-bold transition-all">LIGHT_ON_ALL</button>
                   <button className="w-full bg-white/10 hover:bg-white/20 py-3 rounded-xl text-xs font-bold transition-all">SYSTEM_REBOOT</button>
                </div>
              </div>
              {/* Decorative Circle */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
            </div>

            {/* Device Info Card */}
            <div className="bg-white rounded-[2.5rem] p-8 flex flex-col justify-between min-h-[250px]">
              <h3 className="font-black text-gray-800 text-sm uppercase tracking-widest mb-6">Network Info</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs font-bold">Protocol</span>
                  <span className="text-gray-800 text-xs font-black">MQTT / WebSockets</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs font-bold">Host</span>
                  <span className="text-gray-800 text-xs font-black text-right truncate ml-4">localhost:15675</span>
                </div>
              </div>
              <div className="mt-auto pt-6 border-t border-gray-50">
                 <p className="text-[10px] text-gray-400 font-medium italic text-center">Configured via lib/mqttClient.ts</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
/*
"use client";

import { useEffect, useState } from "react";
import { connectMQTT } from "@/lib/mqttClient";
import { MqttClient } from "mqtt";
import { MdConnectedTv, MdSend } from "react-icons/md"; // เพิ่ม Icon เพื่อความสวยงาม

export default function MQTTPublisher() {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [message, setMessage] = useState("{\"device\": \"D-0001\", \"status\": \"ON\"}");
  const [topic, setTopic] = useState("test");
  const [status, setStatus] = useState("Disconnected");

  useEffect(() => {
    const mqttClient = connectMQTT();
    
    mqttClient.on("connect", () => {
      setStatus("Connected");
      mqttClient.subscribe(topic);
    });

    mqttClient.on("message", (topic, message) => {
      console.log(`📨 Message from ${topic}:`, message.toString());
    });

    setClient(mqttClient);
    
    // ไม่แนะนำให้ใส่ mqttClient.end() ใน return ของหน้าเพจ 
    // หากต้องการให้การเชื่อมต่อคงอยู่ตลอดการใช้งาน dashboard
  }, []);

  const handlePublish = () => {
    if (client && client.connected) {
      client.publish(topic, message, { qos: 1 });
      console.log(`✅ Published: ${message}`);
      // setMessage(""); // เปิดไว้หากต้องการเคลียร์ค่าหลังส่ง
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-transparent p-6">
      <div className="w-full max-w-xl bg-white rounded-[2.5rem] border-2 border-gray-100 p-10 transition-all">
        
      }
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-indigo-600 text-white rounded-[1.5rem]">
              <MdConnectedTv size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">MQTT Console</h1>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                {status === "Connected" ? "● Online" : "○ Offline"}
              </p>
            </div>
          </div>
        </div>

  }
        <div className="space-y-6">

          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">
              Destination Topic
            </label>
            <input
              type="text"
              className="w-full bg-gray-50 border-2 border-transparent focus:border-indigo-600/20 focus:bg-white px-4 py-3 rounded-2xl text-gray-700 font-medium outline-none transition-all"
              placeholder="e.g. home/living-room/light"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>


          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">
              JSON Payload
            </label>
            <textarea
              className="w-full bg-gray-50 border-2 border-transparent focus:border-indigo-600/20 focus:bg-white px-4 py-3 rounded-3xl text-gray-600 font-mono text-sm outline-none transition-all resize-none"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>


          <button
            onClick={handlePublish}
            className="group w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-[1.5rem] transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            <span className="tracking-wide">Publish Message</span>
            <MdSend className="group-hover:translate-x-1 transition-transform" size={20} />
          </button>
        </div>

        }
        <p className="mt-8 text-center text-xs text-gray-400 font-medium italic">
          Messages are sent with QoS 1 to ensure delivery.
        </p>
      </div>
    </div>
  );
}*/