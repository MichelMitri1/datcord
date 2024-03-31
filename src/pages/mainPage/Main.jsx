import Accessibilities from "../../components/accessibilities/Accessibilities.jsx";
import ChatLogs from "../../components/chat logs/ChatLogs";
import Servers from "../../components/Servers/Servers";
import { FaUserFriends } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { GoBellFill } from "react-icons/go";
import { FaDiscord } from "react-icons/fa";
import React, { useState } from "react";
import "../mainPage/main.css";

function Main({ user }) {
  const [serverFriends, setServerFriends] = useState(false);

  function openAndCloseSidebar() {
    setServerFriends(!serverFriends);
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
    console.log("it's working yay");
  }

  return (
    <div className="main__container">
      <Servers serverFriends={serverFriends} />
      <ChatLogs user={user} serverFriends={serverFriends} />
      <Accessibilities
        user={user}
        openAndCloseSidebar={openAndCloseSidebar}
        setServerFriends={setServerFriends}
      />
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

export default Main;
