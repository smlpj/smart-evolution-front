import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import NavbarButton from "../../styles/button_2";
import Header from "./header";

export default function Navbar() {
  return (
    <>
      <Box
        sx={{
          marginTop: "1.5%",
          marginLeft: "4%",
          width: "20%",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          sx={{
            borderRadius: "4px 4px 0px 0px",
            border: "2px 2px 0px 2px solid",
            borderColor: "#B5D1C9",
            padding: "10%",
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
            padding: "20% 10% 20% 10%",
            "@media (max-width: 600px)": {
              backgroundColor: "black",
            },
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
