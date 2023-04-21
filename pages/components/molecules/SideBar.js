import React from "react";
import Logo from "../atoms/Logo";
import { Input } from "@material-tailwind/react";

const SideBar = () => {
  return (
    <div className="bg-green-50 h-full">
      <Logo />
      <ul className="px-4 mt-12">
        <li>
          <Input label="Node Name" />
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
