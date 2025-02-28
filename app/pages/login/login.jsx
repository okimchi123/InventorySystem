import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      // store token and redirect based on role
      localStorage.setItem("token", data.token);
      if (data.role === "Admin") navigate("/admin/Dashboard");
      else if (data.role === "Moderator") navigate("/moderator-dashboard");
      else navigate("/User-dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div id="main-container" class="flex flex-wrap min-h-screen">
      <div class="hidden py-2 md:flex flex-col justify-center bg-blue-500 w-1/2">
        <div class="flex flex-col items-center justify-center gap-4 h-full">
          <img src="" alt="" class="w-3/4" />
          <h4 class="text-white text-6xl font-medium font-russo text-center">
            Express Inventory
          </h4>
          <p class="text-white text-base phone:px-3 font-medium">
            A Web Application for Hardware Tools Management
          </p>
        </div>
      </div>

      <div class="flex flex-col justify-center w-full min-h-screen md:w-1/2 mx-auto">
        <div class="md:hidden phone:block h-8 py-4 px-3 bg-blue-500">
          <a href="home" class="h-8">
            <img class="w-16" src="" alt="logo" />
          </a>
        </div>
        <form
          onSubmit={handleLogin}
          action="/admin/template/admin-dashboard.html"
          class="flex flex-col justify-center md:w-96 phone:w-3/4 mx-auto my-auto flex-1"
        >
          <div class="login-top flex flex-col items-center gap-3 mb-5">
            <p class="text-4xl font-bold text-blue-800 mb-5">Login</p>
            {error && <p style={{ color: "red" }}>Account not found</p>}
          </div>
          <div class="justify-start items-center relative mb-3">
            <label for="email" class="block text-lg font-medium">
              Email
            </label>
            <i class="fa-solid fa-user absolute py-4 px-3 w-10 text-gray-500"></i>
            <input
              name="email"
              class="pl-8 rounded-md shadow-sm text-black text-base border border-gray-500 focus:outline-none focus:border-blue-900 block w-full py-3 px-2.5"
              placeholder="Email"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              required
              title="Please enter a valid email address with only '@' as the special character."
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="justify-start items-center relative mb-5">
            <label for="password" class="block text-lg font-medium">
              Password
            </label>
            <i class="fa-solid fa-lock absolute py-4 px-3 w-10 text-gray-500"></i>
            <input
              type="password"
              id="password"
              name="password"
              class="pl-8 rounded-md shadow-sm text-black text-base border border-gray-500 focus:outline-none focus:border-blue-900 block w-full py-3 px-2.5"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            class="text-white mb-3 bg-blue-700 hover:bg-blue-600 focus:ring-1 focus:outline-none focus:ring-blue-900 font-medium rounded-full text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
          >
            Login
          </button>
        </form>

        <footer class="bg-blue-500 w-full text-white py-4 mt-auto md:hidden phone:block">
          <div class="mx-auto w-full text-center text-xs">
            <p>&copy;2025 Hyperfuture. All right reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
