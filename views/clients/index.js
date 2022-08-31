import { Grid } from "@mui/material";
import MuiTextField from "../../styles/fields";
import { Box } from "@mui/material";
import InputTitles from "../../styles/inputTitles";

export default function ClientRegister() {
  return (
    <>
      <Grid container spacing={0}>
        <Grid
          item
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          xs={12}
          sx={{ backgroundColor: "#EBEBEB" }}
        >
          <Box display="flex" flexDirection="column">
            <Box display="flex" flexDirection="column">
              <InputTitles>Tipo de documento</InputTitles>
              <MuiTextField
                placeholder="Ingresa tu número de documento"
                variant="standard"
                margin="normal"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                sx={{ width: "20rem", marginBottom: "3rem" }}
              />
              <InputTitles>Número de documento</InputTitles>
              <MuiTextField
                placeholder="Ingresa tu número de documento"
                variant="standard"
                margin="normal"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                sx={{ width: "20rem", marginBottom: "3rem" }}
              />
              <InputTitles>Número de documento</InputTitles>
              <MuiTextField
                placeholder="Ingresa tu número de documento"
                variant="standard"
                margin="normal"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                sx={{ width: "20rem", marginBottom: "3rem" }}
              />
              <InputTitles>Número de documento</InputTitles>
              <MuiTextField
                placeholder="Ingresa tu número de documento"
                variant="standard"
                margin="normal"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                sx={{ width: "20rem", marginBottom: "3rem" }}
              />
              <InputTitles>Número de documento</InputTitles>
              <MuiTextField
                placeholder="Ingresa tu número de documento"
                variant="standard"
                margin="normal"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                sx={{ width: "20rem", marginBottom: "3rem" }}
              />
              <InputTitles>Número de documento</InputTitles>
              <MuiTextField
                placeholder="Ingresa tu número de documento"
                variant="standard"
                margin="normal"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                sx={{ width: "20rem", marginBottom: "3rem" }}
              />
              <InputTitles>Número de documento</InputTitles>
              <MuiTextField
                placeholder="Ingresa tu número de documento"
                variant="standard"
                margin="normal"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                sx={{ width: "20rem", marginBottom: "3rem" }}
              />
              <InputTitles>Número de documento</InputTitles>
              <MuiTextField
                placeholder="Ingresa tu número de documento"
                variant="standard"
                margin="normal"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                sx={{ width: "20rem", marginBottom: "3rem" }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
