import { useState } from "react";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Grid, Typography } from "@mui/material/";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Header from "@components/header";
import AccountSelect from "@components/selects/accountSelect";
import ClientSelect from "@components/selects/customerSelect";

import MuiButton from "@styles/button";
import MuiTextField from "@styles/fields";
import HelperText from "@styles/helperText";
import InputTitles from "@styles/inputTitles";

import dayjs from "dayjs";

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
            ></Grid>
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
                    <Typography fontSize="90%" fontWeight="bold">
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
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
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
