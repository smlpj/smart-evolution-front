import { Grid } from "@mui/material";
import NavbarButton from "../../styles/button_2";
import Link from "next/link";

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
          <Link href="/customers/customerList" underline="none">
            <NavbarButton
              sx={{
                border: "0.5px solid #488B8F",
                marginBottom: "8%",
                width: "70%",
                height: "12%",
              }}
            >
              Clientes
            </NavbarButton>
          </Link>

          <NavbarButton
            sx={{ marginBottom: "8%", width: "70%", height: "12%" }}
          >
            Pre-Operaciones
          </NavbarButton>
          <Link href="/operations" underline="none">
            <NavbarButton
              sx={{ marginBottom: "8%", width: "70%", height: "12%" }}
            >
              Operaciones
            </NavbarButton>
          </Link>
          <Link href="/brokers/brokerList" underline="none">
            <NavbarButton
              sx={{ marginBottom: "8%", width: "70%", height: "12%" }}
            >
              Corredores
            </NavbarButton>
          </Link>
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
            sx={{ backgroundColor: "#FFFFFF", width: "70%", height: "30%" }}
          >
            Inversores disponibles
          </NavbarButton>
        </Grid>
      </Grid>
    </>
  );
}
