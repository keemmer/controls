// app/mqtt-publisher/page.tsx or components/MQTTPublisher.tsx
"use client";

import { useEffect, useState } from "react";
import { connectMQTT } from "@/lib/mqttClient";
import { MqttClient } from "mqtt";

export default function MQTTPublisher() {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [message, setMessage] = useState("{\"device\": \"D-0001\", \"status\": \"ON\"}");
  const [topic, setTopic] = useState("test");

  useEffect(() => {
    const mqttClient = connectMQTT();
    mqttClient.subscribe(topic, (err) => {
      if (err) {
        console.error("Subscribe error:", err);
      }
    });

    mqttClient.on("message", (topic, message) => {
      console.log(`📨 Message from ${topic}:`, message.toString());
    });

    setClient(mqttClient);
    return () => {
      mqttClient.end();
    };
  }, []);

  const handlePublish = () => {
    console.log(`Publishing to ${topic}: ${message}`);
    if (client && client.connected) {
      client.publish(topic, message, {}, (err) => {
        if (err) {
          console.error("❌ Publish error:", err);
        } else {
          console.log(`✅ Message published to ${topic}: ${message}`);
        }
      });
      setMessage(""); // Clear the message input after publishing
    } else {
      console.warn("⚠️ MQTT client not connected");
    }
  };

  return (
<div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
    <div className="bg-white text-gray-500 p-6 max-w-lg  rounded-lg" >
      <h1 className="text-2xl font-bold mb-4">MQTT Publisher</h1>
      <label className="block mb-2 font-medium">Topic</label>
      <input
        type="text"
        className="w-full border border-gray-300 px-3 py-2 mb-4 rounded"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <label className="block mb-2 font-medium">Message</label>
      <textarea
        className="w-full border border-gray-300 px-3 py-2 mb-4 rounded"
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={handlePublish}
        className="bg-indigo-700 text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-indigo-600 "
      >
        Publish
      </button>
    </div>
    </div>
  );
}
