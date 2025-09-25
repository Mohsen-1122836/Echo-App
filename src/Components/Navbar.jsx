import { useContext, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";


export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function NavbarUI({ children }) {
  const { setIsLoggedIn, isLoggedIn, setUserData } = useContext(AuthContext);

  const navigate = useNavigate();

  function Logout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserData(null);
    navigate("/login");
  }

  return (
    <>
      <Navbar isBordered>
        <NavbarBrand className="gap-2">
          <Link to={"/"}>
            <img src='/e.png' alt="App Icon" className="w-6 h-6" />
          </Link>
          <p>
            <Link className="font-bold text-inherit" to="/">
              Echo
            </Link>
          </p>
        </NavbarBrand>

        <NavbarContent justify="end">
          {isLoggedIn ? (
            <NavbarItem>
              <Button onPress={Logout} color="danger" to="#" variant="flat">
                Logout
              </Button>
            </NavbarItem>
          ) : (
            <>
              {" "}
              <NavbarItem>
                <Link to="/login">
                  <Button color="primary">Login</Button>
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link to="/register">
                  <Button color="primary">register</Button>
                </Link>
              </NavbarItem>
            </>
          )}

          <NavbarItem>
            <Link to="/profile">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
}
