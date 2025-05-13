// src/pages/SitesOverview.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Upload, MapPinned, ListChecks, Plus } from "lucide-react";

interface Site {
  id: string;
  name: string;
  deviceId: string;
  shiftType: string;
}

const SitesOverview: React.FC = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newSite, setNewSite] = useState({ name: "", deviceId: "" });

  const fetchSites = () => {
    fetch("/api/sites")
      .then((res) => res.json())
      .then((data) => {
        setSites(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch sites:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSites();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/sites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSite),
    });
    if (response.ok) {
      setShowModal(false);
      setNewSite({ name: "", deviceId: "" });
      fetchSites();
    } else {
      alert("Failed to add site.");
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">📍 Site Overview</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
        >
          <Plus size={16} className="mr-1" />
          New Site
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading sites...</p>
      ) : sites.length === 0 ? (
        <p className="text-gray-400">No sites found. Please add some using the button above.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {sites.map((site) => (
            <div
              key={site.id}
              className="bg-[#1E293B] hover:bg-[#334155] transition rounded-xl p-5 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-white mb-1">{site.name}</h2>
              <p className="text-sm text-gray-400">Device ID: {site.deviceId}</p>
              <p className="text-sm text-gray-400 mb-4">Shift Type: {site.shiftType}</p>

              <div className="flex flex-wrap gap-2">
                <Link
                  to={`/shifts?site=${site.id}`}
                  className="inline-flex items-center text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
                >
                  <ListChecks size={16} className="mr-1" />
                  Shifts
                </Link>
                <Link
                  to={`/waypoints?site=${site.id}`}
                  className="inline-flex items-center text-sm bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white"
                >
                  <MapPinned size={16} className="mr-1" />
                  Waypoints
                </Link>
                <Link
                  to={`/upload?site=${site.id}`}
                  className="inline-flex items-center text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-white"
                >
                  <Upload size={16} className="mr-1" />
                  Upload
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for New Site */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-[#1E293B] p-6 rounded-lg w-[90%] max-w-md">
            <h2 className="text-white text-lg font-bold mb-4">Add New Site</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Site Name"
                value={newSite.name}
                onChange={(e) => setNewSite({ ...newSite, name: e.target.value })}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
                required
              />
              <input
                type="text"
                placeholder="Device IMEI"
                value={newSite.deviceId}
                onChange={(e) => setNewSite({ ...newSite, deviceId: e.target.value })}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SitesOverview;
