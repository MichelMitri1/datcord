import {
  query,
  collection,
  onSnapshot,
  doc,
  getDoc,
  listCollections,
} from "firebase/firestore";
import pfp from "../../assets/server pictures/i-be-poppin-bottles-meme.gif"
import { PiMicrophoneSlashFill } from "react-icons/pi";
import React, { useState, useEffect } from "react";
import { PiMicrophoneFill } from "react-icons/pi";
import { PiHeadphonesFill } from "react-icons/pi";
import { TbHeadphonesOff } from "react-icons/tb";
import { RiSettings5Fill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FiAperture } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { CiShop } from "react-icons/ci";
import { db } from "../../firebase.js";
import "../chat logs/chatLogs.css";

function ChatLogs({ user }) {
  const navigate = useNavigate();
  const [userFriends, setUserFriends] = useState([]);
  const [currentUser, setCurrentuser] = useState({});
  

  async function getUser() {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    setCurrentuser(docSnap.data());
  }

  function goToChat(id) {
    navigate(`/main/${user.uid + id}`);
  }

  function getAllUsers() {
    const q = query(collection(db, "users"));
    onSnapshot(q, (snapshot) =>
      setUserFriends(
        snapshot.docs.map((elem) => ({ ...elem.data(), id: elem.id }))
      )
    );
  }

  useEffect(() => {
    getUser();
    getAllUsers();
  }, []);

  return (
    <div className="chatlogs__container">
      <div className="chatlogs__searchWrapper">
        <input
          type="text"
          className="chatlogs__search"
          placeholder="Find or start a conversation"
        />
      </div>
      <div className="chatlogs__wrapper">
        <div className="chatlogs__optionsWrapper">
          <div className="chatlogs__option" onClick={() => navigate("/main")}>
            <FaUserFriends
              style={{ color: "RGB(148, 155, 164)", fontSize: "26px" }}
            />
            <p className="chatlogs__optionPara">Friends</p>
          </div>
          <div className="chatlogs__option">
            <FiAperture
              style={{ color: "RGB(148, 155, 164)", fontSize: "26px" }}
            />
            <p className="chatlogs__optionPara">Nitro</p>
          </div>
          <div className="chatlogs__option">
            <CiShop style={{ color: "RGB(148, 155, 164)", fontSize: "32px" }} />
            <p className="chatlogs__optionPara">Shop</p>
          </div>
        </div>
        <div className="chatlogs__createDm">
          <p
            style={{
              fontSize: "10px",
              color: "RGB(148, 155, 164)",
              fontWeight: "bold",
            }}
          >
            DIRECT MESSAGES
          </p>
          <FaPlus
            style={{
              fontSize: "11px",
              color: "RGB(148, 155, 164)",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          />
        </div>
        <div className="chatlogs__friendsWrapper">
          {userFriends
            ? userFriends
                .filter((friend) => friend.id !== user.uid)
                .map((friend, index) => (
                  <div
                    className="friend"
                    key={index}
                    onClick={(id) => goToChat(friend.id)}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <figure className="pfp__wrapper">
                        <img src={pfp} alt="" className="pfp" />
                      </figure>
                      <p className="friend__name">{friend.name}</p>
                    </div>
                  </div>
                ))
            : null}
        </div>
      </div>
      <div className="user__container">
        <div className="user__wrapper">
          <figure className="user__pfpWrapper">
            <img
              src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
              alt=""
              className="user__pfp"
            />
          </figure>
          <div className="user__info">
            {currentUser ? (
              <div>
                <p className="user__username">{currentUser.name}</p>
                <p className="user__para">{currentUser.bio}</p>
              </div>
            ) : (
              <>
                <p className="user__username">Loading...</p>
                <p className="user__para">Loading...</p>
              </>
            )}
          </div>
        </div>
        <div className="user__buttons">
          <PiMicrophoneFill
            style={{ color: "rgb(148, 155, 164)" }}
            className="button"
          />
          <PiHeadphonesFill
            style={{ color: "rgb(148, 155, 164)" }}
            className="button"
          />
          <RiSettings5Fill
            style={{ color: "rgb(148, 155, 164)" }}
            className="button"
            onClick={() => navigate("/settings")}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatLogs;
