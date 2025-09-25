import React from "react";
import { Outlet } from "react-router-dom";
import NavbarUI from "./Navbar";

export default function AuthLayout() {
  return (
    <>
      <NavbarUI />

      <Outlet />
    </>
  );
}
