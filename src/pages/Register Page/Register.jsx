import React, { useRef, useState } from "react";
import "./register.css";
import { FaCheck } from "react-icons/fa6";
import background from "../../assets/discord-background.png";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

function Register() {
  const [isChecked, setIsChecked] = useState(false);
  const emailReg = useRef("");
  const passReg = useRef("");
  const usernameReg = useRef("");
  const nameReg = useRef("");
  const navigate = useNavigate();

  async function registerUser(e) {
    e.preventDefault();
    if (
      !emailReg.current.value ||
      !passReg.current.value ||
      !usernameReg.current.value ||
      !nameReg
    ) {
      alert("Please fill all the fields requred.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        emailReg.current.value,
        passReg.current.value
      );

      const user = auth.currentUser;

      user.displayName = nameReg.current.value;
      await updateProfile(auth.currentUser, {
        displayName: nameReg.current.value,
      });

      await signInWithEmailAndPassword(
        auth,
        emailReg.current.value,
        passReg.current.value
      );

      const myCollection = collection(db, "users");
      const myDocumentData = {
        bio: "No bio yet....",
        username: usernameReg.current.value,
        name: nameReg.current.value,
        created: user.metadata.creationTime.substr(4, 12),
      };

      const myDocRef = doc(myCollection, user.uid);

      await setDoc(myDocRef, myDocumentData);

      navigate("/main");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <form
      className="register__container"
      style={{ backgroundImage: `url(${background})` }}
      onSubmit={(e) => registerUser(e)}
    >
      <div className="register__wrapper">
        <h2 className="register__title">Create an account</h2>
        <div className="register__emailWrapper">
          <h6 className="register__emailTitle">
            EMAIL <span style={{ color: "red" }}>*</span>
          </h6>
          <input
            type="email"
            className="register__emailInput"
            ref={emailReg}
            required
          />
        </div>
        <div className="register__nameWrapper">
          <h6 className="register__nameTitle">DISPLAY NAME</h6>
          <input
            type="text"
            className="register__nameInput"
            ref={nameReg}
            required
          />
        </div>
        <div className="register__usernameWrapper">
          <h6 className="register__usernameTitle">
            USERNAME <span style={{ color: "red" }}>*</span>
          </h6>
          <input
            type="text"
            className="register__usernameInput"
            ref={usernameReg}
            required
          />
        </div>
        <div className="register__passwordWrapper">
          <h6 className="register__passwordTitle">
            PASSWORD <span style={{ color: "red" }}>*</span>
          </h6>
          <input
            type="password"
            className="register__passwordInput"
            ref={passReg}
            required
          />
        </div>
        <div
          className="register__toggleBox"
          onClick={() => setIsChecked(!isChecked)}
        >
          {isChecked ? (
            <div className="register__boxChecked">
              <FaCheck />
            </div>
          ) : (
            <div className="register__box"></div>
          )}
          <p className="register__togglePara">
            (Optional) it's okay to send me emails with Discord updates, tips,
            and special offers. You can opt out at any time.
          </p>
        </div>
        <button className="register__button" onClick={(e) => registerUser(e)}>
          Continue
        </button>
        <p className="register__termsOfUse">
          By registering, you agree to Discord's{" "}
          <a href="/" className="termsOfService">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/" className="privacyPolicy">
            Privace Policy
          </a>
          .
        </p>
        <a href="/" className="existingAccount">
          Already have an account?
        </a>
      </div>
    </form>
  );
}

export default Register;
