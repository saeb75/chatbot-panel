import React from "react";
import Logo from "../atoms/Logo";
import { Button, Input, Textarea } from "@material-tailwind/react";
import useBotStore, { SideBarOptions } from "@/store/bot";
import { useReactFlow, useStoreApi, getBezierPath } from "reactflow";
import uniqid from "uniqid";
import { createGraphLayout } from "@/pages/helper/autoLayout";
import AddMessage from "../atoms/AddMessage";
import AddAskResolved from "../atoms/AddAskResolved";
import TransferToAgent from "../atoms/AddTransferToAgent";
import AddTransferToAgent from "../atoms/AddTransferToAgent";
import AddOptions from "../atoms/AddOptions";
const buttons = [
  {
    name: "Message",
    color: "amber",
    value: SideBarOptions.Meassege,
  },
  {
    name: "Ask if question resolved",
    color: "red",
    value: SideBarOptions.AskResolved,
  },
  {
    name: "Transfer to Agent",
    color: "yellow",
    value: SideBarOptions.TransferToAgent,
  },
  {
    name: "Present Options",
    color: "green",
    value: SideBarOptions.Options,
  },
];
const SideBar = () => {
  const { sideBarStatus, setSideBarStatus, selectedNode } = useBotStore(
    (state) => state
  );
  const changeSideBarStatus = (status) => {
    setSideBarStatus(status);
  };

  return (
    <div className="bg-white shadow-lg h-full">
      <Logo />
      <div className="flex justify-center items-center mt-12 px-4">
        {sideBarStatus === "MainOptions" && (
          <ul className=" w-full">
            {buttons.map((button) => (
              <Button
                onClick={() => changeSideBarStatus(button.value)}
                color={button.color}
                fullWidth
                className="w-full my-4"
              >
                {button.name}
              </Button>
            ))}
          </ul>
        )}
        {sideBarStatus === SideBarOptions.Meassege && <AddMessage />}
        {sideBarStatus === SideBarOptions.AskResolved && <AddAskResolved />}
        {sideBarStatus === SideBarOptions.TransferToAgent && (
          <AddTransferToAgent />
        )}
        {sideBarStatus === SideBarOptions.Options && <AddOptions />}
      </div>
    </div>
  );
};

export default SideBar;
