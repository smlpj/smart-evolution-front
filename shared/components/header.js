import Link from "next/link";

import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";

import HeaderButton from "@styles/button_2";

export default function Header() {
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
                  />
                }
              >
                Inicio
              </HeaderButton>
            </Link>
          </>

          <Box flexGrow={1} />

          <IconButton
            edge="end"
            sx={{
              border: "0.5px solid #488B8F",
              backgroundColor: "#EBEBEB",
              color: "#488B8F",
              padding: "0.5%",
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
              padding: "0.5%",
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
    </>
  );
}
