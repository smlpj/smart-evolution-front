import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiTextField from "../../styles/fields";
import Image from "next/image";
import InputTitles from "../../styles/inputTitles";
import MuiButton from "../../styles/button";
import Header from "../../shared/components/header";
import HelperText from "../../styles/helperText";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CitySelect from "../../shared/components/selects/citySelect";
import TypeIDSelect from "../../shared/components/selects/typeIdentitySelect";
import DepartmentSelect from "../../shared/components/selects/departmentSelect";

export const SignUpBroker = ({ formik, option }) => {
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
            <Image
              src="/assets/Ilustración - Creación de Usuario 1.svg"
              alt="clients"
              width={500}
              height={500}
              priority={true}
            />
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
                  {option === "register"
                    ? "Registro de corredores"
                    : "Modificación de corredor"}
                </Typography>
                <Box
                  display="flex"
                  mb={6}
                  flexDirection="row"
                  position="relative"
                >
                  <TypeIDSelect formik={formik} />
                  <Box ml={5} position="relative">
                    <Box width="17vw">
                      <InputTitles>Número de identificación</InputTitles>
                      <MuiTextField
                        id="document_number"
                        placeholder="Ingresa tu identificación"
                        name="document_number"
                        type="text"
                        variant="standard"
                        margin="normal"
                        fullWidth
                        value={formik.values.document_number}
                        InputProps={{
                          disableUnderline: true,
                          sx: {
                            marginTop: "-5px",
                          },
                        }}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.document_number &&
                          Boolean(formik.errors.document_number)
                        }
                        sx={
                          formik.touched.document_number &&
                          Boolean(formik.errors.document_number)
                            ? { border: "1.4px solid #E6643180" }
                            : null
                        }
                      />
                      <HelperText position="fixed">
                        {formik.touched.document_number &&
                          formik.errors.document_number}
                      </HelperText>
                    </Box>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  mb={6}
                  flexDirection="row"
                  position="relative"
                >
                  <Box width="17vw">
                    <InputTitles>Nombre</InputTitles>
                    <MuiTextField
                      id="first_name"
                      placeholder="Ingresa tu nombre"
                      name="first_name"
                      type="text"
                      variant="standard"
                      margin="normal"
                      fullWidth
                      value={formik.values.first_name}
                      InputProps={{
                        disableUnderline: true,
                        sx: {
                          marginTop: "-5px",
                        },
                      }}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.first_name &&
                        Boolean(formik.errors.first_name)
                      }
                      sx={
                        formik.touched.first_name &&
                        Boolean(formik.errors.first_name)
                          ? { border: "1.4px solid #E6643180" }
                          : null
                      }
                    />
                    <HelperText position="fixed">
                      {formik.touched.first_name && formik.errors.first_name}
                    </HelperText>
                  </Box>
                  <Box ml={5} width="17vw">
                    <InputTitles>Apellido</InputTitles>
                    <MuiTextField
                      id="last_name"
                      placeholder="Ingresa tu apellido"
                      name="last_name"
                      type="text"
                      variant="standard"
                      margin="normal"
                      fullWidth
                      value={formik.values.last_name}
                      InputProps={{
                        disableUnderline: true,
                        sx: {
                          marginTop: "-5px",
                        },
                      }}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.last_name &&
                        Boolean(formik.errors.last_name)
                      }
                      sx={
                        formik.touched.last_name &&
                        Boolean(formik.errors.last_name)
                          ? { border: "1.4px solid #E6643180" }
                          : null
                      }
                    />

                    <HelperText position="fixed">
                      {formik.touched.last_name && formik.errors.last_name}
                    </HelperText>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  mb={6}
                  flexDirection="row"
                  position="relative"
                >
                  <Box width="17vw">
                    <InputTitles>Número de teléfono</InputTitles>
                    <MuiTextField
                      id="phone_number"
                      placeholder="Ingresa tu número de teléfono"
                      name="phone_number"
                      type="tel"
                      variant="standard"
                      margin="normal"
                      fullWidth
                      value={formik.values.phone_number}
                      InputProps={{
                        disableUnderline: true,
                        sx: {
                          marginTop: "-5px",
                        },
                      }}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.phone_number &&
                        Boolean(formik.errors.phone_number)
                      }
                      sx={
                        formik.touched.phone_number &&
                        Boolean(formik.errors.phone_number)
                          ? { border: "1.4px solid #E6643180" }
                          : null
                      }
                    />
                    <HelperText position="fixed">
                      {formik.touched.phone_number &&
                        formik.errors.phone_number}
                    </HelperText>
                  </Box>
                  <Box ml={5} width="17vw">
                    <InputTitles>Email</InputTitles>
                    <MuiTextField
                      id="email"
                      placeholder="Ingresa tu email"
                      name="email"
                      type="email"
                      variant="standard"
                      margin="normal"
                      fullWidth
                      value={formik.values.email}
                      InputProps={{
                        disableUnderline: true,
                        sx: {
                          marginTop: "-5px",
                        },
                      }}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      sx={
                        formik.touched.email && Boolean(formik.errors.email)
                          ? { border: "1.4px solid #E6643180" }
                          : null
                      }
                    />
                    <HelperText position="fixed">
                      {formik.touched.email && formik.errors.email}
                    </HelperText>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  mb={6}
                  flexDirection="row"
                  position="relative"
                >
                  <DepartmentSelect formik={formik} />
                  <CitySelect formik={formik} />
                </Box>
                <Box display="flex" flexDirection="row">
                  <Box mb={4} width="100%">
                    <InputTitles>Dirección</InputTitles>
                    <MuiTextField
                      id="address"
                      placeholder="Ingresa tu dirección"
                      name="address"
                      type="text"
                      variant="standard"
                      margin="normal"
                      fullWidth
                      value={formik.values.address}
                      InputProps={{
                        disableUnderline: true,
                        sx: {
                          marginTop: "-5px",
                        },
                      }}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.address && Boolean(formik.errors.address)
                      }
                      sx={
                        formik.touched.address && Boolean(formik.errors.address)
                          ? { border: "1.4px solid #E6643180" }
                          : null
                      }
                    />
                    <HelperText position="fixed">
                      {formik.touched.address && formik.errors.address}
                    </HelperText>
                  </Box>
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
                    {option === "register" ? "Registrar" : "Modificar"}
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
  );
};
