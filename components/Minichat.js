import React from "react";

const Minichat = ({ chat, admin }) => {
  return (
    <>
      <div className={`queryBox ${admin ? "left_chat" : "right_chat"}`}>
        {chat}
      </div>
    </>
  );
};

export default Minichat;
