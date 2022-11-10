// React
import { useEffect, useState } from "react"

// MUI
import { Grid, Switch, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

// Components
import Header from "@components/header"
import AccountSelect from "@components/selects/accountSelect"
import AccountTypeSelect from "@components/selects/accountTypeSelect"
import BankSelect from "@components/selects/bankSelect"
import ClientSelect from "@components/selects/customerSelect"

import MuiButton from "@styles/buttons/button"
import MuiTextField from "@styles/fields"
import HelperText from "@styles/helperText"
import InputTitles from "@styles/inputTitles"

// Utils
import dayjs from "dayjs";

export const RefundV = ({ formik, ToastContainer }) => {

  const steps = ["Primer paso", "Segundo paso"];

  const [valueD, setValue] = useState(dayjs("2014-08-18T21:11:54"));

  const [activeStep, setActiveStep] = useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    if (formik.values.applyGM) {
      formik.setFieldValue("gmAmount", (formik.values.amount * 0.004));
    } else {
      formik.setFieldValue("gmAmount", 0);
    }
  }, [formik.values.applyGM, formik.values.amount]);

  return (
    <>
      <Grid
        container
        direction="column"
        display="flex"
        spacing={0}
        sx={
          steps[activeStep] === "Primer paso"
            ? { height: "100vh" }
            : {
                ["@media (max-height: 900px)"]: {
                  height: "100%",
                },
                ["@media (min-height: 1000px)"]: {
                  height: "100vh",
                  bgcolor: "blue",
                },
              }
        }
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
              <></>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ height: "100%", maxHeight: "100vh" }}
              style={{ background: "#EBEBEB" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Grid
                container
                direction="column"
                display="flex"
                alignItems="center"
                justifyContent="center"
                spacing={0}
                sx={{ height: "100%", maxHeight: "100vh" }}
              >
                <Grid item xs={6} sx={{ height: "100%" }}>
                  <form onSubmit={() => {}}>
                    {activeStep === 0 && (
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="left"
                      >
                        <Typography
                          letterSpacing={0}
                          fontSize="1.7rem"
                          fontWeight="regular"
                          marginBottom="4rem"
                          color="#5EA3A3"
                        >
                          {formik.values.id == ""
                            ? "Registro de Reintegro"
                            : "Modificación de Reintegro"}
                        </Typography>

                        <Box
                          display="flex"
                          mb={2}
                          flexDirection="row"
                          position="relative"
                        >
                          <ClientSelect formik={formik} customer={"Cliente"} />
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

                            {
                              <HelperText rText position="fixed">
                                {formik.touched.date && formik.errors.date}
                              </HelperText>
                            }
                          </Box>
                        </Box>

                        <Box
                          display="flex"
                          mb={1}
                          flexDirection="row"
                          position="relative"
                        >
                          <AccountSelect formik={formik} account={"Cuenta"} />
                          <Box>
                            <InputTitles
                              sx={{
                                marginBottom: "1rem",
                                marginLeft: "2.5rem",
                              }}
                            >
                              GM
                            </InputTitles>
                            <Box
                              display={"flex"}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                              width={"17.5vw"}
                              bgcolor={"#fafafa"}
                              borderRadius={"4px"}
                              border={"0.1rem solid #5EA3A380"}
                              padding={"0 7px 0 5px"}
                              marginBottom={"30px"}
                              marginLeft={"2.5rem"}
                              height={"2.25rem"}
                            >
                              <Typography
                                variant="h6"
                                fontSize="0.8vw"
                                letterSpacing={0}
                                fontWeight="regular"
                                color="#333333"
                              >
                                ¿Aplica GM?
                              </Typography>
                              <Switch
                                value={formik.values.applyGM}
                                checked={formik.values.applyGM}
                                sx={{
                                  "& .MuiSwitch-switchBase": {
                                    color: "#FFFFFF",
                                    "&.Mui-checked": {},
                                    "&.Mui-checked + .MuiSwitch-track": {
                                      backgroundColor: "#488B8F",
                                    },

                                    "&.Mui-disabled": {
                                      color: "#488B8F",
                                    },
                                    "&.Mui-disabled + .MuiSwitch-track": {
                                      backgroundColor: "#B5D1C9",
                                    },
                                  },
                                }}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    formik.setFieldValue("applyGM", true);
                                  } else {
                                    formik.setFieldValue("applyGM", false);
                                  }
                                }}
                              />
                            </Box>
                          </Box>
                        </Box>

                        <Box
                          display="flex"
                          flexDirection="row"
                          position="relative"
                        >
                          <Box>
                            <InputTitles>Monto</InputTitles>
                            <MuiTextField
                              id="amount"
                              placeholder="Ingresa un Monto"
                              name="amount"
                              type="number"
                              onChange={formik.handleChange}
                              value={formik.values.amount}
                              variant="standard"
                              margin="normal"
                              error={
                                formik.touched.amount &&
                                Boolean(formik.errors.amount)
                              }
                              InputProps={{
                                disableUnderline: true,
                                sx: {
                                  marginTop: "-5px",
                                },
                              }}
                              sx={
                                formik.touched.amount &&
                                Boolean(formik.errors.amount)
                                  ? {
                                      border: "2px solid #E6643180",
                                      "input::-webkit-outer-spin-button": {
                                        WebkitAppearance: "none",

                                        margin: 0,
                                      },

                                      "input::-webkit-inner-spin-button": {
                                        WebkitAppearance: "none",

                                        margin: 0,
                                      },
                                      marginLeft: "1.3rem",
                                      width: "16.8vw",
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
                                      width: "16.8vw",
                                    }
                              }
                            />
                          </Box>

                          <Box>
                            <InputTitles
                              sx={{
                                marginLeft: "1.3rem",
                              }}
                            >
                              Monto GM
                            </InputTitles>
                            <MuiTextField
                              id="gmAmount"
                              placeholder="Ingresa un Monto"
                              name="gmAmount"
                              type="number"
                              onChange={formik.handleChange}
                              value={formik.values.gmAmount}
                              variant="standard"
                              margin="normal"
                              fullWidth
                              disabled={true}
                              InputProps={{
                                disableUnderline: true,
                                sx: {
                                  marginTop: "-5px",
                                },
                              }}
                              sx={
                                formik.touched.amount &&
                                Boolean(formik.errors.amount)
                                  ? {
                                      border: "2px solid #E6643180",
                                      "input::-webkit-outer-spin-button": {
                                        WebkitAppearance: "none",

                                        margin: 0,
                                      },

                                      "input::-webkit-inner-spin-button": {
                                        WebkitAppearance: "none",

                                        margin: 0,
                                      },
                                      marginLeft: "1.3rem",
                                      width: "16.8vw",
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
                                      marginLeft: "1.3rem",
                                      width: "16.8vw",
                                    }
                              }
                            />
                          </Box>
                        </Box>
                      </Box>
                    )}
                    {activeStep === 1 && (
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="left"
                      >
                        <Typography
                          letterSpacing={0}
                          fontSize="1.7rem"
                          fontWeight="regular"
                          marginBottom="4rem"
                          color="#5EA3A3"
                        >
                          {formik.values.id == ""
                            ? "Registro de Reintegro - Datos Bancarios"
                            : "Modificación de Reintegro - Datos Bancarios"}
                        </Typography>

                        <Box
                          display="flex"
                          mb={3}
                          flexDirection="row"
                          position="relative"
                        >
                          <Box
                            sx={{
                              marginRight: "1.3rem",
                            }}
                          >
                            <InputTitles
                              sx={{
                                marginLeft: "1.3rem",
                              }}
                            >
                              beneficiario
                            </InputTitles>
                            <MuiTextField
                              id="beneficiary"
                              placeholder="Ingresa un beneficiario"
                              name="beneficiary"
                              type="text"
                              onChange={formik.handleChange}
                              value={formik.values.beneficiary}
                              variant="standard"
                              margin="normal"
                              fullWidth
                              error={
                                formik.touched.beneficiary &&
                                Boolean(formik.errors.beneficiary)
                              }
                              InputProps={{
                                disableUnderline: true,
                                sx: {
                                  marginTop: "-5px",
                                },
                              }}
                              sx={
                                formik.touched.amount &&
                                Boolean(formik.errors.beneficiary)
                                  ? {
                                      border: "2px solid #E6643180",
                                      "input::-webkit-outer-spin-button": {
                                        WebkitAppearance: "none",

                                        margin: 0,
                                      },

                                      "input::-webkit-inner-spin-button": {
                                        WebkitAppearance: "none",

                                        margin: 0,
                                      },
                                      marginLeft: "1.3rem",
                                      width: "16.8vw",
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
                                      marginLeft: "1.3rem",
                                      width: "16.8vw",
                                    }
                              }
                            />
                          </Box>

                          <BankSelect formik={formik} />
                        </Box>
                        <Box
                          display="flex"
                          mb={1.2}
                          ml={2.5}
                          flexDirection="row"
                          position="relative"
                        >
                          <AccountTypeSelect formik={formik} />

                          <Box
                            sx={{
                              marginLeft: "1.3rem",
                              width: "16.8vw",
                            }}
                          >
                            <InputTitles
                              sx={{
                                marginLeft: "1.3rem",
                              }}
                            >
                              Número de Cuenta
                            </InputTitles>
                            <MuiTextField
                              id="accountNumber"
                              placeholder="Ingresa un numero de cuenta"
                              name="accountNumber"
                              type="text"
                              onChange={formik.handleChange}
                              value={formik.values.accountNumber}
                              variant="standard"
                              margin="normal"
                              fullWidth
                              error={
                                formik.touched.accountNumber &&
                                Boolean(formik.errors.accountNumber)
                              }
                              InputProps={{
                                disableUnderline: true,
                                sx: {
                                  marginTop: "-5px",
                                },
                              }}
                              sx={
                                formik.touched.amount &&
                                Boolean(formik.errors.beneficiary)
                                  ? {
                                      border: "2px solid #E6643180",
                                      "input::-webkit-outer-spin-button": {
                                        WebkitAppearance: "none",

                                        margin: 0,
                                      },

                                      "input::-webkit-inner-spin-button": {
                                        WebkitAppearance: "none",

                                        margin: 0,
                                      },
                                      marginLeft: "1.3rem",
                                      width: "16.8vw",
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
                                      marginLeft: "1.3rem",
                                      width: "16.8vw",
                                    }
                              }
                            />
                          </Box>
                        </Box>

                        <Box
                          display="flex"
                          mb={6}
                          ml={2.5}
                          flexDirection="row"
                          position="relative"
                        >
                          <Box sx={{}}>
                            <InputTitles sx={{}}>Observaciones</InputTitles>
                            <MuiTextField
                              id="observations"
                              placeholder="Ingresa una observación"
                              name="observations"
                              type="text"
                              onChange={formik.handleChange}
                              value={formik.values.observations}
                              variant="standard"
                              margin="normal"
                              fullWidth
                              error={
                                formik.touched.observations &&
                                Boolean(formik.errors.observations)
                              }
                              InputProps={{
                                disableUnderline: true,
                                sx: {
                                  marginTop: "-5px",
                                },
                              }}
                              sx={
                                formik.touched.observations &&
                                Boolean(formik.errors.observations)
                                  ? {
                                      border: "2px solid #E6643180",
                                      "input::-webkit-outer-spin-button": {
                                        WebkitAppearance: "none",

                                        margin: 0,
                                      },

                                      "input::-webkit-inner-spin-button": {
                                        WebkitAppearance: "none",

                                        margin: 0,
                                      },
                                      width: "36vw",
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
                                      width: "36vw",
                                    }
                              }
                            />
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </form>
                </Grid>
                <Grid
                  item
                  xs={2}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  width="100%"
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        ml: "8rem",
                      }}
                    >
                      <MuiButton
                        variant="contained"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{
                          mb: 2,
                          boxShadow: "none",
                          borderRadius: "4px",
                        }}
                      >
                        <Typography
                          fontFamily="icomoon"
                          sx={{
                            color: "#fff",
                            mr: 2,
                            fontSize: "medium",
                            transform: "rotate(180deg)",
                          }}
                        >
                          &#xe91f;
                        </Typography>
                        <Typography fontSize="90%" fontWeight="bold">
                          Atrás
                        </Typography>
                      </MuiButton>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        mr: "7rem",
                      }}
                    >
                      {activeStep === steps.length - 1 ? (
                        <MuiButton
                          type="submit"
                          variant="contained"
                          onClick={formik.handleSubmit}
                          sx={{
                            mb: 2,
                            boxShadow: "none",
                            borderRadius: "4px",
                          }}
                        >
                          <Typography fontSize="90%" fontWeight="bold">
                            {formik.values.id === "" ? "Registrar" : "Modificar"}
                          </Typography>
                          <Typography
                            fontFamily="icomoon"
                            sx={{
                              color: "#fff",
                              ml: 2,
                              fontSize: "medium",
                            }}
                          >
                            &#xe91f;
                          </Typography>
                        </MuiButton>
                      ) : (
                        <MuiButton
                          onClick={handleNext}
                          sx={{
                            mb: 2,
                            boxShadow: "none",
                            borderRadius: "4px",
                          }}
                        >
                          <Typography
                            fontSize="90%"
                            fontWeight="bold"
                            color="#fff"
                          >
                            Siguiente
                          </Typography>

                          <Typography
                            fontFamily="icomoon"
                            sx={{
                              color: "#fff",
                              ml: 2,
                              fontSize: "medium",
                            }}
                          >
                            &#xe91f;
                          </Typography>
                        </MuiButton>
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ToastContainer
        position="top-right"
        autoClose={2000}
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
