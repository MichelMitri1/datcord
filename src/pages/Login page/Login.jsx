import React, { useRef, useState, useEffect } from "react";
import "./login.css";
import discordQRCode from "../../assets/discord-qr.JPG";
import background from "../../assets/discord-background.png";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.js";
import { useNavigate } from "react-router-dom";

function Login({ user }) {
  const loginEmail = useRef("");
  const loginPass = useRef("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  async function loginUser(e) {
    e.preventDefault();
    if (!loginEmail.current.value || !loginPass.current.value) {
      alert("Please enter the below fields to log in your account");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(
        auth,
        loginEmail.current.value,
        loginPass.current.value
      );

      alert("User is valid");
      navigate("/main");
      setLoading(false);
    } catch (error) {
      alert("invalid email or password");
      setLoading(false);
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/main");
      }
    });
  }, []);

  return (
    <form
      className="login__container"
      style={{ backgroundImage: `url(${background})` }}
      onSubmit={(e) => loginUser(e)}
    >
      <div className="login__wrapper">
        <div className="login__subwrapper1">
          <h2 className="login__header">Welcome back!</h2>
          <p className="login__subheader">We're so excited to see you again!</p>
          <div className="login__emailWrapper">
            <h6 className="login__emailTitle">
              EMAIL OR PHONE NUMBER <span style={{ color: "red" }}>*</span>
            </h6>
            <input
              type="email"
              className="login__emailInput"
              ref={loginEmail}
            />
          </div>
          <div className="login__passwordWrapper">
            <h6 className="login__passwordTitle">
              PASSWORD <span style={{ color: "red" }}>*</span>
            </h6>
            <input
              type="password"
              className="login__passwordInput"
              ref={loginPass}
            />
          </div>
          <a href="/" className="login__forgotPassword">
            Forgot your password?
          </a>
          <br />
          {loading ? (
            <button className="login__buttonSpinner">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </button>
          ) : (
            <button className="login__button">Log In</button>
          )}

          <p style={{ color: "RGB(143, 148, 154)", fontSize: "14px" }}>
            Need an account?{" "}
            <a href="/register" className="login__register">
              Register
            </a>
          </p>
        </div>
        <div className="login__subwrapper2">
          <figure className="QRcode__wrapper">
            <img src={discordQRCode} alt="" className="QRcode" />
          </figure>
          <h2
            style={{
              margin: "24px 0px 0px 0px",
              color: "white",
              fontSize: "18px",
            }}
          >
            Log In with the QR Code
          </h2>
          <p style={{ textAlign: "center", color: "RGB(167, 172, 179)" }}>
            Scan this with the{" "}
            <span style={{ fontWeight: "bold" }}>Discord mobile app</span> to
            log in instantly
          </p>
        </div>
      </div>
    </form>
  );
}

export default Login;
