import React, { useEffect, useState } from "react";

interface User {
  id: number;
  email: string;
  role: string;
  active: number;
}

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (userId: number, current: number) => {
    try {
      await fetch(`http://localhost:4000/api/admin/users/${userId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ active: current ? 0 : 1 }),
      });
      fetchUsers();
    } catch (err) {
      console.error("Toggle failed", err);
    }
  };

  const createUser = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: newEmail, password: newPassword }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert("❌ " + err.error);
        return;
      }

      setShowModal(false);
      setNewEmail("");
      setNewPassword("");
      fetchUsers();
    } catch (err) {
      console.error("User creation failed", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">👤 Admin Panel – Client Management</h1>
        <button
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
          onClick={() => setShowModal(true)}
        >
          ➕ Add Client
        </button>
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="w-full bg-gray-900 text-sm border border-gray-700 rounded">
          <thead className="bg-gray-800 text-left">
            <tr>
              <th className="p-2 border-b border-gray-700">Email</th>
              <th className="p-2 border-b border-gray-700">Role</th>
              <th className="p-2 border-b border-gray-700">Status</th>
              <th className="p-2 border-b border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-gray-700">
                <td className="p-2">{user.email}</td>
                <td className="p-2 capitalize">{user.role}</td>
                <td className="p-2">
                  {user.active ? (
                    <span className="text-green-400 font-semibold">Active</span>
                  ) : (
                    <span className="text-red-400 font-semibold">Inactive</span>
                  )}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => toggleStatus(user.id, user.active)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    {user.active ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded shadow-lg w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Add New Client</h2>
            <input
              type="email"
              placeholder="Client Email"
              className="w-full mb-3 px-3 py-2 bg-gray-700 text-white rounded"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Temporary Password"
              className="w-full mb-4 px-3 py-2 bg-gray-700 text-white rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-600 px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 px-4 py-2 rounded"
                onClick={createUser}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
