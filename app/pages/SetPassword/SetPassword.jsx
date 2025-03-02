import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SetPassword = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isValidToken, setIsValidToken] = useState(null);
  const [searchParams] = useSearchParams();
  const [icon, setIcon] = useState(null)
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyToken = async () => {
      const response = await fetch(
        "http://localhost:5000/api/auth/verify-token",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setIsValidToken(true);
        setIcon(true);
      } else {
        setIsValidToken(false);
        setMessage(data.message || "Password setup is not available anymore.");
        setIcon(false)
      }
    };

    if (token) {
      verifyToken();
    } else {
      setIsValidToken(false);
      setMessage("Invalid request.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:5000/api/auth/set-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      }
    );

    const data = await response.json();
    setMessage(data.message);
    if (response.ok) {
      setIsValidToken(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[30%] items-center p-5 mt-[5%] rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.3)]">
        <h1 class="text-4xl mt-2 font-medium text-blue-500 font-russo">
          E-Inventory
        </h1>
        <h2 className="text-[18px] font-semibold">{isValidToken ? "Set Your Password" : ""}</h2>
        {isValidToken ? (
          <form onSubmit={handleSubmit}>
            <input
              className="border mr-[8px] border-gray-700 py-[6px] px-[8px] rounded-lg text-black"
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="px-4 py-2 transition-all cursor-pointer shadow-sm shadow-gray-300 bg-blue-500 hover:text-white hover:bg-blue-900 font-medium text-white  rounded-lg" type="submit">Set Password</button>
          </form>
        ) : (
            <div className="flex flex-col items-center">
                
                {icon ? 
                (
                    <>
                    <FontAwesomeIcon icon="circle-check" color="green" size="2xl"/>
                    <p className="text-[18px]">{message}</p>
                    <Link to="/login" className="px-4 py-2 mt-[6px] transition-all cursor-pointer shadow-sm shadow-gray-300 bg-blue-500 hover:text-white hover:bg-blue-900 font-medium text-white  rounded-lg">Go to Login</Link>
                    </>
                ) :(
                    <>
                    <FontAwesomeIcon icon="circle-xmark" color="red" size="2xl"/>
                    <p className="text-[18px]">{message}</p>
                    </> 
                )
                 }
            </div>
            
        )}
      </div>
    </div>
  );
};

export default SetPassword;
