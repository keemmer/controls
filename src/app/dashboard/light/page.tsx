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
