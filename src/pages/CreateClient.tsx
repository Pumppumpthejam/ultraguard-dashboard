// src/pages/CreateClient.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateClient: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState(""); // Optional future use
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("http://localhost:4000/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setEmail("");
        setPassword("");
        setCompany("");
        setTimeout(() => navigate("/dashboard"), 1200); // Redirect after 1.2s
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="p-6 text-white max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">➕ Add New Client</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="company"
          className="w-full p-2 rounded bg-gray-800 text-white"
          placeholder="Company Name (optional)"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          type="email"
          name="email"
          className="w-full p-2 rounded bg-gray-800 text-white"
          placeholder="Client Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          className="w-full p-2 rounded bg-gray-800 text-white"
          placeholder="Client Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
        >
          Create Client
        </button>
        {success && (
          <p className="text-green-400">✅ Client created successfully! Redirecting...</p>
        )}
        {error && <p className="text-red-500">❌ {error}</p>}
      </form>
    </div>
  );
};

export default CreateClient;
