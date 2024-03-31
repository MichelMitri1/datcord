import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { RiDoorOpenFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { MdLock } from "react-icons/md";
import { signOut } from "firebase/auth";
import "../Settings page/settings.css";

function Settings({ user }) {
  const [currentUser, setCurrentuser] = useState({});
  const navigate = useNavigate();

  async function getUser() {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    setCurrentuser(docSnap.data());
  }

  function signOutUser() {
    signOut(auth);
    navigate("/");
    console.log(user);
  }

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="settings__container">
      <div className="settings__wrapper">
        <div className="settings__settingsContainer">
          <div className="settings__settingsWrapper">
            <div className="user__settings">
              <p className="settings__userHeader">USER SETTINGS</p>
              <button className="settings__button">My Account</button>
              <button className="settings__button">Profiles</button>
              <button className="settings__button">Privacy & Safety</button>
              <button className="settings__button">Family Center</button>
              <button className="settings__button">Authorized Apps</button>
              <button className="settings__button">Devices</button>
              <button className="settings__button">Connection</button>
              <button className="settings__button">Clips</button>
              <button className="settings__button">Friend Requests</button>
            </div>
            <div className="billing__settings">
              <p className="settings__userHeader">BILLING SETTINGS</p>
              <button className="settings__button">Nitro</button>
              <button className="settings__button">Server Boost</button>
              <button className="settings__button">Subscriptions</button>
              <button className="settings__button">Gift Inventory</button>
              <button className="settings__button">Billing</button>
            </div>
            <div className="app__settings">
              <p className="settings__userHeader">APP SETTINGS</p>
              <button className="settings__button">Appearance</button>
              <button className="settings__button">Accessibility</button>
              <button className="settings__button">Voice & Video</button>
              <button className="settings__button">Text & Images</button>
              <button className="settings__button">Notifications</button>
              <button className="settings__button">Keybinds</button>
              <button className="settings__button">Language</button>
              <button className="settings__button">Streamer Mode</button>
              <button className="settings__button">Advanced</button>
            </div>
            <div className="activity__settings">
              <p className="settings__userHeader">ACTIVITY SETTINGS</p>
              <button className="settings__button">Activity Privacy</button>
            </div>
            <div className="updates__settings">
              <button className="settings__button">What's New</button>
              <button className="settings__button">Merch</button>
              <button className="settings__button">HypeSquad</button>
            </div>
            <div className="logout__settings" onClick={() => signOutUser()}>
              <div className="logout">
                <button className="settings__logoutButton">Log Out</button>
                <RiDoorOpenFill style={{ color: "rgb(166, 174, 185)" }} />
              </div>
            </div>
            <div className="socials">
              <FaTwitter />
              <FaInstagram />
              <FaFacebook />
              <FaYoutube />
              <FaTiktok />
            </div>
            <p style={{ fontSize: "10px" }}>Stable 256231 (96a39c5)</p>
            <p style={{ fontSize: "10px" }}>Windows 10 64-Bit</p>
          </div>
        </div>
        <div className="settings__accountContainer">
          <div className="settings__accountWrapper">
            <h3 className="settings__accountHeader">My Account</h3>
            <button onClick={() => navigate("/main")}>back</button>
            <div className="banner"></div>
            <div className="settings__accountInfoWrapper">
              <div className="settings__accountInfo">
                <div className="settings__profile">
                  <figure className="settings__pfpWrapper">
                    <img
                      src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                      alt=""
                      className="settings__pfp"
                    />
                  </figure>
                  <div className="settings__names">
                    <h3 className="settings__accountName">
                      {user.displayName}
                    </h3>
                  </div>
                </div>
                <button className="settings__editUser">
                  Edit User Profile
                </button>
              </div>
              <div className="settings__accountDescWrapper">
                <div className="displayName__container">
                  <p className="displayName">DISPLAY NAME</p>
                  <div className="displayName__wrapper">
                    <p className="settings__name">{user.displayName}</p>
                    <button className="edit">Edit</button>
                  </div>
                </div>
                <div className="displayUsername__container">
                  <p className="displayUsername">USERNAME</p>
                  <div className="displayUsername__wrapper">
                    <p className="settings__username">{currentUser.username}</p>
                    <button className="edit">Edit</button>
                  </div>
                </div>
                <div className="displayEmail__container">
                  <p className="displayEmail">EMAIL</p>
                  <div className="displayEmail__wrapper">
                    <p className="settings__email">{user.email}</p>
                    <button className="edit">Edit</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="settings__authenticationWrapper">
              <div className="authentication">
                <h3 className="authentication__header">
                  Password and Authentication
                </h3>
                <p className="authentication__enabled">
                  <MdLock /> MULTI-FACTOR AUTHENTICATION ENABLED
                </p>
                <button className="change__password">Change Password</button>
              </div>
              <div className="auth__app">
                <p className="settings__authenticator">AUTHENTICATOR APP</p>
                <p style={{ fontSize: "13px", color: "RGB(148, 155, 164)" }}>
                  Configuring an authenticator app is a good way to add an extra
                  layer of security to your Discord account to make sure that
                  only you have the ability to log in.
                </p>
                <div className="authenticator__buttons">
                  <button className="authenticator__button">
                    View Backup Codes
                  </button>
                  <button className="authenticator__buttonRemove">
                    Remove Authenticator App
                  </button>
                </div>
              </div>
              <div className="security">
                <p className="security__keys">SECURITY KEYS</p>
                <p style={{ fontSize: "13px", color: "RGB(148, 155, 164)" }}>
                  Add an additional layer of protection to your account with a
                  Security Key.
                </p>
                <button className="register__key">
                  Register a Security Key
                </button>
              </div>
              <div className="remove__account">
                <p className="account__removal">ACCOUNT REMOVAL</p>
                <p style={{ fontSize: "13px", color: "RGB(148, 155, 164)" }}>
                  Disabling your account means you can recover it at any time
                  after taking this action.
                </p>
                <div className="accountRemoval__buttons">
                  <button className="disable__button">Disable Account</button>
                  <button className="delete__button">Delete Account</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
