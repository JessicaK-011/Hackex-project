/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../themeContext";
import Spinner from "../Components/Spinner";

const AddProblem = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [constraints, setConstraints] = useState("");
  const [sampleInput, setSampleInput] = useState("");
  const [sampleOutput, setSampleOutput] = useState("");
  const [tag, setTag] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://hackex.onrender.com/api/v1/problems/addProblem",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            description,
            constraints,
            sampleInput,
            sampleOutput,
            tag,
          }),
        }
      );

      if (response.ok) {
        navigate("/");
      } else {
        setError("Failed to add problem. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div
        className={`flex min-h-screen items-center justify-center ${
          theme === "light"
            ? "bg-gray-100 text-gray-900"
            : "bg-gray-900 text-gray-100"
        }`}
      >
        <Spinner size={"4/5"} color={theme === "light" ? "gray" : "white"} />
      </div>
    );
  }

  const inputBase =
    "w-full p-3 rounded-lg border focus:outline-none focus:border-[var(--brand-primary)]";

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-8 ${
        theme === "light"
          ? "bg-gray-100 text-gray-900"
          : "bg-gray-900 text-gray-100"
      }`}
    >
      <div
        className={`w-full max-w-4xl p-8 rounded-lg shadow-lg ${
          theme === "light" ? "bg-gray-50" : "bg-gray-800"
        }`}
      >
        <h1 className="text-3xl font-bold mb-6 text-center capitalize">
          Add a New Problem
        </h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`${inputBase} mb-4 ${
            theme === "light"
              ? "bg-gray-200 text-gray-900 border-gray-300"
              : "bg-gray-700 text-white border-gray-600"
          }`}
          placeholder="Title"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`${inputBase} mb-4 ${
            theme === "light"
              ? "bg-gray-200 text-gray-900 border-gray-300"
              : "bg-gray-700 text-white border-gray-600"
          }`}
          placeholder="Description"
        />

        <textarea
          value={constraints}
          onChange={(e) => setConstraints(e.target.value)}
          className={`${inputBase} mb-4 ${
            theme === "light"
              ? "bg-gray-200 text-gray-900 border-gray-300"
              : "bg-gray-700 text-white border-gray-600"
          }`}
          placeholder="Constraints"
        />

        <textarea
          value={sampleInput}
          onChange={(e) => setSampleInput(e.target.value)}
          className={`${inputBase} mb-4 ${
            theme === "light"
              ? "bg-gray-200 text-gray-900 border-gray-300"
              : "bg-gray-700 text-white border-gray-600"
          }`}
          placeholder="Sample Input"
        />

        <textarea
          value={sampleOutput}
          onChange={(e) => setSampleOutput(e.target.value)}
          className={`${inputBase} mb-4 ${
            theme === "light"
              ? "bg-gray-200 text-gray-900 border-gray-300"
              : "bg-gray-700 text-white border-gray-600"
          }`}
          placeholder="Sample Output"
        />

        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className={`${inputBase} mb-6 ${
            theme === "light"
              ? "bg-gray-200 text-gray-900 border-gray-300"
              : "bg-gray-700 text-white border-gray-600"
          }`}
        >
          <option value="">Select Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <button
          onClick={handleSubmit}
          className="w-full bg-[var(--brand-primary)] hover:opacity-90 text-white py-3 px-6 rounded-lg font-semibold transition transform hover:scale-[1.02]"
        >
          Add Problem
        </button>
      </div>
    </div>
  );
};

export default AddProblem;
