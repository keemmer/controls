"use client";
import CartLight from "@/components/devices/light/CardLight";
import { Device } from "@/model/light";
import { lightStore } from "@/store/light";

function page() {
  const lightDevice: Device[] = lightStore((state) => state.lights);
  const setToggle = lightStore((state) => state.setToggle);
  return (
    <>
      <div className="container mx-auto bg-white p-4 pb-10 rounded-md text-gray-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 p-2 max-h- overflow-auto">
          {lightDevice.map((device: Device) => (
            <CartLight
              no={lightDevice.indexOf(device) + 1}
              key={device.id}
              name={device.name}
              switch={device.switch}
              description={device.description}
              onClick={() => setToggle(device.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
export default page;


/*
"use client";
import { useEffect } from "react";
import { connectMQTT } from "@/lib/mqttClient";
// ... (imports เดิมของคุณ)

function Page() {
  const lightDevice = lightStore((state) => state.lights);
  const setToggle = lightStore((state) => state.setToggle);
  const updateStatus = lightStore((state) => state.updateStatus); // สมมติว่าคุณมีฟังก์ชันอัปเดต state

  useEffect(() => {
    const client = connectMQTT();

    // ฟังเสียงจาก Broker ว่ามีใครสั่งเปิด/ปิดไฟไหม
    client.on('message', (topic, message) => {
      console.log(`Topic: ${topic}, Message: ${message.toString()}`);
      
      // ตัวอย่างการแกะ Topic: home/lights/bedroom -> สั่ง update state ใน store
      const deviceId = topic.split('/').pop(); 
      const status = message.toString() === "true";
      // updateStatus(deviceId, status); 
    });

    // ไม่ต้อง client.end() ในนี้ เพราะเราต้องการให้มันต่อค้างไว้ตอนเปลี่ยนหน้า dashboard อื่นๆ
  }, []);

  const handleToggle = (id: string, currentSwitch: boolean) => {
    const client = connectMQTT();
    const newStatus = !currentSwitch;
    
    // ส่งคำสั่งไปยัง Hardware ผ่าน MQTT
    client.publish(`home/lights/${id}/set`, newStatus.toString(), { qos: 1 });
    
    // อัปเดต UI ทันที (Optimistic Update)
    setToggle(id);
  };

  return (
    <div className="container mx-auto bg-white p-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {lightDevice.map((device) => (
          <CartLight
            key={device.id}
            {...device}
            onClick={() => handleToggle(device.id, device.switch)}
          />
        ))}
      </div>
    </div>
  );
}
*/ 