import {
  onSnapshot,
  orderBy,
  collection,
  arrayUnion,
  query,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import pfp from "../../assets/server pictures/i-be-poppin-bottles-meme.gif";
import { FaGift, FaDiscord, FaUserFriends } from "react-icons/fa";
import { PiPhoneCallFill, PiStickerFill } from "react-icons/pi";
import React, { useEffect, useRef, useState } from "react";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { IoPersonAddSharp } from "react-icons/io5";
import ChatLogs from "../chat logs/ChatLogs.jsx";
import "../accessibilities/accessibilities.css";
import { FaCirclePlus } from "react-icons/fa6";
import { AiFillPushpin } from "react-icons/ai";
import { BiSolidInbox } from "react-icons/bi";
import { useParams } from "react-router-dom";
import Servers from "../Servers/Servers.jsx";
import { IoIosSearch } from "react-icons/io";
import { GoBellFill } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { MdGifBox } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { db } from "../../firebase.js";
import "../Chats/chats.css";

function Chats({ user }) {
  const [serverFriends, setServerFriends] = useState(false);
  const [uniqueMessages, setUniqueMessages] = useState([]);
  const [viewProfile, setViewProfile] = useState(true);
  const [userFriends, setUserFriends] = useState([]);
  const messageData = useRef("");
  let { id } = useParams();
  const chat = useRef("");
  const dummy = useRef();
  let s2 = id.substring(id.length / 2, id.length);
  let s1 = user.uid;

  function openAndCloseSidebar() {
    if (!serverFriends) {
      document
        .getElementsByClassName("chatlogs__container")[0]
        .classList.remove("not-displayed");
      document
        .getElementsByClassName("servers__container")[0]
        .classList.remove("not-displayed");
    } else {
      document
        .getElementsByClassName("chatlogs__container")[0]
        .classList.add("not-displayed");
      document
        .getElementsByClassName("servers__container")[0]
        .classList.add("not-displayed");
    }
    setServerFriends(!serverFriends);
  }

  function sendMessage(e) {
    e.preventDefault();
    if (!messageData.current.value) {
      return;
    }

    const text = messageData.current.value;
    messageData.current.value = "";

    updateDoc(doc(db, id, user.uid), {
      messages: arrayUnion(text),
    });

    updateDoc(doc(db, s2 + s1, user.uid), {
      messages: arrayUnion(text),
    });

    if (dummy.current.scrollIntoView) {
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  function getAllUsers() {
    const q = query(collection(db, "users"));
    onSnapshot(q, (snapshot) =>
      setUserFriends(
        snapshot.docs.map((elem) => ({ ...elem.data(), id: elem.id }))
      )
    );
  }

  function getUniqueMessages() {
    const q = query(collection(db, id));
    onSnapshot(q, (snapshot) =>
      setUniqueMessages(
        snapshot.docs.map((elem) => ({ ...elem.data(), id: elem.id }))
      )
    );
  }

  const ref = collection(db, id);
  console.log(collection(ref, "messages", "NN1LkgiQpxt5juqDu22L"));

  useEffect(() => {
    getAllUsers();
    getUniqueMessages();
  }, []);

  return (
    <div className="chats__container">
      <Servers />
      <ChatLogs user={user} />
      <div className="chats__wrapper">
        <div className="chat__hotbarWrapper">
          <div className="hotbar">
            {userFriends
              ? userFriends
                  .filter(
                    (friend) =>
                      user.uid + friend.id === id || friend.id + user.uid === id
                  )
                  .map((friend, index) => (
                    <div className="name__wrapper" key={index}>
                      <img src={pfp} alt="" className="chat__headerPfp" />
                      <p className="chat__name">{friend.name}</p>
                    </div>
                  ))
              : null}
          </div>
          <div className="creation">
            <PiPhoneCallFill
              style={{
                color: "RGB(148, 155, 164)",
                fontSize: "26px",
                cursor: "pointer",
              }}
            />
            <BsFillCameraVideoFill
              style={{
                color: "RGB(148, 155, 164)",
                fontSize: "26px",
                cursor: "pointer",
              }}
            />
            <AiFillPushpin
              style={{
                color: "RGB(148, 155, 164)",
                fontSize: "26px",
                cursor: "pointer",
              }}
            />
            <IoPersonAddSharp
              style={{
                color: "RGB(148, 155, 164)",
                fontSize: "26px",
                cursor: "pointer",
              }}
            />
            <CgProfile
              style={{
                color: "rgb(208, 215, 224)",
                fontSize: "26px",
                cursor: "pointer",
              }}
              onClick={() => setViewProfile(!viewProfile)}
            />
            <input
              type="text"
              className="chat__search"
              placeholder="Search"
              ref={chat}
            />
            <BiSolidInbox
              style={{
                color: "RGB(148, 155, 164)",
                fontSize: "26px",
                cursor: "pointer",
              }}
            />
            <BsFillQuestionCircleFill
              style={{
                color: "RGB(148, 155, 164)",
                fontSize: "24px",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
        <div className="accessibilities__wrapper">
          <div className="chat__listContainer">
            <div className="chat__listWrapper">
              {userFriends
                .filter(
                  (friend) =>
                    user.uid + friend.id === id || friend.id + user.uid === id
                )
                .map((friend, index) => (
                  <div className="chatList" key={index}>
                    <div className="chat__details">
                      <figure className="chat__pfpWrapper">
                        <img src={pfp} alt="" className="chat__pfp" />
                      </figure>
                      <h2 className="chat__name">{friend.name}</h2>
                      <h3 className="chat__username">{friend.username}</h3>
                      <p className="chat__para">
                        This is the beginning of your direct message with{" "}
                        <span className="name">{friend.name}</span>
                      </p>
                      <div className="chat__common">
                        <p className="server">no servers in common</p>
                        <div className="chat__buttons">
                          <button className="chat__removeFriend">
                            Remove Friend
                          </button>
                          <button className="chat__block">Block</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              <div className="messages">
                {uniqueMessages
                  ? uniqueMessages.map((message) =>
                      message.id === user.uid ? (
                        <>
                          <div className="message__wrapper">
                            {message.messages.map((messageSent) => (
                              <p
                                style={{ margin: "8px 0px" }}
                                className="message__sent"
                              >
                                {user.displayName + ":   " + messageSent}
                              </p>
                            ))}
                          </div>
                          <div ref={dummy}></div>
                        </>
                      ) : (
                        <>
                          {userFriends
                            ? userFriends
                                .filter(
                                  (friend) =>
                                    user.uid + friend.id === id ||
                                    friend.id + user.uid === id
                                )
                                .map((friend) => (
                                  <div style={{ margin: "24px 0px" }}>
                                    {message.messages.map((messageReceived) => (
                                      <p
                                        style={{ margin: "8px 0px" }}
                                        className="message__received"
                                      >
                                        {friend.name + ":   " + messageReceived}
                                      </p>
                                    ))}
                                  </div>
                                ))
                            : null}
                          <div ref={dummy}></div>
                        </>
                      )
                    )
                  : null}
              </div>
            </div>
            <form
              onSubmit={(e) => sendMessage(e)}
              className="chat__sendWrapper"
            >
              <FaCirclePlus
                style={{
                  position: "absolute",
                  zIndex: "2",
                  minWidth: "50px",
                  fontSize: "22px",
                  top: "24%",
                  left: "2%",
                  color: "RGB(181, 186, 193)",
                }}
              />
              <input
                type="text"
                className="chat__sendMessage"
                placeholder="message"
                ref={messageData}
              />
              <div className="icons">
                <FaGift style={{ position: "relative" }} />
                <MdGifBox style={{ position: "relative" }} />
                <PiStickerFill style={{ position: "relative" }} />
                <IoSend
                  style={{ position: "relative" }}
                  onClick={(e) => sendMessage(e)}
                />
              </div>
            </form>
          </div>
          {viewProfile && userFriends
            ? userFriends
                .filter(
                  (friend) =>
                    friend.id === id.substring(id.length / 2, id.length)
                )
                .map((friend) => (
                  <div className="chat__wrapper">
                    <div className="chat__banner"></div>
                    <div className="chat__accountInfoWrapper">
                      <div className="settings__accountInfo">
                        <div className="settings__profile">
                          <figure className="settings__pfpWrapper">
                            <img src={pfp} alt="" className="settings__pfp" />
                          </figure>
                        </div>
                      </div>
                      <div className="chat__accountDescWrapper">
                        <div className="chat__displayName">
                          <h3 className="about__name">{friend.name}</h3>
                          <p className="about__username">{friend.username}</p>
                        </div>
                        <div className="chat__dateJoined">
                          <p className="date__title">DISCORD MEMBER SINCE</p>
                          <p className="date__joined">{friend.created}</p>
                        </div>
                        <div className="chat__notes">
                          <p className="chat__noteTitle">NOTE</p>
                          <p className="note">havent put that feature yet...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            : null}
        </div>
      </div>
      <div className="hello">
        <FaDiscord
          style={{
            fontSize: "28px",
            color: "RGB(181, 186, 193)",
            cursor: "pointer",
          }}
          onClick={() => openAndCloseSidebar()}
        />
        <FaUserFriends
          style={{
            fontSize: "28px",
            color: "RGB(181, 186, 193)",
            cursor: "pointer",
          }}
        />
        <IoIosSearch
          style={{
            fontSize: "28px",
            color: "RGB(181, 186, 193)",
            cursor: "pointer",
          }}
        />
        <GoBellFill
          style={{
            fontSize: "28px",
            color: "RGB(181, 186, 193)",
            cursor: "pointer",
          }}
        />
        <figure style={{ display: "flex" }}>
          <img
            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
            alt=""
            className="user__pfp"
          />
        </figure>
      </div>
    </div>
  );
}

export default Chats;
