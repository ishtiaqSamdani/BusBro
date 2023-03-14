import React from "react";

const Minichat = ({ chat, admin }) => {
  return (
    <>
      <div className={`chatDon ${admin ? "chat_left" : "chat_right"}`}>
        <div className={` ${admin ? "left_chat" : "right_chat"}`}>
        <img className="chatImg" src="./static/chatProfile.svg" alt="error"></img>
        {admin ? (<><p  className="chatText">Admin</p></>) : (<><p className="chatText">User</p></>)}
        </div>
        <div className={`queryBox ${admin ? "left_chat" : "right_chat"}`}>
          {chat}
        </div>
      </div>
    </>
  );
};

export default Minichat;
