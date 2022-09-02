import { Grid } from "@mui/material";
import NavbarButton from "../../styles/button_2";
import Header from "./header";
import Sidebar from "./sidebar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import HeaderButton from "../../styles/button_2";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

export default function Layout({ children }) {
  return (
    <>
      <Grid
        container
        direction="column"
        display="flex"
        spacing={0}
        sx={{
          height: "100vh",
        }}
      >
        <Grid item xs={1}>
          <Header />
        </Grid>
        <Grid item xs display="flex" alignItems="center">
          <Grid container direction="row">
            <Grid item xs={3} sx={{ padding: "2%" }}>
              <Sidebar />
            </Grid>
            <Grid item xs>
              {children}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <h1>Hola</h1>
        </Grid>
      </Grid>
    </>
  );
}
