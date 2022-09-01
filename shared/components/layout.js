import { Grid } from "@mui/material";
import Header from "./header";
import Sidebar from "./sidebar";

export default function Layout({ children }) {
  return (
    <>
      <Grid container direction="column" spacing={0}>
        <Grid item xs>
          <Header />
        </Grid>
        <Grid item xs>
          <Grid container xs direction="row">
            <Grid item xs={3}>
              <Sidebar />
            </Grid>
            <Grid item xs={9}>
              {children}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
