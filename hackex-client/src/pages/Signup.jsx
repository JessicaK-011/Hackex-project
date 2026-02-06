/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../themeContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleSignup = async () => {
    setError("");
    try {
      const response = await fetch(
        "https://hackex-backend.onrender.com/api/v1/users/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      if (response.ok) {
        navigate("/login");
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-6 ${
        theme === "light"
          ? "bg-gray-100 text-gray-900"
          : "bg-gray-900 text-gray-100"
      }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-2xl shadow-xl ${
          theme === "light"
            ? "bg-white border border-gray-200"
            : "bg-gray-800 border border-gray-700"
        }`}
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create your account
        </h1>

        {error && (
          <p className="text-red-500 mb-4 text-center font-medium">{error}</p>
        )}

        {/* Username */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Username"
          className={`w-full p-3 mb-4 rounded-lg border focus:outline-none ${
            theme === "light"
              ? "bg-gray-100 border-gray-300 text-gray-900 focus:border-[#5044e5]"
              : "bg-gray-700 border-gray-600 text-white focus:border-[#5044e5]"
          }`}
        />

        {/* Email */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className={`w-full p-3 mb-4 rounded-lg border focus:outline-none ${
            theme === "light"
              ? "bg-gray-100 border-gray-300 text-gray-900 focus:border-[#5044e5]"
              : "bg-gray-700 border-gray-600 text-white focus:border-[#5044e5]"
          }`}
        />

        {/* Password */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={`w-full p-3 mb-6 rounded-lg border focus:outline-none ${
            theme === "light"
              ? "bg-gray-100 border-gray-300 text-gray-900 focus:border-[#5044e5]"
              : "bg-gray-700 border-gray-600 text-white focus:border-[#5044e5]"
          }`}
        />

        {/* Sign up button */}
        <button onClick={handleSignup} className="btn-primary w-full py-3">
          Sign Up
        </button>

        {/* Footer */}
        <div className="mt-6 text-center text-sm">
          <p className="opacity-80">Already have an account?</p>
          <Link
            to="/login"
            className="font-semibold text-[#5044e5] hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
