import { Grid } from "@mui/material";
import Header from "./header";
import Sidebar from "./sidebar";
import Footer from "./footer";
import Box from "@mui/material/Box";

export default function Layout({ children }) {
  return (
    <>
      <Grid container direction="column" sx={{ height: "100vh" }}>
        <Grid item xs={1}>
          <Header />
        </Grid>

        <Grid item margin="0% 5%" xs display="flex" alignItems="center">
          <Grid container direction="row">
            <Grid item xs={2.3}>
              <Sidebar />
            </Grid>
            <Grid item xs>
              {children}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={0.5}>
          <Box margin="0% 5%">
            <Footer />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
