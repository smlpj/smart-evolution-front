import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import NavbarButton from "../../styles/button_2";
import Header from "./header";

export default function Navbar() {
  return (
    <>
      <Grid
        container
        direction="column"
        border="2px solid"
        borderColor="#B5D1C9"
        borderRadius="4px"
        height="73vh"
      >
        <Grid
          container
          xs
          direction="column"
          justifyContent="center"
          alignItems="center"
          borderBottom="2px solid"
          borderColor="#B5D1C9"
        >
          <NavbarButton
            sx={{ marginBottom: "8%", width: "70%", height: "12%" }}
          >
            Clientes
          </NavbarButton>
          <NavbarButton
            sx={{ marginBottom: "8%", width: "70%", height: "12%" }}
          >
            Pre-Operaciones
          </NavbarButton>
          <NavbarButton
            sx={{ marginBottom: "8%", width: "70%", height: "12%" }}
          >
            Operaciones
          </NavbarButton>
          <NavbarButton
            sx={{ marginBottom: "8%", width: "70%", height: "12%" }}
          >
            Corredores
          </NavbarButton>
          <NavbarButton sx={{ width: "70%", height: "12%" }}>
            Administración
          </NavbarButton>
        </Grid>
        <Grid
          item
          xs={4.3}
          display="flex"
          backgroundColor="#FAFAFA"
          justifyContent="center"
          alignItems="center"
        >
          <NavbarButton
            sx={{ backgroundColor: "#FFFFFF", width: "70%", height: "20%" }}
          >
            Inversores disponibles
          </NavbarButton>
        </Grid>
      </Grid>
    </>
  );
}
