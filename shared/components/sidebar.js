import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import NavbarButton from "../../styles/button_2";
import Header from "./header";

export default function Navbar() {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          borderRadius: "4px 4px 0px 0px",
          border: "2px solid",
          borderBottom: "0px",
          borderColor: "#B5D1C9",
          padding: "8%",
          backgroundColor: "#EBEBEB",
        }}
      >
        <NavbarButton sx={{ marginBottom: "2rem" }}>Clientes</NavbarButton>
        <NavbarButton sx={{ marginBottom: "2rem" }}>
          Pre-Operaciones
        </NavbarButton>
        <NavbarButton sx={{ marginBottom: "2rem" }}>Operaciones</NavbarButton>
        <NavbarButton sx={{ marginBottom: "2rem" }}>Corredores</NavbarButton>
        <NavbarButton>Administración</NavbarButton>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          borderRadius: "0px 0px 4px 4px",
          border: "2px solid",
          borderColor: "#B5D1C9",
          backgroundColor: "#FAFAFA",
          padding: "25% 15% 25% 15%",
          "@media (max-width: 1366px)": {},
        }}
      >
        <NavbarButton sx={{ backgroundColor: "#FFFFFF" }}>
          Inversores disponibles
        </NavbarButton>
      </Box>
    </>
  );
}
