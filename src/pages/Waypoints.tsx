// src/pages/Waypoints.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Input from "../components/ui/input";
import Label from "../components/ui/label";
import Button from "../components/ui/button";

interface Waypoint {
  name: string;
  latitude: string;
  longitude: string;
  description?: string;
}

const Waypoints: React.FC = () => {
  const [device, setDevice] = useState("");
  const [devices, setDevices] = useState<any[]>([]);
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
  const [newWaypoint, setNewWaypoint] = useState<Waypoint>({
    name: "",
    latitude: "",
    longitude: "",
    description: "",
  });

  useEffect(() => {
    axios.get("/api/devices").then((res) => setDevices(res.data));
  }, []);

  useEffect(() => {
    if (device) {
      axios.get(`/api/waypoints?device=${device}`).then((res) => setWaypoints(res.data));
    }
  }, [device]);

  const handleAddWaypoint = () => {
    if (!device) return alert("Select a device first");

    axios
      .post("/api/waypoints", { ...newWaypoint, device })
      .then(() => {
        setNewWaypoint({ name: "", latitude: "", longitude: "", description: "" });
        return axios.get(`/api/waypoints?device=${device}`);
      })
      .then((res) => setWaypoints(res.data));
  };

  return (
    <div className="p-4 text-white">
      <h2 className="text-2xl font-bold mb-4">📍 Manage Waypoints</h2>

      <div className="mb-4">
        <Label>Select Device (IMEI)</Label>
        <select
          value={device}
          onChange={(e) => setDevice(e.target.value)}
          className="w-full bg-gray-800 text-white rounded px-4 py-2"
        >
          <option value="">-- Select Device --</option>
          {devices.map((d) => (
            <option key={d.imei} value={d.imei}>
              {d.name} ({d.imei})
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label>Waypoint Name</Label>
          <Input
            value={newWaypoint.name}
            onChange={(e) => setNewWaypoint({ ...newWaypoint, name: e.target.value })}
          />
        </div>
        <div>
          <Label>Latitude</Label>
          <Input
            value={newWaypoint.latitude}
            onChange={(e) => setNewWaypoint({ ...newWaypoint, latitude: e.target.value })}
          />
        </div>
        <div>
          <Label>Longitude</Label>
          <Input
            value={newWaypoint.longitude}
            onChange={(e) => setNewWaypoint({ ...newWaypoint, longitude: e.target.value })}
          />
        </div>
        <div>
          <Label>Description (optional)</Label>
          <Input
            value={newWaypoint.description}
            onChange={(e) => setNewWaypoint({ ...newWaypoint, description: e.target.value })}
          />
        </div>
      </div>

      <Button onClick={handleAddWaypoint}>Add Waypoint</Button>

      <hr className="my-6 border-gray-700" />

      <h3 className="text-xl font-semibold mb-2">Existing Waypoints</h3>
      <ul className="space-y-2">
        {waypoints.map((wp, index) => (
          <li key={index} className="bg-[#1E293B] p-4 rounded-md">
            <p className="font-semibold">{wp.name}</p>
            <p className="text-sm text-gray-400">
              Lat: {wp.latitude} | Lng: {wp.longitude}
            </p>
            {wp.description && <p className="text-sm italic">{wp.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Waypoints;
