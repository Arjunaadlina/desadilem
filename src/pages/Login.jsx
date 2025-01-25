import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true); // Set loading state to true
    try {
      const res = await axios.post("https://api-admins-one.vercel.app/api/login", {
        email: email,
        password: password,
      });

      if (res.data.message === "Login successfully") {
        localStorage.setItem("token", res.data.token);
        navigate("/admin");
      } else {
        console.log("Login failed:", res.data.message);
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Set loading state back to false
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center shadow-xl p-4 gap-4 h-96 w-72 justify-center">
        <h2 className="mb-8 font-montserratbold">Login Admin</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          className="px-2 py-1 border border-gray-300 rounded-md font-montserratreg text-md"
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading} // Disable input when loading
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded-md font-montserratreg text-md"
          disabled={isLoading} // Disable input when loading
        />
        <button
          onClick={handleLogin}
          className={`w-52 rounded-md py-1 text-white font-montserratsem ${
            isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-secondary"
          }`}
          disabled={isLoading} // Disable button when loading
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
