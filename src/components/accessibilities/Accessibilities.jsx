import pfp from "../../assets/server pictures/i-be-poppin-bottles-meme.gif";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { IoChatbubbleSharp } from "react-icons/io5";
import "../accessibilities/accessibilities.css";
import { useNavigate } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import { BiSolidInbox } from "react-icons/bi";
import { IoIosCreate } from "react-icons/io";
import { IoMdMore } from "react-icons/io";
import React, { useState, useEffect, useRef } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase.js";

function Accessibilities({ user, openAndCloseSidebar, setServerFriends }) {
  const [query1, setQuery1] = useState("");
  const [userFriends, setUserFriends] = useState([]);
  const [addFriend, setAddFriend] = useState(false);
  const navigate = useNavigate();
  const friendReg = useRef("");

  function getAllUsers() {
    const q = query(collection(db, "users"));
    onSnapshot(q, (snapshot) =>
      setUserFriends(
        snapshot.docs.map((elem) => ({ ...elem.data(), id: elem.id }))
      )
    );
  }

  function requestFriend() {
    if (!friendReg.current.value) {
      return;
    }

    const friendToAdd = userFriends.filter(
      (friend) =>
        friend.username === friendReg.current.value &&
        friend.username !== user.displayName
    );

    console.log(friendToAdd[0].id);
  }

  function navigateToChat(id) {
    navigate(`/main/${user.uid + id}`);
    setServerFriends(true);
    openAndCloseSidebar();
  }

  const friendCount = userFriends.filter((friend) =>
    friend.name.toLowerCase().includes(query1)
  ).length;

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="accessibilities__container">
      <div className="hotbar__wrapper">
        <div className="hotbar">
          <div className="friends">
            <FaUserFriends
              style={{ color: "RGB(148, 155, 164)", fontSize: "26px" }}
            />
            <div className="friends__para">Friends</div>
          </div>
          <p className="hotbar__option">Online</p>
          <p className="hotbar__option">All</p>
          <p className="hotbar__option">Pending</p>
          <p className="hotbar__option">Blocked</p>
          <p className="add__friend" onClick={() => setAddFriend(true)}>
            Add Friend
          </p>
          {addFriend ? (
            <div className="addFriend__wrapper">
              <input type="text" ref={friendReg} className="addFriend__input" />
              <button onClick={() => requestFriend()} className="addFriend__button">add</button>
            </div>
          ) : null}
        </div>
        <div className="creation">
          <IoIosCreate
            style={{
              color: "RGB(148, 155, 164)",
              fontSize: "26px",
              cursor: "pointer",
            }}
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
        <div className="friends__listContainer">
          <div className="friends__searchBar">
            <input
              type="text"
              className="search"
              placeholder="Search"
              onChange={(e) => setQuery1(e.target.value)}
            />
            <p
              style={{
                color: "RGB(175, 180, 187)",
                fontSize: "12px",
                fontWeight: "600",
              }}
            >
              ALL FRIENDS - {friendCount}
            </p>
          </div>
          <div className="friends__listWrapper">
            {userFriends
              ? userFriends
                  .filter((friend) =>
                    friend.name.toLowerCase().includes(query1)
                  )
                  .filter((friend) => friend.id !== user.uid)
                  .map((friend, index) => (
                    <div
                      className="friendList"
                      key={index}
                      onClick={(id) => navigateToChat(friend.id)}
                    >
                      <div className="friend__details">
                        <figure className="friends__pfpWrapper">
                          <img src={pfp} alt="" className="friends__pfp" />
                        </figure>
                        <div className="friends__info">
                          <p className="friends__name">{friend.name}</p>
                          <p className="friends__para">Offline</p>
                        </div>
                      </div>
                      <div className="friend__actions">
                        <IoChatbubbleSharp
                          style={{
                            color: "RGB(181, 186, 193)",
                            fontSize: "40px",
                            backgroundColor: "RGB(43, 45, 49)",
                            padding: "8px",
                            borderRadius: "50%",
                          }}
                        />
                        <IoMdMore
                          style={{
                            color: "RGB(181, 186, 193)",
                            fontSize: "40px",
                            backgroundColor: "RGB(43, 45, 49)",
                            padding: "8px",
                            borderRadius: "50%",
                          }}
                        />
                      </div>
                    </div>
                  ))
              : null}
          </div>
        </div>
        <div className="active__wrapper">
          <h2 className="active__header">Active Now</h2>
          <p className="active__quiet">It's quiet for now...</p>
          <p className="active__para">
            When a friend starts an activity - like playing a game or hanging
            out on voice - we'll show it here!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Accessibilities;
