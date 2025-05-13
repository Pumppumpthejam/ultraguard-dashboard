// src/pages/AdminUploadDevices.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

interface Client {
  id: string;
  name?: string;
  email: string;
  role: string;
}

const AdminUploadDevices: React.FC = () => {
  const auth = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error(data.error || "Fetch failed");
        setClients(data.filter((user: Client) => user.role === "client"));
      } catch (err) {
        console.error("❌ Failed to load clients:", err);
        setMessage("❌ Failed to load clients");
      }
    };

    if (auth?.user?.role === "admin") {
      fetchClients();
    }
  }, [auth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient || !file) {
      setMessage("❌ Please select a client and upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("clientId", selectedClient);
    formData.append("file", file);

    const res = await fetch("http://localhost:4000/api/admin/upload-devices", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    const result = await res.json();
    if (res.ok) {
      setMessage(`✅ Uploaded ${result.results?.length || 0} devices.`);
    } else {
      setMessage(`❌ Error: ${result.error || "Upload failed."}`);
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Upload Devices to Client</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Select Client</label>
          <select
            className="bg-gray-800 border border-gray-600 p-2 rounded w-full"
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
          >
            <option value="">-- Choose Client --</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name || client.email}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">CSV File</label>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="bg-gray-800 border border-gray-600 p-2 rounded w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-semibold"
        >
          Upload Devices
        </button>

        {message && <p className="mt-3 text-red-400">{message}</p>}
      </form>
    </div>
  );
};

export default AdminUploadDevices;
