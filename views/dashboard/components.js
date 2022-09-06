import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import Image from "next/image";

export const DashboardContent = () => {
  return (
    <>
      {/* <Grid container xs={12} spacing={0} height="75vh" maxWidth>
        <Grid container xs bgcolor="#B5D1C9">
          <Grid item xs={8}>
            <Typography variant="h5" color="primary">
              Hola, como tas?
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5" color="primary">
              ola
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={5}></Grid>
      </Grid> */}
      <Box height="46.9vh" bgcolor="#B5D1C9" display="flex">
        <Typography
          variant="h5"
          color="#5B898E"
          fontFamily="Montserrat"
          alignSelf="center"
          marginLeft="5rem"
        >
          <b>
            “Para tener éxito tu deseo de alcanzarlo debe ser mayor que tu miedo
            al fracaso”
          </b>
          <br></br> - Bill Cosby
        </Typography>
        <Image src="/assets/Ilustración - Home.svg" height={500} width={500} />
      </Box>
      <Box height="26.1vh" sx={{}}>
        <CircularProgress
          variant="determinate"
          value={82}
          size="11rem"
          style={{
            backgroundColor: "white",
            color: "#488B8F",
            borderRadius: "50%",
          }}
          thickness={4.5}
        ></CircularProgress>
      </Box>
    </>
  );
};
