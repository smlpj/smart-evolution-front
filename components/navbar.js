import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import NavbarButton from "../styles/button_2";


export default function Navbar() {
    return (
        <>
            <Grid container spacing={0}>
                <Grid item xs={12}
                    sx={{ backgroundColor: '#EBEBEB', height: '100vh', color: 'black' }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center">
                    <Box display="flex" flexDirection="column" sx={{ borderRadius: '4px', border: '1.4px solid', borderColor: '#B5D1C9', padding: '20px' }}>
                        <NavbarButton>Clientes</NavbarButton>
                        <NavbarButton>Pre-Operaciones</NavbarButton>
                        <NavbarButton>Operaciones</NavbarButton>
                        <NavbarButton>Corredores</NavbarButton>
                        <NavbarButton>Administración</NavbarButton>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}
