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
    <Box sx={{ flexGrow: 1 }}>
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
            sx={{ border: "1.4px solid #5EA3A3", padding: "1vh 1vw 1vh 1vw" }}
            endIcon={<img src="/assets/Icon Home.svg"></img>}
          >
            Inicio
          </HeaderButton>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
