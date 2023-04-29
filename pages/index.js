import React from "react";
import BotFlow from "./components/organism/BotFlow";
import SideBar from "./components/molecules/SideBar";
import Chatbot from "./components/organism/ChatFlow";

const Home = () => {
  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="col-span-3">
        <SideBar />
      </div>
      <div className="col-span-9 h-screen">
        <h1 className="h-[8vh] bg-brown-400">ll</h1>
        <div className="h-[92vh]">
          {/* <Chatbot /> */}
          <BotFlow />
        </div>
      </div>
    </div>
  );
};

export default Home;
