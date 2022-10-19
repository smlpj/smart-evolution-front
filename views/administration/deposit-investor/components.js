import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiTextField from "../../../styles/fields";
import Image from "next/image";
import InputTitles from "../../../styles/inputTitles";
import MuiButton from "../../../styles/button";
import Header from "../../../shared/components/header";
import HelperText from "../../../styles/helperText";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CitySelect from "../../../shared/components/selects/citySelect";
import TypeIDSelect from "../../../shared/components/selects/typeIdentitySelect";
import DepartmentSelect from "../../../shared/components/selects/departmentSelect";
import ClientSelect from "../../../shared/components/selects/customerSelect";
import AccountSelect from "../../../shared/components/selects/accountSelect";
import dayjs from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const Deposit = ({ formik, option, ToastContainer }) => {
  const [valueD, setValue] = useState(dayjs("2014-08-18T21:11:54"));
  const handleChange = (newValue) => {
    setValue(newValue);
  };
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
        <Grid item xs={1}>
          <Header />
        </Grid>
        <Grid item xs sx={{ height: "100%" }}>
          <Grid
            container
            direction="row"
            display="flex"
            spacing={0}
            sx={{ height: "100%", maxHeight: "100vh" }}
          >
            <Grid
              item
              xs={12}
              md={6}
              sx={{ height: "100%" }}
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
              sx={{ height: "100%" }}
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
                      ? "Registro de giro-inversionista"
                      : "Modificación de giro-inversionista"}
                  </Typography>
                  <Box
                    display="flex"
                    mb={6}
                    flexDirection="row"
                    position="relative"
                  >
                    <ClientSelect formik={formik} />
                    <Box ml={5} position="relative">
                      <Box width="17vw">
                        <InputTitles>Cuenta inversionista</InputTitles>
                        <AccountSelect formik={formik} />
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
                      <InputTitles>Monto operación</InputTitles>
                      <MuiTextField
                        id="amount"
                        placeholder="Ingresa monto de operación"
                        name="amount"
                        type="number"
                        variant="standard"
                        margin="normal"
                        fullWidth
                        value={formik.values.amount}
                        InputProps={{
                          disableUnderline: true,
                          sx: {
                            marginTop: "-5px",
                          },
                        }}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.amount && Boolean(formik.errors.amount)
                        }
                        sx={
                          formik.touched.amount && Boolean(formik.errors.amount)
                            ? {
                                border: "1.4px solid #E6643180",
                                "input::-webkit-outer-spin-button": {
                                  WebkitAppearance: "none",
                                  margin: 0,
                                },
                                "input::-webkit-inner-spin-button": {
                                  WebkitAppearance: "none",
                                  margin: 0,
                                },
                              }
                            : {
                                "input::-webkit-outer-spin-button": {
                                  WebkitAppearance: "none",
                                  margin: 0,
                                },
                                "input::-webkit-inner-spin-button": {
                                  WebkitAppearance: "none",
                                  margin: 0,
                                },
                              }
                        }
                      />
                      <HelperText position="fixed">
                        {formik.touched.amount && formik.errors.amount}
                      </HelperText>
                    </Box>
                    <Box ml={5} width="17vw">
                      <InputTitles>Fecha</InputTitles>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                          label="Date desktop"
                          inputFormat="MM/DD/YYYY"
                          value={valueD}
                          onChange={handleChange}
                          renderInput={(params) => (
                            <MuiTextField
                              id="date"
                              placeholder="Ingresa la fecha"
                              name="date"
                              type="date"
                              variant="standard"
                              margin="normal"
                              fullWidth
                              value={formik.values.date}
                              InputProps={{
                                disableUnderline: true,
                                sx: {
                                  marginTop: "-5px",
                                },
                              }}
                              onChange={formik.handleChange}
                              error={
                                formik.touched.date &&
                                Boolean(formik.errors.date)
                              }
                              sx={
                                formik.touched.date &&
                                Boolean(formik.errors.date)
                                  ? { border: "1.4px solid #E6643180" }
                                  : null
                              }
                            />
                          )}
                        />
                      </LocalizationProvider>

                      <HelperText position="fixed">
                        {formik.touched.date && formik.errors.date}
                      </HelperText>
                    </Box>
                  </Box>
                  <Box display="flex" flexDirection="row">
                    <Box mb={4} width="100%">
                      <InputTitles>Observaciones</InputTitles>
                      <MuiTextField
                        id="observations"
                        placeholder="Ingresa una observación"
                        name="observations"
                        type="text"
                        variant="standard"
                        margin="normal"
                        fullWidth
                        value={formik.values.observations}
                        InputProps={{
                          disableUnderline: true,
                          sx: {
                            marginTop: "-5px",
                          },
                        }}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.observations &&
                          Boolean(formik.errors.observations)
                        }
                        sx={
                          formik.touched.observations &&
                          Boolean(formik.errors.observations)
                            ? { border: "1.4px solid #E6643180" }
                            : null
                        }
                      />
                      <HelperText position="fixed">
                        {formik.touched.observations &&
                          formik.errors.observations}
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
                    sx={{
                      mt: 3,
                      mb: 2,
                      boxShadow: "none",
                      borderRadius: "4px",
                    }}
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
      </Grid>
      <ToastContainer
      position="top-right"
      autoClose={50000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
    </>
  );
};
