import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LiveReportCard: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">View Live</h2>
        <select className="border px-3 py-1 rounded text-sm">
          <option>Select a device</option>
          <option>Device 1</option>
          <option>Device 2</option>
        </select>
      </div>

      {/* Map */}
      <div className="h-64 w-full rounded overflow-hidden mb-4">
        <MapContainer
          center={[40.7128, -74.006]}
          zoom={13}
          scrollWheelZoom={false}
          className="h-full w-full z-0"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[40.7128, -74.006]}>
            <Popup>Example Device Location</Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Footer: Date pickers and buttons */}
      <div className="text-sm text-gray-500 mb-2">Performance Report</div>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <input
          type="date"
          className="border px-2 py-1 rounded"
          defaultValue="2025-05-01"
        />
        <input
          type="date"
          className="border px-2 py-1 rounded"
          defaultValue="2025-05-08"
        />
        <button className="bg-blue-600 text-white px-3 py-1 rounded">
          Submit
        </button>
        <button className="border text-blue-600 px-3 py-1 rounded">
          Download
        </button>
      </div>
    </div>
  );
};

export default LiveReportCard;
