import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        {
          username,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);
      window.location.href = "/"; 
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMsg(err.response?.data?.message || "Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen bg-yellow-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-xl w-[350px]">
        <h2 className="text-2xl font-bold text-center text-yellow-600 mb-4">
           Login
        </h2>
        <input
          className="w-full mb-4 px-3 py-2 border rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full mb-4 px-3 py-2 border rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {msg && <p className="text-red-500 text-sm mb-2">{msg}</p>}
        <button
          className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
