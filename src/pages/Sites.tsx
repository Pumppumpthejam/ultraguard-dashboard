// src/pages/Sites.tsx
import React, { useEffect, useState } from "react";

type Site = {
  id: number;
  name: string;
  deviceId: string;
};

const Sites: React.FC = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const [newSite, setNewSite] = useState({ name: "", deviceId: "" });

  const API_BASE = "http://localhost:4000"; // adjust this if hosted elsewhere

  const getSites = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/sites`);
      const data = await res.json();
      setSites(data);
    } catch (err) {
      console.error("Failed to fetch sites", err);
    }
  };

  const handleAddSite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSite.name || !newSite.deviceId) return;

    try {
      const res = await fetch(`${API_BASE}/api/sites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSite),
      });

      if (res.ok) {
        setNewSite({ name: "", deviceId: "" });
        getSites(); // refresh list
      } else {
        console.error("Failed to add site");
      }
    } catch (err) {
      console.error("Error adding site", err);
    }
  };

  useEffect(() => {
    getSites();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">📍 Site Overview</h1>

      {sites.length === 0 ? (
        <p className="text-gray-400">No sites found. Please add one below.</p>
      ) : (
        <ul className="mb-6 space-y-2">
          {sites.map((site) => (
            <li
              key={site.id}
              className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{site.name}</p>
                <p className="text-sm text-gray-400">Device ID: {site.deviceId}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h2 className="text-lg font-semibold mb-2 mt-6">➕ Add New Site</h2>
      <form
        onSubmit={handleAddSite}
        className="bg-gray-800 p-4 rounded-lg flex flex-col sm:flex-row gap-4"
      >
        <input
          type="text"
          placeholder="Site Name"
          value={newSite.name}
          onChange={(e) => setNewSite({ ...newSite, name: e.target.value })}
          className="bg-gray-700 p-2 rounded w-full sm:w-1/2"
        />
        <input
          type="text"
          placeholder="Device ID"
          value={newSite.deviceId}
          onChange={(e) => setNewSite({ ...newSite, deviceId: e.target.value })}
          className="bg-gray-700 p-2 rounded w-full sm:w-1/2"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white w-full sm:w-auto"
        >
          Add Site
        </button>
      </form>
    </div>
  );
};

export default Sites;
