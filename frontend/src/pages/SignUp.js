import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [error, setError] = useState("");

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await fetch(`${API_BASE_URL}/signUp`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        username,
      }),
    });

    let data = await res.json();
    console.log(data);
    if (data.success === true) {
      alert("Registration successfull");
      navigate("/login");
    } else {
      setError(data.message);
      alert(data.message);
    }
  };

  return (
    <>
      <div className="bg-[#F4F4F4] min-h-screen flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
        >
          <h3 className="text-center text-2xl font-semibold mb-6">Sign Up</h3>

          <div className="mb-4">
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              placeholder="Username"
              name="username"
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Name"
              name="name"
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-400"
              required
            />
          </div>

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
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
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
            Sign Up
          </button>

          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link className="text-[#578DF5] font-medium" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
