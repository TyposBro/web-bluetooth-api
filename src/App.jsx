import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [devices, setDevices] = useState(null);

  const getDevices = async () => {
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
    });

    console.log(device);
    console.log("Connecting to GATT Server...");
    try {
      await device.gatt.connect();
    } catch (error) {
      console.log(error);
    }
    console.log("Getting Service...");
    const service = await device.gatt.getPrimaryService("battery_service").catch(console.log);
    console.log("Getting Characteristic...");
    const characteristic = await service.getCharacteristic("battery_level");
    console.log("Reading Characteristic...");
    const value = await characteristic.readValue();
    console.log("Battery percentage is " + value.getUint8(0));
    device.battery = value.getUint8(0);

    setDevices(device);
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={getDevices}>GET</button>
        <ul>
          {devices && (
            <>
              <li>Device name: {devices.name}</li>
              <li>Device battery: {devices.battery}</li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default App;
