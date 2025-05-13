// Login.tsx - Handles login form and authentication

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login: React.FC = () => {
  const navigate = useNavigate();             // React Router for navigation
  const auth = useAuth();                     // Get auth context

  const [email, setEmail] = useState("");     // Email input state
  const [password, setPassword] = useState(""); // Password input state
  const [error, setError] = useState("");     // Error message state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // 🔧 FIXED: Use correct backend URL
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed.");
        return;
      }

      localStorage.setItem("token", data.token); // Save JWT to localStorage

      if (auth?.setAuth) {
        auth.setAuth({ user: data.user });       // Set user context
      }

      // ✅ Redirect based on user role
      if (data.user.role === "admin") {
        navigate("/admin/panel");
      } else {
        navigate("/sites");
      }
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login to Ultraguard</h2>
        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div>
          <label>Email</label>
          <input
            type="email"
            className="w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            className="w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
// This component handles the login form, including input fields for email and password.
// It uses the useAuth hook to manage authentication state and redirects users based on their role after successful login.