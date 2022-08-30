import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import NavbarButton from "../styles/button_2";

export default function Navbar() {
    return (
        <>
            <Grid container spacing={0}>
                <Grid
                    item
                    xs={12}
                    sx={{ backgroundColor: "#EBEBEB", height: "100vh", color: "black" }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Box display="flex" flexDirection="column">
                        <Box
                            display="flex"
                            flexDirection="column"
                            sx={{
                                borderRadius: "4px 4px 0px 0px",
                                border: "2px solid",
                                borderColor: "#B5D1C9",
                                padding: "5vh",
                                borderBottom: 0
                            }}
                        >
                            <NavbarButton sx={{ marginBottom: "25px" }}>
                                Clientes
                            </NavbarButton>
                            <NavbarButton sx={{ marginBottom: "25px" }}>
                                Pre-Operaciones
                            </NavbarButton>
                            <NavbarButton sx={{ marginBottom: "25px" }}>
                                Operaciones
                            </NavbarButton>
                            <NavbarButton sx={{ marginBottom: "25px" }}>
                                Corredores
                            </NavbarButton>
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
                                padding: "10vh 5vh 10vh 5vh",
                            }}
                        >
                            <NavbarButton sx={{ backgroundColor: "#FFFFFF" }}>
                                Inversores disponibles
                            </NavbarButton>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}
