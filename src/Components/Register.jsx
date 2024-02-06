import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faApple,
  faFacebook,
  faGithub,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { auth, db } from "../firebase/Config";

const Register = ({ setRegister }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (provider) => {
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

      if (name === "") {
        setError("Username is required");
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

      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;

      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split("T")[0];

      await db.collection("Auth").add({
        name: name,
        email: email,
        userId: user.uid,
        status: "Inactive",
        addedDate: formattedDate,
      });

      setRegister(false);
    } catch (error) {
      console.error(error.message);
      setError("Error during registration");
    }
  };

  const handleRegisterNavigation = () => {
    setRegister(false);
  };

  return (
    <div className="login-main">
      <div className="login-container">
        <div className="auth-container">
          <h3 className="heading">Welcome...!!!</h3>
          <p className="sub-text">Please Register your account</p>
          <form
            className="form-container"
            noValidate
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister("email");
            }}
          >
            <div className="form-group">
              <label htmlFor="email">User name</label>
              <input
                type="text"
                id="name"
                placeholder="Tiger"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
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
            {error ? <div className="error">{error}</div> : <br />}
            <div className="submit">
              <button type="submit">Register</button>
            </div>
            <div className="new-on-platform">
              <p>
                Already have an Account?{" "}
                <span onClick={handleRegisterNavigation}> Please Login</span>{" "}
              </p>
            </div>
            <div className="divider">
              <span></span>
              OR
              <span></span>
            </div>
            <div className="social-icons">
              <span
                href
                className="apple"
                onClick={() => handleRegister("apple")}
              >
                <FontAwesomeIcon icon={faApple} />
              </span>
              <span className="github" onClick={() => handleRegister("github")}>
                <FontAwesomeIcon icon={faGithub} />
              </span>
              <span
                className="facebook"
                onClick={() => handleRegister("facebook")}
              >
                <FontAwesomeIcon icon={faFacebook} />
              </span>
              <span className="google" onClick={() => handleRegister("google")}>
                <FontAwesomeIcon icon={faGoogle} />
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
