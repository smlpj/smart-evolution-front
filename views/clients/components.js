import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MuiTextField from "../../styles/fields";
import Image from "next/image";
import { Autocomplete, Fade } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Clear } from "@mui/icons-material";
import InputTitles from "../../styles/inputTitles";
import MuiButton from "../../styles/button";
import Header from "../../shared/components/header";
import { FormControl } from "@mui/material";
import HelperText from "../../styles/helperText";
import { InputAdornment } from "@mui/material";
import { IconButton } from "@mui/material";
import { LoginIcon } from "@mui/icons-material/Login";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CitySelect from "../../shared/components/selects/citySelect";
import TypeIDSelect from "../../shared/components/selects/typeIdentitySelect";
import DepartmentSelect from "../../shared/components/selects/departmentSelect";

const theme = createTheme();

export const SignUpClient = ({ formik }) => {
  return (
    <>
      <Grid
        container
        direction="column"
        display="flex"
        spacing={0}
        sx={{
          height: "100vh",
        }}
      >
        <Grid item xs={1} sx>
          <Header />
        </Grid>
        <Grid container xs>
          <Grid
            item
            xs={12}
            md={6}
            style={{ background: "#b5d1c9" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <div>
              <Image
                src="/assets/Ilustración - Creación de Usuario 1.svg"
                height="500vh"
                width="500vw"
              />
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{ background: "#EBEBEB" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <form onSubmit={formik.handleSubmit}>
              <Box display="flex" flexDirection="column" alignItems="left">
                <Typography
                  letterSpacing={0}
                  fontSize="1.7rem"
                  fontFamily="Montserrat"
                  fontWeight="regular"
                  marginBottom="4rem"
                  color="#5EA3A3"
                >
                  Registro de corredores
                </Typography>
                <Box display="flex" flexDirection="row">
                  {/* <Box mb={4}>
                    <Box width="18vw">
                      <InputTitles marginBottom={2}>
                        Tipo de identificación
                      </InputTitles>
                      <Autocomplete
                        disablePortal
                        options={top100Films}
                        color="#5EA3A3"
                        popupIcon={
                          <KeyboardArrowDownIcon sx={{ color: "#5EA3A3" }} />
                        }
                        clearIcon={<Clear sx={{ color: "#5EA3A3" }} />}
                        renderInput={(params) => (
                          <MuiTextField
                            variant="standard"
                            {...params}
                            id="type_identity"
                            onChange={formik.handleChange}
                            placeholder="Tipo de identificación"
                            InputProps={{
                              ...params.InputProps,
                              disableUnderline: true,
                              sx: {
                                marginTop: "-2px",
                              },
                            }}
                          />
                        )}
                      />
                    </Box>
                  </Box> */}
                  <TypeIDSelect formik={formik} />
                  <Box mb={4} ml={5} width="18vw">
                    <InputTitles>Número de identificación</InputTitles>
                    <MuiTextField
                      id="document_number"
                      placeholder="Ingresa tu identificación"
                      name="document_number"
                      type="number"
                      variant="standard"
                      margin="normal"
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                      }}
                      onChange={formik.handleChange}
                      sx={{
                        "& input[type=number]": {
                          "-moz-appearance": "textfield",
                        },
                        "& input[type=number]::-webkit-outer-spin-button": {
                          "-webkit-appearance": "none",
                          margin: 0,
                        },
                        "& input[type=number]::-webkit-inner-spin-button": {
                          "-webkit-appearance": "none",
                          margin: 0,
                        },
                      }}
                    />
                  </Box>
                </Box>
                <Box display="flex" flexDirection="row">
                  <Box mb={4} width="18vw">
                    <InputTitles>Nombre</InputTitles>
                    <MuiTextField
                      id="first_name"
                      placeholder="Ingresa tu nombre"
                      name="first_name"
                      type="text"
                      variant="standard"
                      margin="normal"
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                      }}
                      onChange={formik.handleChange}
                    />
                  </Box>
                  <Box mb={4} ml={5} width="18vw">
                    <InputTitles>Apellido</InputTitles>
                    <MuiTextField
                      id="last_name"
                      placeholder="Ingresa tu apellido"
                      name="last_name"
                      type="text"
                      variant="standard"
                      margin="normal"
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                      }}
                      onChange={formik.handleChange}
                    />
                  </Box>
                </Box>
                <Box display="flex" flexDirection="row">
                  <Box mb={4} width="18vw">
                    <InputTitles>Dirección</InputTitles>
                    <MuiTextField
                      id="address"
                      placeholder="Ingresa tu dirección"
                      name="address"
                      type="text"
                      variant="standard"
                      margin="normal"
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                      }}
                      onChange={formik.handleChange}
                    />
                  </Box>
                  <Box mb={4} ml={5} width="18vw">
                    <InputTitles>Email</InputTitles>
                    <MuiTextField
                      id="email"
                      placeholder="Ingresa tu email"
                      name="email"
                      type="email"
                      variant="standard"
                      margin="normal"
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                      }}
                      onChange={formik.handleChange}
                    />
                  </Box>
                </Box>
                <Box display="flex" flexDirection="row">
                  <Box mb={4} width="39vw">
                    <InputTitles>Número de teléfono</InputTitles>
                    <MuiTextField
                      id="phone_number"
                      placeholder="Ingresa tu número de teléfono"
                      name="phone_number"
                      type="tel"
                      variant="standard"
                      margin="normal"
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                      }}
                      onChange={formik.handleChange}
                    />
                  </Box>
                </Box>
                <Box display="flex" flexDirection="row">
                  <DepartmentSelect formik={formik} />
                  <CitySelect formik={formik} />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="right"
                marginRight={-2.5}
              >
                <MuiButton
                  type="submit"
                  variant="contained"
                  onClick={formik.handleSubmit}
                  sx={{ mt: 3, mb: 2, boxShadow: "none", borderRadius: "4px" }}
                >
                  <Typography
                    fontSize="90%"
                    fontFamily="Montserrat"
                    fontWeight="bold"
                  >
                    Registrar
                  </Typography>
                  <ArrowForwardIcon
                    sx={{ color: "#fff", ml: 2, fontSize: "medium" }}
                  />
                </MuiButton>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </>

    /* <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            marginBottom={3}
          >
            <Image
              src="/assets/Icono Smart + Texto.svg"
              height={60}
              width={280}
              alt="Smart Evolution"
            />

            <Typography
              component="h1"
              variant="h5"
              borderLeft="0.5px solid #63595C"
              paddingLeft="5%"
              fontFamily="Montserrat"
              color="#63595C"
            >
              Registro de corredores
            </Typography>
          </Box>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Box>
                  <InputTitles marginBottom={3}>
                    Tipo de identificación
                  </InputTitles>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={top100Films}
                    color="#5EA3A3"
                    popupIcon={
                      <KeyboardArrowDownIcon sx={{ color: "#5EA3A3" }} />
                    }
                    clearIcon={<Clear sx={{ color: "#5EA3A3" }} />}
                    renderInput={(params) => (
                      <MuiTextField
                        variant="standard"
                        {...params}
                        placeholder="Tipo de identificación"
                        InputProps={{
                          ...params.InputProps,
                          disableUnderline: true,
                        }}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <InputTitles>Número de identificación</InputTitles>
                <MuiTextField
                  id="email"
                  placeholder="Ingresa tu identificación"
                  name="email"
                  type="email"
                  variant="standard"
                  margin="normal"
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <InputTitles>Nombre</InputTitles>
                <MuiTextField
                  id="email"
                  placeholder="Ingresa tu nombre"
                  name="email"
                  type="email"
                  variant="standard"
                  margin="normal"
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <InputTitles>Apellido</InputTitles>
                <MuiTextField
                  id="email"
                  placeholder="Ingresa tu apellido"
                  name="email"
                  type="email"
                  variant="standard"
                  margin="normal"
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <InputTitles>Dirección</InputTitles>
                <MuiTextField
                  id="email"
                  placeholder="Ingresa tu dirección"
                  name="email"
                  type="email"
                  variant="standard"
                  margin="normal"
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <InputTitles>Email</InputTitles>
                <MuiTextField
                  id="email"
                  placeholder="Ingresa tu email"
                  name="email"
                  type="email"
                  variant="standard"
                  margin="normal"
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <InputTitles>Número de teléfono</InputTitles>
                <MuiTextField
                  id="email"
                  placeholder="Ingresa tu número de teléfono"
                  name="email"
                  type="email"
                  variant="standard"
                  margin="normal"
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <InputTitles marginBottom={3}>Ciudad</InputTitles>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={top100Films}
                    color="#5EA3A3"
                    popupIcon={
                      <KeyboardArrowDownIcon sx={{ color: "#5EA3A3" }} />
                    }
                    clearIcon={<Clear sx={{ color: "#5EA3A3" }} />}
                    renderInput={(params) => (
                      <MuiTextField
                        variant="standard"
                        {...params}
                        placeholder="Tipo de identificación"
                        InputProps={{
                          ...params.InputProps,
                          disableUnderline: true,
                        }}
                      />
                    )}
                  />
                </Box>
              </Grid>
            </Grid>
            <MuiButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              <Typography fontFamily="Montserrat" fontWeight="bold">
                Registrarse
              </Typography>
            </MuiButton>
          </Box>
        </Box>
      </Container>
                      </ThemeProvider> */
  );
};
