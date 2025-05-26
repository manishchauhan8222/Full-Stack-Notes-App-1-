import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await fetch(`${API_BASE_URL}/login`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    let data = await res.json();
    console.log(data);
    if (data.success === true) {
      alert("Login successful");
      localStorage.setItem("token", data.token);
      localStorage.setItem("userID", data.userID);
      navigate("/");
    } else {
      setError(data.message);
      alert(data.message);
    }
  };

  return (
    <div className="bg-[#F4F4F4] min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <h3 className="text-center text-2xl font-semibold mb-6">Login</h3>

        <div className="mb-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            name="email"
            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-400"
            required
          />
        </div>

        <div className="mb-6">
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            name="password"
            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#578DF5] text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition"
        >
          Login
        </button>

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link className="text-[#578DF5] font-medium" to="/signUp">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
