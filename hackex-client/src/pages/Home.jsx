import { useEffect } from "react";
import { Link } from "react-router-dom";
import ProblemList from "./ProblemList";
import LeaderBoard from "./LeaderBoard";
import { useTheme } from "../themeContext";
import { useUser } from "../userContext";
import heroImg from "../assets/homePageMain.png";

const Home = () => {
  const { theme } = useTheme();
  const { isLoggedIn } = useUser();

  useEffect(() => {}, [isLoggedIn]);

  return (
    <div
      className={`min-h-screen ${
        theme === "light"
          ? "bg-gray-50 text-gray-900"
          : "bg-gradient-to-b from-[#0f172a] to-[#020617] text-gray-100"
      }`}
    >
      {/* ================= HERO SECTION ================= */}
      <section
        className={`${
          theme === "light"
            ? "bg-[#5044e5]"
            : "bg-gradient-to-r from-[#2a2466] to-[#1e1b4b]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 py-20 flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Left Content */}
          <div className="lg:w-3/5 space-y-6 text-white">
            <h1 className="text-5xl font-extrabold leading-tight">
              Level up your coding skills <br />
              with <span className="opacity-95">Hackex</span>
            </h1>

            <p className="text-lg opacity-90 max-w-xl">
              Practice real-world coding problems, compete in contests, and
              sharpen your problem-solving skills on a modern coding platform
              built for growth.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/problems"
                className="px-8 py-3 rounded-xl bg-white text-[#5044e5] font-semibold hover:opacity-90 transition"
              >
                Start Solving
              </Link>

              <Link
                to="/playground"
                className="px-8 py-3 rounded-xl border border-white text-white font-semibold hover:bg-white hover:text-[#5044e5] transition"
              >
                Try Playground
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-96 lg:w-[500px] drop-shadow-xl">
            <img
              src={heroImg}
              alt="Coding illustration"
              className="w-[420px] lg:w-[560px]"
            />
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section
        className={`max-w-7xl mx-auto px-8 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-10 ${
          theme === "light" ? "" : "pt-12"
        }`}
      >
        {[
          {
            title: "Coding Playground",
            desc: "Write, run, and test code instantly with custom inputs and execution metrics.",
            link: "/playground",
          },
          {
            title: "Coding Arena",
            desc: "Solve curated coding problems and even upload your own challenges.",
            link: "/problems",
          },
          {
            title: "Coding Battleground",
            desc: "Compete in live contests, climb leaderboards, and prove your skills.",
            link: "/contests",
          },
        ].map((item, index) => (
          <Link
            to={item.link}
            key={index}
            className={`rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ${
              theme === "light"
                ? "bg-white"
                : "bg-[#020617] border border-gray-700"
            }`}
          >
            <h3 className="text-2xl font-bold mb-3 text-[#5044e5]">
              {item.title}
            </h3>
            <p
              className={theme === "light" ? "text-gray-600" : "text-gray-400"}
            >
              {item.desc}
            </p>
          </Link>
        ))}
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="max-w-7xl mx-auto px-8 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <ProblemList />
        </div>
        <div>
          <LeaderBoard />
        </div>
      </section>
    </div>
  );
};

export default Home;
