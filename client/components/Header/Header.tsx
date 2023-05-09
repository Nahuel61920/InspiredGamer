import React from "react";
import Menu from "./Menu/Menu";
import TopBar from "./TopBar/TopBar";

export default function Header() {
  return (
    <div className="header">
      <TopBar />
      <Menu />
    </div>
  );
}
