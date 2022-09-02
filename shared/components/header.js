import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HeaderButton from "../../styles/button_2";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

export default function Header() {
  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#EBEBEB",
          borderBottom: "1.4px solid #5EA3A380",
          padding: "0.4% 5% 0.4% 5%",
        }}
      >
        <Toolbar>
          <img style={{ height: "2.6rem" }} src="/assets/Icono Smart.svg"></img>
          <HeaderButton
            sx={{
              border: "1.4px solid #5EA3A3",
              padding: "0.7%",
              marginLeft: "1.3%",
            }}
            endIcon={
              <img style={{ marginLeft: "1vw" }} src="/assets/Icon Home.svg" />
            }
          >
            Inicio
          </HeaderButton>
          <Box flexGrow={1} />
          {/*           <HeaderButton
            sx={{
              borderRadius: "50%",
            }}
          >
            <NotificationsNoneOutlinedIcon />
          </HeaderButton> */}
          <IconButton
            edge="end"
            sx={{
              border: "0.5px solid #488B8F",
              backgroundColor: "#EBEBEB",
              color: "#488B8F",
              padding: "1.2%",
              marginRight: "1%",
              "&:hover": {
                backgroundColor: "#CFDDDD",
              },
            }}
            aria-label="notifications"
          >
            <NotificationsNoneOutlinedIcon />
          </IconButton>
          <IconButton
            edge="end"
            sx={{
              border: "0.5px solid #488B8F",
              backgroundColor: "#488B8F",
              color: "#FFFFFF",
              padding: "1.2%",
              "&:hover": {
                backgroundColor: "#5EA3A3",
              },
            }}
            aria-label="avatar"
          >
            <NotificationsNoneOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* <Box>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#EBEBEB",
            borderBottom: "1.4px solid #5EA3A380",
            padding: 0,
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
            <Box>
              <HeaderButton
                edge="start"
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
      </Box> */}
    </>
  );
}
