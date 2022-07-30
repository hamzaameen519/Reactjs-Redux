import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./Chat.css";
import { useSelector } from "react-redux";
import ChatWindow from "./ChatWindow";
const Chat = () => {
  const { roomId, user } = useSelector((state) => state.user);

  const [currentMessage, setCurrentMessage] = useState("");
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [showChat, setShowChat] = useState(false);
  // const socket = io.connect("http://localhost:5000");
  const socket = io("http://localhost:5000", {
    transports: ["websocket", "polling"], // use WebSocket first, if available
  });

  socket.on("connect_error", () => {
    // revert to classic upgrade
    socket.io.opts.transports = ["polling", "websocket"];
  });
  useEffect(() => {
    joinRoom(roomId);
  }, [roomId]);
  const joinRoom = (room) => {
    console.log("socket", socket);
    if (room !== "") {
      setRoom(room);
      setUsername(user?.name);
      console.log("..RoomId", room);
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <>
      <ul className="nav border-top" id="setting-panel" role="">
        {/* <li className="nav-item">
  <a
    className="nav-link active"
    id="todo-tab"
    data-toggle="tab"
    href="#todo-section"
    role="tab"
    aria-controls="todo-section"
    aria-expanded="true"
  >
    TO DO LIST
  </a>
</li>*/}
        <li className="nav-item">
          <a
            className="nav-link"
            // id="chats-tab"
            // data-toggle="tab"
            // href="#chats-section"
            // role="tab"
            // aria-controls="chats-section"
          >
            LIVE CHAT ({user?.name === username && username})
            <p style={{ fontSize: "10px" }}>{roomId}</p>
          </a>
        </li>
      </ul>

      <ChatWindow socket={socket} username={username} room={room} />
      {/*<div className=" row">
        <div className=" col-sm-12 col-12 styleFixed text-center ">
          <input
            type="text"
            style={{
              borderRadius: "5px",

              border: "2px solid silver",
              // textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              // width: "75%",

              position: "absolute",
            }}
            placeholder="Write your message..."
          />

          <button
            className="submit mr-5 "
            style={{
              float: "right",
              border: "none",
              outline: "none",
              background: "none",
              borderRadius: "50%",

              position: "relative",
              height: "1rem",
              // textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <i
              className="fa fa-paper-plane text-primary"
              aria-hidden="true"
            ></i>
          </button>
        </div>
          </div>
      <div className=" container ">
        <div className=" row styleFixed  ">
          <div className="col-sm-1 "> </div>
          <div className="col-sm-11  mb-5 mx-3">
            <input
              type="text"
              placeholder="Write your message..."
              style={{
                borderRadius: "50px",
                padding: "15px",
                // marginBottom: "10px",
                // overflowX: "hidden",
                // overflowY: "scroll",
                height: "1.8rem",
                justifyContent: "space-around",
                border: "none",
                outline: "none",
                // border: "2px solid silver",
                // textAlign: "center",
                // justifyContent: "center",
                // alignItems: "center",
                width: "90%",
                background: "#ffffff transparent transparent",
                position: "absolute",
              }}
            />

            <button
              // className="submit  "
              style={{
                float: "right",

                border: "none",
                outline: "none",
                background: "none",
                borderRadius: "50%",

                position: "relative",
                // height: "1rem",
              }}
            >
              <i
                className="fa fa-paper-plane fa-xs text-primary mt-2 "
                aria-hidden="true"
              ></i>
            </button>
          </div>
        </div>
      </div>*/}
    </>
  );
};

export default Chat;
