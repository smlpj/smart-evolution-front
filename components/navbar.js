import { Grid } from "@mui/material";
import { Box } from "@mui/system";

export default function Navbar() {
    return (
        <>
            <Grid container spacing={0}>
                <Grid item xs={12}
                    sx={{ backgroundColor: 'white', height: '100vh', color: 'black' }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center">
                    <Box sx={{ borderRadius: '4px', border: '1px solid', borderColor: '#B5D1C9', padding: '20px' }}>
                        Holaaaaaa
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}
