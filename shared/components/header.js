import { useContext, useMemo, useState } from "react";

import Link from "next/link";

import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";

import HeaderButton from "@styles/buttons/button_2";

import authContext from "@context/authContext";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { user, logout } = useContext(authContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (evt, any) => {
    setAnchorEl(null);
    if (!any) logout();
  };

  const nameInitials = useMemo(
    () =>
      (user &&
        user.name
          .split(" ")
          .map((name, i) => {
            if (i > 1 || !name) return;
            return name[0].toUpperCase();
          })
          .join("")) ||
      "LDG",
    [user.name]
  );

  return (
    <>
      <AppBar
        elevation={0}
        position="relative" // static, fixed, absolute, sticky, relative
        sx={{
          backgroundColor: "#EBEBEB",
          borderBottom: "1.4px solid #5EA3A380",
          padding: "0.6rem",
          height: "100%",
          justifyContent: "center",


          "@media all and (display-mode: fullscreen)": {
            height: "10vh",
          }
        }}
      >
        <Toolbar sx={{ marginRight: "3%", marginLeft: "3%" }}>
          <>
            <img
              style={{ height: "4vh" }}
              src="/assets/Logo Smart - Lite.svg"
              alt="Logo"
            ></img>
            <Link href="/dashboard" underline="none">
              <HeaderButton
                sx={{
                  border: "1.4px solid #5EA3A3",
                  padding: "0.7%",
                  marginLeft: "1.3%",
                }}
                endIcon={
                  <img
                    style={{ marginLeft: "1.5vw" }}
                    src="/assets/Icon Home.svg"
                    alt=""
                  />
                }
              >
                Inicio
              </HeaderButton>
            </Link>
          </>

          <Box flexGrow={1} />

          <Avatar
            id="menu-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{ backgroundColor: "#488B8F", fontSize: 16, cursor: "pointer" }}
          >
            {nameInitials}
          </Avatar>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "menu-button",
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem dense onClick={handleClose}>
              Cerrar sesión
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
}
