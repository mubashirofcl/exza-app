import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../../../api/auth";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      setErrorMessage("");
      setLoadingGoogle(true);
      const user = await loginWithGoogle();
      console.log("Google sign in:", user);
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || "Google sign in failed");
    } finally {
      setLoadingGoogle(false);
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setErrorMessage("Please try to login with Google");
  };

  return (
    <div className="max-w-sm p-8 rounded-2xl text-center glass-card">
      <div className="font-extrabold text-4xl text-exza-purple mb-1">EXZA</div>
      <h2 className="text-2xl font-semibold mb-6 text-exza-dark">Sign In</h2>

      <form onSubmit={handleSignIn} className="space-y-4">
        <input placeholder="Email (mock)" className="w-full p-3 rounded-xl bg-exza-light" />
        <input placeholder="Password (mock)" type="password" className="w-full p-3 rounded-xl bg-exza-light" />
        <button className="w-full bg-exza-purple text-white p-3 rounded-full">Sign In</button>
      </form>


      {errorMessage && <div className=" rounded-2xl bg-white p-1 m-3 text-red-600">{errorMessage}</div>}

      <div className="mt-4 border-t-2 relative py-4">
        <div className="absolute rounded-2xl left-1/2 -translate-x-1/2 -top-3 bg-white px-3">OR</div>
      </div>

      <button onClick={handleGoogleLogin} disabled={loadingGoogle} className="w-full bg-white text-exza-dark px-6 py-3 rounded-full border mt-4">
        {loadingGoogle ? "Signing in..." : "Sign in with Google"}
      </button>
    </div>
  );
};

export default LoginForm;
