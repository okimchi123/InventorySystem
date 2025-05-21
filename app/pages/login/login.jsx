import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { setAuthToken } from "../../utils/axiosConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://inventorysystem-lfak.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      const data = response.data;
      localStorage.setItem("token", data.token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      if (data.role === "Admin") navigate("/admin/Dashboard");
      else if (data.role === "Moderator") navigate("/moderator/Dashboard");
      else navigate("/user/Dashboard");
    } catch (err) {
      const message = err.response?.data?.message || "Login failed.";
      setError(message);
    }
  };

  return (
    <div id="main-container" className="flex flex-wrap min-h-screen">
      <div className="hidden py-2 md:flex flex-col justify-center bg-blue-500 w-1/2">
        <div className="flex flex-col items-center justify-center gap-4 h-full">
          <h4 className="text-white text-6xl font-medium font-russo text-center">
            Express Inventory
          </h4>
          <p className="text-white text-base phone:px-3 font-medium">
            A Web Application for Hardware Tools Management
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center w-full min-h-screen md:w-1/2 mx-auto">
        <form
          onSubmit={handleLogin}
          className="flex flex-col justify-center md:w-96 phone:w-3/4 mx-auto my-auto flex-1"
        >
          <div className="login-top flex flex-col items-center gap-3 mb-5">
            <p className="text-4xl font-bold text-blue-800 mb-5">Login</p>
            {error && <p style={{ color: "red" }}>Account not found</p>}
          </div>
          <div className="justify-start items-center relative mb-3">
            <label className="block text-lg font-medium">Email</label>
            <FontAwesomeIcon
              icon="user"
              className="left-[-12px] absolute py-4 px-3 w-10 text-gray-500"
            />
            <i className="fa-solid fa-user absolute py-4 px-3 w-10 text-gray-500"></i>
            <input
              name="email"
              className="pl-8 rounded-md shadow-sm text-black text-base border border-gray-500 focus:outline-none focus:border-blue-900 block w-full py-3 px-2.5"
              placeholder="Email"
              required
              title="Please enter a valid email address with only '@' as the special character."
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="justify-start items-center relative mb-5">
            <label className="block text-lg font-medium">Password</label>
            <FontAwesomeIcon
              icon="lock"
              className="left-[-12px] absolute py-4 px-3 w-10 text-gray-500"
            />
            <input
              type="password"
              name="password"
              className="pl-8 rounded-md shadow-sm text-black text-base border border-gray-500 focus:outline-none focus:border-blue-900 block w-full py-3 px-2.5"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="text-white mb-3 bg-blue-700 hover:bg-blue-600 focus:ring-1 focus:outline-none focus:ring-blue-900 font-medium rounded-full text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
