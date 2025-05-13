import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

interface Device {
  id: number;
  name: string;
  imei: string;
}

const Devices: React.FC = () => {
  const { user } = useAuth()!;
  const isAdmin = user?.role === "admin";

  const [devices, setDevices] = useState<Device[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchDevices = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:4000/api/devices", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      // Prevent crash if data is not an array
      if (!Array.isArray(data)) {
        throw new Error(data.error || "Invalid response");
      }

      setDevices(data);
    } catch (err) {
      console.error("❌ Failed to load devices:", err);
      setError("Failed to load devices.");
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">📡 Devices</h1>

      {error && <p className="text-red-500">{error}</p>}

      {Array.isArray(devices) && devices.length === 0 && (
        <p className="text-gray-400">No devices found.</p>
      )}

      <ul className="space-y-2">
        {Array.isArray(devices) &&
          devices.map((device) => (
            <li key={device.id} className="bg-gray-800 p-4 rounded">
              <strong>{device.name}</strong> — {device.imei}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Devices;
