import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [devices, setDevices] = useState(null);

  const getDevices = async () => {
    const devices = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
    });

    console.log(devices);
    setDevices(devices);
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
