import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HeaderButton from "../styles/button_2";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

export default function Header() {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#EBEBEB",
            borderBottom: "1.4px solid #5EA3A380",
            padding: "0.5% 5% 0.5% 5%",
          }}
        >
          <Toolbar>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              sx={{ flexGrow: 1 }}
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <img
                  style={{ height: "3rem" }}
                  src="/assets/Icono Smart.svg"
                ></img>
              </IconButton>
              <HeaderButton
                sx={{
                  border: "1.4px solid #5EA3A3",
                  padding: "1vh 1vw 1vh 1vw",
                }}
                endIcon={
                  <img
                    style={{ marginLeft: "2vh" }}
                    src="/assets/Icon Home.svg"
                  />
                }
              >
                Inicio
              </HeaderButton>
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center">
              <HeaderButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="notifications"
                sx={{
                  borderRadius: "50%",
                  border: "1.4px solid #488B8F",
                  objectFit: "cover",
                }}
              >
                <NotificationsNoneOutlinedIcon />
              </HeaderButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
