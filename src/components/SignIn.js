import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../styles/SignIn.css";

const SignIn = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));

      // Initialize or fetch user-specific liked posts
      const userLikesKey = `likes_${user.email}`;
      const userLikes = JSON.parse(localStorage.getItem(userLikesKey)) || []; // Ensure existence

      // Optional: If needed to persist temporarily
      localStorage.setItem("currentLikes", JSON.stringify(userLikes));

      navigate("/posts");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <div>
          <label>Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="primary">
          Login
        </button>
        <p>
          Don't have an account?{" "}
          <span className="link" onClick={() => navigate("/sign-up")}>Sign Up</span>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
