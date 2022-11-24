import Link from "next/link";

import { Grid } from "@mui/material";

import NavbarButton from "@styles/buttons/button_2";

export default function Navbar() {
  return (
    <>
      <Grid
        container
        direction="column"
        border="2px solid"
        borderColor="#B5D1C9"
        borderRadius="4px"
        height="76vh"
      >
        <Grid item xs>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            borderBottom="2px solid"
            borderColor="#B5D1C9"
            height="100%"
          >
            <Link href="/operations" underline="none">
              <NavbarButton
                sx={{ marginBottom: "8%", width: "70%", height: "10%" }}
              >
                Prospecto
              </NavbarButton>
            </Link>
            <Link href="/customers/customerList" underline="none">
              <NavbarButton
                sx={{
                  marginBottom: "8%",
                  width: "70%",
                  height: "10%",
                }}
              >
                Clientes
              </NavbarButton>
            </Link>

            <Link href="/bills/billList" underline="none">
              <NavbarButton
                sx={{
                  marginBottom: "8%",
                  width: "70%",
                  height: "10%",
                }}
              >
                Facturas
              </NavbarButton>
            </Link>

            <Link href="/operations" underline="none">
              <NavbarButton
                sx={{ marginBottom: "8%", width: "70%", height: "10%" }}
              >
                Operaciones
              </NavbarButton>
            </Link>
            <Link href="/brokers/brokerList" underline="none">
              <NavbarButton
                sx={{ marginBottom: "8%", width: "70%", height: "10%" }}
              >
                Corredores
              </NavbarButton>
            </Link>
            <Link href="/administration" underline="none">
              <NavbarButton sx={{ width: "70%", height: "10%" }}>
                Administración
              </NavbarButton>
            </Link>
          </Grid>
        </Grid>
        <Grid
          item
          xs={4}
          display="flex"
          backgroundColor="#FAFAFA"
          justifyContent="center"
          alignItems="center"
        >
          <NavbarButton
            sx={{ backgroundColor: "#FFFFFF", width: "70%", height: "25%" }}
          >
            Autogestión del cliente
          </NavbarButton>
        </Grid>
      </Grid>
    </>
  );
}
