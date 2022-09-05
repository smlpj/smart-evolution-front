import { Grid, Typography, Box } from "@mui/material";

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
      <Box height="73vh" bgcolor="#B5D1C9">
        <Typography variant="h5" color="primary">
          Hola, como tas?
        </Typography>
      </Box>
    </>
  );
};
