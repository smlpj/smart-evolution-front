import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import Image from "next/image";
import DashboardButton from "../../styles/button_3";
import EastIcon from "@mui/icons-material/East";

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
        <Box
          display="flex"
          justifyContent="center"
          margin="0rem 3rem"
          flexDirection="row"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="left"
            justifyContent="center"
            marginRight="2rem"
          >
            <Typography
              letterSpacing={0}
              fontSize="1rem"
              fontFamily="Montserrat"
              fontWeight="bold"
              marginBottom="1rem"
            >
              Cartera Colocada
            </Typography>
            <Typography
              letterSpacing={0}
              fontSize="0.8rem"
              fontFamily="Montserrat"
              marginBottom="0.7rem"
            >
              Detalle de <br />
              prestamos
            </Typography>

            <DashboardButton
              sx={{ justifyContent: "flex-start" }}
              endIcon={<EastIcon />}
            >
              Revisar
            </DashboardButton>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress
              variant="determinate"
              value={82}
              size="10.5vw"
              style={{
                backgroundColor: "white",
                color: "#488B8F",
                borderRadius: "50%",
              }}
              thickness={4.5}
            />
            <Box
              sx={{
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                position="absolute"
                color="#5EA3A3"
                marginTop={-2}
                fontSize="1.8rem"
                fontFamily="Montserrat"
                fontWeight="light"
              >
                {82}%
              </Typography>
              <Typography
                position="relative"
                color="#333333"
                marginTop={4}
                fontSize="0.6rem"
                fontFamily="Montserrat"
                fontWeight="bold"
              >
                junio 2022
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* <Box
          display="flex"
          justifyContent="center"
          margin="0rem 3rem"
          flexDirection="row"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="left"
            justifyContent="center"
            marginRight="2rem"
          >
            <Typography
              letterSpacing={0}
              fontSize="1rem"
              fontFamily="Montserrat"
              fontWeight="bold"
              marginBottom="1rem"
            >
              Cartera Colocada
            </Typography>
            <Typography
              letterSpacing={0}
              fontSize="0.8rem"
              fontFamily="Montserrat"
              marginBottom="0.7rem"
            >
              Detalle de <br />
              prestamos
            </Typography>

            <DashboardButton
              sx={{ justifyContent: "flex-start" }}
              endIcon={<EastIcon />}
            >
              Revisar
            </DashboardButton>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress
              variant="determinate"
              value={82}
              size="10.5vw"
              style={{
                backgroundColor: "white",
                color: "#488B8F",
                borderRadius: "50%",
              }}
              thickness={4.5}
            />
            <Box
              sx={{
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                position="absolute"
                color="#5EA3A3"
                marginTop={-2}
                fontSize="1.8rem"
                fontFamily="Montserrat"
                fontWeight="light"
              >
                {82}%
              </Typography>
              <Typography
                position="relative"
                color="#333333"
                marginTop={4}
                fontSize="0.6rem"
                fontFamily="Montserrat"
                fontWeight="bold"
              >
                junio 2022
              </Typography>
            </Box>
          </Box>
        </Box> */}
      </Box>
    </>
  );
};
