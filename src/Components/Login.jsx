import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faApple,
  faFacebook,
  faGithub,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { auth, db } from "../firebase/Config";

const Login = ({ setRegister, setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (provider) => {
    try {
      if (provider === "apple") {
        setError("Apple auth is not available right now");
        return;
      } else if (provider === "github") {
        setError("GitHub auth is not available right now");
        return;
      } else if (provider === "facebook") {
        setError("Facebook auth is not available right now");
        return;
      } else if (provider === "google") {
        setError("Google auth is not available right now");
        return;
      }

      if (email === "") {
        setError("Email is required");
        return;
      }
      if (password === "") {
        setError("Password is required");
        return;
      }

      setEmail(email.toLowerCase());

      await auth.signInWithEmailAndPassword(
        email,
        password
      );
      const userSnapshot = await db.collection('Auth').where('email', '==', email).get();
      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        const userData = userDoc.data();
        const username = userData.username;

        if (document.getElementById("remember").checked) {
          localStorage.setItem("user-name", username);
        }

        setEmail("");
        setPassword("");
        setError("");
        setAuth({
          userName: username,
          authenticated: true,
        });
      } else {
        setError("User not found");
      }
    } catch (error) {
      console.error(error.message);
      setError("Invalid Email or Password");
    }
  };

  const handleRegisterNavigation = () => {
    setRegister(true);
  };

  return (
    <div className="login-main">
      <div className="login-container">
        <div className="auth-container">
          <h3 className="heading">Welcome...!!!</h3>
          <p className="sub-text">
            Please sign in to your account and Start
          </p>
          <form
            className="form-container"
            noValidate
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit("email");
            }}
          >
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="john.doe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="············"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="remember-me">
              <div style={{ display: "flex" }}>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember Me</label>
              </div>
              <div>
                <a href="/">Forgot Password?</a>
              </div>
            </div>
            {error ? <div className="error">{error}</div> : <br />}
            <div className="submit">
              <button type="submit">Login</button>
            </div>
            <div className="new-on-platform">
              <p>
                New for platform....?{" "}
                <span onClick={handleRegisterNavigation}> Create an account</span>{" "}
              </p>
            </div>
            <div className="divider">
              <span></span>
              OR
              <span></span>
            </div>

            <div className="social-icons">
              <span className="apple" onClick={() => handleSubmit("apple")}>
                <FontAwesomeIcon icon={faApple} />
              </span>
              <span className="github" onClick={() => handleSubmit("github")}>
                <FontAwesomeIcon icon={faGithub} />
              </span>
              <span className="facebook" onClick={() => handleSubmit("facebook")}>
                <FontAwesomeIcon icon={faFacebook} />
              </span>
              <span className="google" onClick={() => handleSubmit("google")}>
                <FontAwesomeIcon icon={faGoogle} />
              </span>
            </div>
            <p style={{ textAlign: "center" }}>Presented by Patmesh⚡</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
