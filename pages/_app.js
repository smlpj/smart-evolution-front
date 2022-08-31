import "../styles/globals.css";
import Navbar from "../components/navbar";
import { useRouter } from "next/router";
import Header from "../components/header";
import { Grid } from "@mui/material";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      {router.pathname !== "/auth/login" ? <Header /> : null}
      <Grid container spacing={0}>
        <Grid
          item
          xs={3}
          sx={{ backgroundColor: "#EBEBEB", height: "92vh", color: "black" }}
          display="flex"
          alignItems="center"
          justifyContent="left"
          paddingLeft="3%"
        >
          {router.pathname !== "/auth/login" ? <Navbar /> : null}
        </Grid>
        <Grid item xs={9} sx={{ backgroundColor: "#EBEBEB" }}>
          <Component {...pageProps} />
        </Grid>
      </Grid>
    </>
  );
}

export default MyApp;
