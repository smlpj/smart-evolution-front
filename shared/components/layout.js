import { Grid } from "@mui/material";
import Header from "./header";
import Sidebar from "./sidebar";

export default function Layout({ children }) {
  return (
    <>
      <Grid container sx={{ flex: 1 }} direction="column" spacing={3}>
        <Grid item xs>
          <Header />
        </Grid>
        <Grid item xs>
          <Sidebar />
        </Grid>
      </Grid>
    </>
  );
}
