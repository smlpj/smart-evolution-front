import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import NavbarButton from "../styles/button_2";
import Header from "./header";

export default function Navbar() {
  return (
    <>
      <Box display="flex" flexDirection="column">
        <Box
          display="flex"
          flexDirection="column"
          sx={{
            borderRadius: "4px 4px 0px 0px",
            border: "2px solid",
            borderColor: "#B5D1C9",
            padding: "5vh",
            borderBottom: 0,
          }}
        >
          <NavbarButton sx={{ marginBottom: "25px" }}>Clientes</NavbarButton>
          <NavbarButton disabled sx={{ marginBottom: "25px" }}>
            Pre-Operaciones
          </NavbarButton>
          <NavbarButton disabled sx={{ marginBottom: "25px" }}>
            Operaciones
          </NavbarButton>
          <NavbarButton disabled sx={{ marginBottom: "25px" }}>
            Corredores
          </NavbarButton>
          <NavbarButton disabled>Administración</NavbarButton>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          sx={{
            borderRadius: "0px 0px 4px 4px",
            border: "2px solid",
            borderColor: "#B5D1C9",
            backgroundColor: "#FAFAFA",
            padding: "10vh 5vh 10vh 5vh",
          }}
        >
          <NavbarButton sx={{ backgroundColor: "#FFFFFF" }}>
            Inversores disponibles
          </NavbarButton>
        </Box>
      </Box>
    </>
  );
}
