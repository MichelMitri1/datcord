import React from "react";
import { FaDiscord } from "react-icons/fa";
import "../Servers/servers.css";
import server from "../../assets/discord-background.png";
import servers from "../../servers.js";

function Servers() {
  return (
    <div className="servers__container ">
      <div className="discord__logoWrapper">
        <FaDiscord
          className="discord__logo"
          style={{ fontSize: "32px", color: "rgb(239, 242, 245)" }}
        />
      </div>
      <figure className="servers__imgWrapperBorder">
        <img src={server} alt="" className="servers__img" />
      </figure>
      {servers.map((servers, index) => (
        <figure className="servers__imgWrapper" key={index}>
          <img src={servers.serverPic} alt="" className="servers__img" />
        </figure>
      ))}
    </div>
  );
}

export default Servers;
