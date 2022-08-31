import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HeaderButton from "../styles/button_2";

export default function Header() {
  return (
    <>
      <Box sx={{ width: "100vw" }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#EBEBEB",
            borderBottom: "1.4px solid #5EA3A380",
            padding: "0.5vh 5vw 0.5vh 5vw",
          }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <img
                style={{ height: "3.4vh" }}
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
            <IconButton
              size="large"
              display="flex"
              justifyContent="center"
              alignItems="center"
              edge="end"
              color="inherit"
              aria-label="menu"
            >
              <HeaderButton
                sx={{
                  border: "1.4px solid #5EA3A3",
                  borderRadius: "50%",
                  padding: "1vh 1vw 1vh 1vw",
                }}
              >
                <img
                  style={{ height: "2vh" }}
                  src="/assets/Icon - Notificación.svg"
                ></img>
              </HeaderButton>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
