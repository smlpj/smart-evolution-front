//React imports
import { useEffect, useState } from "react";

import Link from "next/link";
//Next imports
import { useRouter } from "next/router";

//Material UI imports
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

//Custom imports
import Header from "@components/header";

import { useFetch } from "@hooks/useFetch";

import BackButton from "@styles/buttons/BackButton";
import { FinancialStatInput } from "@styles/financialStatInput";
import InputTitles from "@styles/inputTitles";
import scrollSx from "@styles/scroll";

import TypeForeignCurrencyAccountStep from "@views/self-management/Steps/LegalSteps/TypeForeignCurrencyAccountStep";

//Queries imports
import { GetCustomerById } from "./queries";

export const FinancialStat = ({ formik }) => {
  //Get ID from URL
  const {
    fetch: fetch,
    loading: loading,
    error: error,
    data: data,
  } = useFetch({ service: GetCustomerById, init: false });

  const [id, setID] = useState("");
  const [results, setResults] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (router && router.query) {
      setID(router.query.id);
    }
  }, [router.query]);

  useEffect(() => {
    if (id) {
      fetch(id);
    }
  }, [id]);

  const addListeners = (e) => {
    const NetCXCFirstPeriod = document.getElementById("net_cxc-first_period");
    NetCXCFirstPeriod.addEventListener(
      "DOMCharacterDataModified",
      handleResultChange
    );
    const NetCXCSecondPeriod = document.getElementById("net_cxc-second_period");
    NetCXCSecondPeriod.addEventListener(
      "DOMCharacterDataModified",
      handleResultChange
    );
    const NetCXCThirdPeriod = document.getElementById("net_cxc-third_period");
    NetCXCThirdPeriod.addEventListener(
      "DOMCharacterDataModified",
      handleResultChange
    );
    const TotalInventory = document.getElementById(
      "total_inventory-first_period"
    );
    TotalInventory.addEventListener(
      "DOMCharacterDataModified",
      handleResultChange
    );
  };

  useEffect(() => {
    addListeners();
  }, []);

  const handleFieldChange = (e) => {
    const [field, period] = e.target.id.split("-");

    formik.setFieldValue(period, {
      ...formik.values[period],
      [e.target.name]: {
        ...formik.values[period][e.target.name],
        [field]: e.target.value ? parseFloat(e.target.value) : 0,
      },
    });
  };

  useEffect(() => {
    if (results["net_cxc-first_period"]) {
      const [field, period] = "net_cxc-first_period".split("-");
      formik.setFieldValue(period, {
        ...formik.values[period],
        assets: {
          ...formik.values[period].assets,
          [field]: parseFloat(results["net_cxc-first_period"]),
        },
      });
    }

    return () => {};
  }, [results]);
  useEffect(() => {
    if (results["net_cxc-second_period"]) {
      const [field, period] = "net_cxc-second_period".split("-");
      formik.setFieldValue(period, {
        ...formik.values[period],
        assets: {
          ...formik.values[period].assets,
          [field]: parseFloat(results["net_cxc-second_period"]),
        },
      });
    }

    return () => {};
  }, [results]);
  useEffect(() => {
    if (results["net_cxc-third_period"]) {
      const [field, period] = "net_cxc-third_period".split("-");
      formik.setFieldValue(period, {
        ...formik.values[period],
        assets: {
          ...formik.values[period].assets,
          [field]: parseFloat(results["net_cxc-third_period"]),
        },
      });
    }

    return () => {};
  }, [results]);
  useEffect(() => {
    if (results["total_inventory-first_period"]) {
      const [field, period] = "total_inventory-first_period".split("-");
      formik.setFieldValue(period, {
        ...formik.values[period],
        assets: {
          ...formik.values[period].assets,
          [field]: parseFloat(results["total_inventory-first_period"]),
        },
      });
    }

    return () => {};
  }, [results]);

  const handleResultChange = (e) => {
    setResults({
      ...results,
      [e.target.parentNode.id]: e.target.parentNode.attributes.value.value,
    });
  };

  return (
    <>
      <Grid
        container
        direction="column"
        sx={{
          height: "100vh",
        }}
      >
        <Grid item xs={1}>
          <Header />
        </Grid>
        <Grid item xs margin="1% 5%">
          <Box display="flex" flexDirection="row">
            <BackButton path={`/financialProfile?id=${id}`} />
            <Typography
              letterSpacing={0}
              fontSize="1.2vw"
              fontWeight="500"
              color="#488B8F"
              marginLeft="3%"
            >
              Estado de situación financiera
            </Typography>
            <Box flexGrow={1} />
            <Link href={`/financialProfile/financialStatement/?=${id}`}>
              <Button
                variant="standard"
                color="primary"
                size="large"
                sx={{
                  height: "2.6rem",
                  backgroundColor: "transparent",
                  border: "1.4px solid #63595C",
                  borderRadius: "4px",
                }}
              >
                <Typography
                  letterSpacing={0}
                  fontSize="80%"
                  fontWeight="bold"
                  color="#63595C"
                >
                  Visualizar indicadores
                </Typography>

                <i
                  style={{
                    color: "#63595C",
                    marginLeft: "0.7rem",
                  }}
                  class="fa-regular fa-chart-column"
                ></i>
              </Button>
            </Link>
          </Box>
          <Box display="flex" flexDirection="row" marginTop="1%">
            <Box display="flex" flexDirection="column">
              <InputTitles marginBottom={1}>N° Identificación</InputTitles>
              <Typography
                letterSpacing={0}
                fontSize="1.042vw"
                fontWeight="medium"
                color="#333333"
              >
                {data?.data?.document_number}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" marginLeft="3%">
              <InputTitles marginBottom={1}>Cliente</InputTitles>
              <Typography
                letterSpacing={0}
                fontSize="1.042vw"
                fontWeight="medium"
                color="#333333"
              >
                {`${data?.data?.first_name ?? ""} ${
                  data?.data?.last_name ?? ""
                } ${data?.data?.social_reason ?? ""}`}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" marginLeft="3%">
              <InputTitles marginBottom={1}>CORREO ELECTRÓNICO</InputTitles>
              <Typography
                letterSpacing={0}
                fontSize="1.042vw"
                fontWeight="medium"
                color="#333333"
              >
                {data?.data?.email ?? ""}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" marginLeft="3%">
              <InputTitles marginBottom={1}>PERFIL DE RIESGO</InputTitles>

              {data?.data?.riskProfile === null && (
                <Link href={`/riskProfile?id=${id}`} underline="none">
                  <Button
                    variant="standard"
                    sx={{
                      backgroundColor: "#488B8F",
                      color: "#FFFFFF",
                      textTransform: "none",
                      borderRadius: "4px",
                      width: "40%",

                      "&:hover": { backgroundColor: "#5EA3A3" },
                    }}
                  >
                    <Typography
                      fontSize="0.7vw"
                      fontWeight="bold"
                      color="#FFFFFF"
                      textTransform="uppercase"
                    >
                      Cargar
                    </Typography>
                  </Button>
                </Link>
              )}

              {data?.data?.risk_profile === 0 && (
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  textAlign="center"
                  alignItems="center"
                  padding="3% 8%"
                  borderRadius="4px"
                  backgroundColor="#488B8F"
                >
                  <Image
                    src="/assets/Icon - Perfil de riesgo - Desconocido.svg"
                    width={30}
                    height={30}
                  />
                  <Typography
                    fontSize="0.7vw"
                    width="100%"
                    fontWeight="bold"
                    color="#FFFFFF"
                    textTransform="uppercase"
                  >
                    Desconocido
                  </Typography>
                </Box>
              )}
              {data?.data?.riskProfile === 1 && (
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  textAlign="center"
                  alignItems="center"
                  padding="3% 8%"
                  borderRadius="4px"
                  backgroundColor="#488B8F"
                >
                  <Image
                    src="/assets/Icon - Perfil de riesgo - Bajo.svg"
                    width={30}
                    height={30}
                  />
                  <Typography
                    fontSize="0.7vw"
                    width="100%"
                    fontWeight="bold"
                    color="#FFFFFF"
                    textTransform="uppercase"
                  >
                    Riesgo bajo
                  </Typography>
                </Box>
              )}
              {data?.data?.risk_profile === 2 && (
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  textAlign="center"
                  alignItems="center"
                  padding="3% 8%"
                  borderRadius="4px"
                  backgroundColor="#488B8F"
                >
                  <Image
                    src="/assets/Icon - Perfil de riesgo - Medio.svg"
                    width={30}
                    height={30}
                  />
                  <Typography
                    fontSize="0.7vw"
                    width="100%"
                    fontWeight="bold"
                    color="#FFFFFF"
                    textTransform="uppercase"
                  >
                    Riesgo medio
                  </Typography>
                </Box>
              )}
              {data?.data?.risk_profile === 3 && (
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  textAlign="center"
                  alignItems="center"
                  padding="3% 8%"
                  borderRadius="4px"
                  backgroundColor="#488B8F"
                >
                  <Image
                    src="/assets/Icon - Perfil de riesgo - Alto.svg"
                    width={30}
                    height={30}
                  />
                  <Typography
                    fontSize="0.7vw"
                    width="100%"
                    fontWeight="bold"
                    color="#FFFFFF"
                    textTransform="uppercase"
                  >
                    Riesgo alto
                  </Typography>
                </Box>
              )}
            </Box>

            <Box flexGrow={1} />
            <Button
              variant="standard"
              color="primary"
              size="large"
              onClick={() => {
                /* formik.handleSubmit(); */
                console.log(formik.values);
              }}
              sx={{
                height: "2.6rem",
                backgroundColor: "transparent",
                border: "1.4px solid #63595C",
                borderRadius: "4px",
              }}
            >
              <Typography
                letterSpacing={0}
                fontSize="80%"
                fontWeight="bold"
                color="#63595C"
              >
                Descargar indicadores
              </Typography>

              <i
                style={{
                  color: "#63595C",
                  marginLeft: "0.7rem",
                }}
                class="fa-regular fa-download"
              ></i>
            </Button>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            marginTop="2%"
            borderTop="2px solid #A1A1A1"
            paddingTop="2%"
            sx={{
              ...scrollSx,
              height: "65vh",
              width: "100%",
              ["@media (max-height: 850px)"]: {
                height: "56vh",
              },
            }}
          >
            <Box display="flex" flexDirection="column">
              <Box display="flex" flexDirection="row" width="100%">
                <Box width="15%" />
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                  borderBottom="2px solid #488B8F"
                  pb="1%"
                >
                  <Typography
                    letterSpacing={0}
                    fontSize="1.7vw"
                    fontWeight="500"
                    color="#488B8F"
                  >
                    Ene-Dic 2021
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                  borderBottom="2px solid #488B8F"
                  pb="1%"
                >
                  <Typography
                    letterSpacing={0}
                    fontSize="1.7vw"
                    fontWeight="500"
                    color="#488B8F"
                  >
                    Ene-Dic 2020
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                  borderBottom="2px solid #488B8F"
                  pb="1%"
                >
                  <Typography
                    letterSpacing={0}
                    fontSize="1.7vw"
                    fontWeight="500"
                    color="#488B8F"
                  >
                    Ene-Dic 2019
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                mt="1%"
                alignItems="center"
              >
                <Box width="15%">
                  <Typography
                    letterSpacing={0}
                    fontSize="1.85vw"
                    fontWeight="500"
                    color="#333333"
                  >
                    Activos
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                  justifyContent="flex-end"
                >
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    Variación<br></br>vertical
                  </InputTitles>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                  justifyContent="flex-end"
                >
                  <InputTitles marginRight="5%" sx={{ fontSize: "0.7vw" }}>
                    Variación<br></br>vertical
                  </InputTitles>
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    Variación<br></br>horizontal
                  </InputTitles>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                  justifyContent="flex-end"
                >
                  <InputTitles marginRight="5%" sx={{ fontSize: "0.7vw" }}>
                    Variación<br></br>vertical
                  </InputTitles>
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    Variación<br></br>horizontal
                  </InputTitles>
                </Box>
              </Box>
              {/* Primera sección Activos */}
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                mt="1%"
                alignItems="center"
              >
                <Box width="15%">
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    CAJA E INVERSIONES TOTALES
                  </InputTitles>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="cash_and_investments-first_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "80%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    value={100}
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "15%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="cash_and_investments-second_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="cash_and_investments-third_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                mt="1%"
                alignItems="center"
              >
                <Box width="15%">
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    CARTERA CLIENTES
                  </InputTitles>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="clients_wallet-first_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "80%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    value={100}
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "15%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="clients_wallet-second_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="clients_wallet-third_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                mt="1%"
                alignItems="center"
              >
                <Box width="15%">
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    CXC SOCIOS
                  </InputTitles>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="cxc_partners-first_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "80%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    value={100}
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "15%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="cxc_partners-second_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="cxc_partners-third_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                mt="1%"
                alignItems="center"
              >
                <Box width="15%">
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    OTRAS CXC
                  </InputTitles>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="other_cxc-first_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "80%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    value={100}
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "15%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="other_cxc-second_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="other_cxc-third_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                height="100%"
                mt="1%"
                alignItems="center"
                bgcolor="#CFDDDD"
              >
                <Box
                  width="18%"
                  display="flex"
                  bgcolor="#EBEBEB"
                  alignItems="center"
                  height="100%"
                >
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    CXC NETOS
                  </InputTitles>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="0%"
                  padding="10px 0px"
                >
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="5%"
                    width="70%"
                    value={
                      (formik.values.first_period.assets.clients_wallet ?? 0) +
                      (formik.values.first_period.assets.cxc_partners ?? 0) +
                      (formik.values.first_period.assets.other_cxc ?? 0)
                    }
                    id="net_cxc-first_period"
                  >
                    {`$ ${
                      (formik.values.first_period.assets.clients_wallet ?? 0) +
                      (formik.values.first_period.assets.cxc_partners ?? 0) +
                      (formik.values.first_period.assets.other_cxc ?? 0)
                    }`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    23%
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                  padding="10px 0px"
                >
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="5%"
                    width="45%"
                    value={
                      (formik.values.second_period.assets.clients_wallet ?? 0) +
                      (formik.values.second_period.assets.cxc_partners ?? 0) +
                      (formik.values.second_period.assets.other_cxc ?? 0)
                    }
                    id="net_cxc-second_period"
                  >
                    {`$ ${
                      (formik.values.second_period.assets.clients_wallet ?? 0) +
                      (formik.values.second_period.assets.cxc_partners ?? 0) +
                      (formik.values.second_period.assets.other_cxc ?? 0)
                    }`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    23%
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    23%
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                  padding="10px 0px"
                >
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="5%"
                    width="45%"
                    value={
                      (formik.values.third_period.assets.clients_wallet ?? 0) +
                      (formik.values.third_period.assets.cxc_partners ?? 0) +
                      (formik.values.third_period.assets.other_cxc ?? 0)
                    }
                    id="net_cxc-third_period"
                  >
                    {`$ ${
                      (formik.values.third_period.assets.clients_wallet ?? 0) +
                      (formik.values.third_period.assets.cxc_partners ?? 0) +
                      (formik.values.third_period.assets.other_cxc ?? 0)
                    }`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    23%
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    23%
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="row"
                width="100%"
                padding="10px 0px"
                mt="1%"
              >
                <Box width="18%">
                  <Divider
                    sx={{
                      borderBottomWidth: "1.4px",
                      borderColor: "#575757",
                      opacity: "0.5",
                    }}
                  />
                </Box>
                <Box width="calc(76% / 3)">
                  <Divider
                    sx={{
                      borderBottomWidth: "1.4px",
                      borderColor: "#575757",
                      opacity: "0.5",
                    }}
                  />
                </Box>
                <Box width="calc(76% / 3)" ml="3%">
                  <Divider
                    sx={{
                      borderBottomWidth: "1.4px",
                      borderColor: "#575757",
                      opacity: "0.5",
                    }}
                  />
                </Box>
                <Box width="calc(76% / 3)" ml="3%">
                  <Divider
                    sx={{
                      borderBottomWidth: "1.4px",
                      borderColor: "#575757",
                      opacity: "0.5",
                    }}
                  />
                </Box>
              </Box>
              {/* Segunda sección Activos */}
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                mt="1%"
                alignItems="center"
              >
                <Box width="15%">
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    MATERIA PRIMA Y OTROS
                  </InputTitles>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="raw_material_and_others-first_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "80%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    value={100}
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "15%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="raw_material_and_others-second_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="raw_material_and_others-third_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                mt="1%"
                alignItems="center"
              >
                <Box width="15%">
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    PRODUCTOS TERMINADO
                  </InputTitles>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="products_finished-first_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "80%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    value={100}
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "15%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="products_finished-second_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="products_finished-third_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                height="100%"
                mt="1%"
                alignItems="center"
                bgcolor="#CFDDDD"
              >
                <Box
                  width="18%"
                  display="flex"
                  bgcolor="#EBEBEB"
                  alignItems="center"
                  height="100%"
                >
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    INVENTARIO TOTAL
                  </InputTitles>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="0%"
                  padding="10px 0px"
                >
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="5%"
                    width="70%"
                    value={
                      (formik.values.first_period.assets
                        .raw_material_and_others ?? 0) +
                      (formik.values.first_period.assets.products_finished ?? 0)
                    }
                    id="total_inventory-first_period"
                  >
                    {`$ ${
                      (formik.values.first_period.assets
                        .raw_material_and_others ?? 0) +
                      (formik.values.first_period.assets.products_finished ?? 0)
                    }`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    23%
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                  padding="10px 0px"
                >
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="5%"
                    width="45%"
                    value={
                      (formik.values.second_period.assets.clients_wallet ?? 0) +
                      (formik.values.second_period.assets.cxc_partners ?? 0) +
                      (formik.values.second_period.assets.other_cxc ?? 0)
                    }
                    id="net_cxc-second_period"
                  >
                    {`$ ${
                      (formik.values.second_period.assets.clients_wallet ?? 0) +
                      (formik.values.second_period.assets.cxc_partners ?? 0) +
                      (formik.values.second_period.assets.other_cxc ?? 0)
                    }`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    23%
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    23%
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                  padding="10px 0px"
                >
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="5%"
                    width="45%"
                    value={
                      (formik.values.third_period.assets.clients_wallet ?? 0) +
                      (formik.values.third_period.assets.cxc_partners ?? 0) +
                      (formik.values.third_period.assets.other_cxc ?? 0)
                    }
                    id="net_cxc-third_period"
                  >
                    {`$ ${
                      (formik.values.third_period.assets.clients_wallet ?? 0) +
                      (formik.values.third_period.assets.cxc_partners ?? 0) +
                      (formik.values.third_period.assets.other_cxc ?? 0)
                    }`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    23%
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    23%
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="row"
                width="100%"
                padding="10px 0px"
                mt="1%"
              >
                <Box width="18%">
                  <Divider
                    sx={{
                      borderBottomWidth: "1.4px",
                      borderColor: "#575757",
                      opacity: "0.5",
                    }}
                  />
                </Box>
                <Box width="calc(76% / 3)">
                  <Divider
                    sx={{
                      borderBottomWidth: "1.4px",
                      borderColor: "#575757",
                      opacity: "0.5",
                    }}
                  />
                </Box>
                <Box width="calc(76% / 3)" ml="3%">
                  <Divider
                    sx={{
                      borderBottomWidth: "1.4px",
                      borderColor: "#575757",
                      opacity: "0.5",
                    }}
                  />
                </Box>
                <Box width="calc(76% / 3)" ml="3%">
                  <Divider
                    sx={{
                      borderBottomWidth: "1.4px",
                      borderColor: "#575757",
                      opacity: "0.5",
                    }}
                  />
                </Box>
              </Box>
              {/* Primera sección Activos */}
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                mt="1%"
                alignItems="center"
              >
                <Box width="15%">
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    CAJA E INVERSIONES TOTALES
                  </InputTitles>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="cash_and_investments-first_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "80%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    value={100}
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "15%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="cash_and_investments-second_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="cash_and_investments-third_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                mt="1%"
                alignItems="center"
              >
                <Box width="15%">
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    CARTERA CLIENTES
                  </InputTitles>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="clients_wallet-first_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "80%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    value={100}
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "15%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="clients_wallet-second_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="clients_wallet-third_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                mt="1%"
                alignItems="center"
              >
                <Box width="15%">
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    CXC SOCIOS
                  </InputTitles>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="cxc_partners-first_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "80%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    value={100}
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "15%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="cxc_partners-second_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="cxc_partners-third_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                mt="1%"
                alignItems="center"
              >
                <Box width="15%">
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    OTRAS CXC
                  </InputTitles>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="other_cxc-first_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "80%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    value={100}
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "15%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="other_cxc-second_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="other_cxc-third_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                height="100%"
                mt="1%"
                alignItems="center"
                bgcolor="#CFDDDD"
              >
                <Box
                  width="18%"
                  display="flex"
                  bgcolor="#EBEBEB"
                  alignItems="center"
                  height="100%"
                >
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    CXC NETOS
                  </InputTitles>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="0%"
                  padding="10px 0px"
                >
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="5%"
                    width="70%"
                    value={
                      (formik.values.first_period.assets.clients_wallet ?? 0) +
                      (formik.values.first_period.assets.cxc_partners ?? 0) +
                      (formik.values.first_period.assets.other_cxc ?? 0)
                    }
                    id="net_cxc-first_period"
                  >
                    {`$ ${
                      (formik.values.first_period.assets.clients_wallet ?? 0) +
                      (formik.values.first_period.assets.cxc_partners ?? 0) +
                      (formik.values.first_period.assets.other_cxc ?? 0)
                    }`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    23%
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                  padding="10px 0px"
                >
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="5%"
                    width="45%"
                    value={
                      (formik.values.second_period.assets.clients_wallet ?? 0) +
                      (formik.values.second_period.assets.cxc_partners ?? 0) +
                      (formik.values.second_period.assets.other_cxc ?? 0)
                    }
                    id="net_cxc-second_period"
                  >
                    {`$ ${
                      (formik.values.second_period.assets.clients_wallet ?? 0) +
                      (formik.values.second_period.assets.cxc_partners ?? 0) +
                      (formik.values.second_period.assets.other_cxc ?? 0)
                    }`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    23%
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    23%
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                  padding="10px 0px"
                >
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="5%"
                    width="45%"
                    value={
                      (formik.values.third_period.assets.clients_wallet ?? 0) +
                      (formik.values.third_period.assets.cxc_partners ?? 0) +
                      (formik.values.third_period.assets.other_cxc ?? 0)
                    }
                    id="net_cxc-third_period"
                  >
                    {`$ ${
                      (formik.values.third_period.assets.clients_wallet ?? 0) +
                      (formik.values.third_period.assets.cxc_partners ?? 0) +
                      (formik.values.third_period.assets.other_cxc ?? 0)
                    }`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    23%
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    23%
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="row"
                width="100%"
                padding="10px 0px"
                mt="1%"
              >
                <Box width="18%">
                  <Divider
                    sx={{
                      borderBottomWidth: "1.4px",
                      borderColor: "#575757",
                      opacity: "0.5",
                    }}
                  />
                </Box>
                <Box width="calc(76% / 3)">
                  <Divider
                    sx={{
                      borderBottomWidth: "1.4px",
                      borderColor: "#575757",
                      opacity: "0.5",
                    }}
                  />
                </Box>
                <Box width="calc(76% / 3)" ml="3%">
                  <Divider
                    sx={{
                      borderBottomWidth: "1.4px",
                      borderColor: "#575757",
                      opacity: "0.5",
                    }}
                  />
                </Box>
                <Box width="calc(76% / 3)" ml="3%">
                  <Divider
                    sx={{
                      borderBottomWidth: "1.4px",
                      borderColor: "#575757",
                      opacity: "0.5",
                    }}
                  />
                </Box>
              </Box>
              {/* Primera sección Activos */}
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                mt="1%"
                alignItems="center"
              >
                <Box width="15%">
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    CAJA E INVERSIONES TOTALES
                  </InputTitles>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="cash_and_investments-first_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "80%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    value={100}
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "15%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="cash_and_investments-second_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="cash_and_investments-third_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                mt="1%"
                alignItems="center"
              >
                <Box width="15%">
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    CARTERA CLIENTES
                  </InputTitles>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="clients_wallet-first_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "80%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    value={100}
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "15%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="clients_wallet-second_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="clients_wallet-third_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                mt="1%"
                alignItems="center"
              >
                <Box width="15%">
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    CXC SOCIOS
                  </InputTitles>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="cxc_partners-first_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "80%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    value={100}
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "15%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="cxc_partners-second_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="cxc_partners-third_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                mt="1%"
                alignItems="center"
              >
                <Box width="15%">
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    OTRAS CXC
                  </InputTitles>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="other_cxc-first_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "80%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    value={100}
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "15%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="other_cxc-second_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="other_cxc-third_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                height="100%"
                mt="1%"
                alignItems="center"
                bgcolor="#CFDDDD"
              >
                <Box
                  width="18%"
                  display="flex"
                  bgcolor="#EBEBEB"
                  alignItems="center"
                  height="100%"
                >
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    CXC NETOS
                  </InputTitles>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="0%"
                  padding="10px 0px"
                >
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="5%"
                    width="70%"
                    value={
                      (formik.values.first_period.assets.clients_wallet ?? 0) +
                      (formik.values.first_period.assets.cxc_partners ?? 0) +
                      (formik.values.first_period.assets.other_cxc ?? 0)
                    }
                    id="net_cxc-first_period"
                  >
                    {`$ ${
                      (formik.values.first_period.assets.clients_wallet ?? 0) +
                      (formik.values.first_period.assets.cxc_partners ?? 0) +
                      (formik.values.first_period.assets.other_cxc ?? 0)
                    }`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    23%
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                  padding="10px 0px"
                >
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="5%"
                    width="45%"
                    value={
                      (formik.values.second_period.assets.clients_wallet ?? 0) +
                      (formik.values.second_period.assets.cxc_partners ?? 0) +
                      (formik.values.second_period.assets.other_cxc ?? 0)
                    }
                    id="net_cxc-second_period"
                  >
                    {`$ ${
                      (formik.values.second_period.assets.clients_wallet ?? 0) +
                      (formik.values.second_period.assets.cxc_partners ?? 0) +
                      (formik.values.second_period.assets.other_cxc ?? 0)
                    }`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    23%
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    23%
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                  padding="10px 0px"
                >
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="5%"
                    width="45%"
                    value={
                      (formik.values.third_period.assets.clients_wallet ?? 0) +
                      (formik.values.third_period.assets.cxc_partners ?? 0) +
                      (formik.values.third_period.assets.other_cxc ?? 0)
                    }
                    id="net_cxc-third_period"
                  >
                    {`$ ${
                      (formik.values.third_period.assets.clients_wallet ?? 0) +
                      (formik.values.third_period.assets.cxc_partners ?? 0) +
                      (formik.values.third_period.assets.other_cxc ?? 0)
                    }`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    23%
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    23%
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="row"
                width="100%"
                padding="10px 0px"
                mt="1%"
              >
                <Box width="18%">
                  <Divider
                    sx={{
                      borderBottomWidth: "1.4px",
                      borderColor: "#575757",
                      opacity: "0.5",
                    }}
                  />
                </Box>
                <Box width="calc(76% / 3)">
                  <Divider
                    sx={{
                      borderBottomWidth: "1.4px",
                      borderColor: "#575757",
                      opacity: "0.5",
                    }}
                  />
                </Box>
                <Box width="calc(76% / 3)" ml="3%">
                  <Divider
                    sx={{
                      borderBottomWidth: "1.4px",
                      borderColor: "#575757",
                      opacity: "0.5",
                    }}
                  />
                </Box>
                <Box width="calc(76% / 3)" ml="3%">
                  <Divider
                    sx={{
                      borderBottomWidth: "1.4px",
                      borderColor: "#575757",
                      opacity: "0.5",
                    }}
                  />
                </Box>
              </Box>
              {/* Primera sección Activos */}
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                mt="1%"
                alignItems="center"
              >
                <Box width="15%">
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    CAJA E INVERSIONES TOTALES
                  </InputTitles>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="cash_and_investments-first_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "80%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    value={100}
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "15%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="cash_and_investments-second_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="cash_and_investments-third_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                mt="1%"
                alignItems="center"
              >
                <Box width="15%">
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    CARTERA CLIENTES
                  </InputTitles>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="clients_wallet-first_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "80%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    value={100}
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "15%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="clients_wallet-second_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="clients_wallet-third_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                mt="1%"
                alignItems="center"
              >
                <Box width="15%">
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    CXC SOCIOS
                  </InputTitles>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="cxc_partners-first_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "80%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    value={100}
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "15%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="cxc_partners-second_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="cxc_partners-third_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                mt="1%"
                alignItems="center"
              >
                <Box width="15%">
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    OTRAS CXC
                  </InputTitles>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="other_cxc-first_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "80%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    value={100}
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "15%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="other_cxc-second_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="other_cxc-third_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                height="100%"
                mt="1%"
                alignItems="center"
                bgcolor="#CFDDDD"
              >
                <Box
                  width="18%"
                  display="flex"
                  bgcolor="#EBEBEB"
                  alignItems="center"
                  height="100%"
                >
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    CXC NETOS
                  </InputTitles>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="0%"
                  padding="10px 0px"
                >
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="5%"
                    width="70%"
                    value={
                      (formik.values.first_period.assets.clients_wallet ?? 0) +
                      (formik.values.first_period.assets.cxc_partners ?? 0) +
                      (formik.values.first_period.assets.other_cxc ?? 0)
                    }
                    id="net_cxc-first_period"
                  >
                    {`$ ${
                      (formik.values.first_period.assets.clients_wallet ?? 0) +
                      (formik.values.first_period.assets.cxc_partners ?? 0) +
                      (formik.values.first_period.assets.other_cxc ?? 0)
                    }`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    23%
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                  padding="10px 0px"
                >
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="5%"
                    width="45%"
                    value={
                      (formik.values.second_period.assets.clients_wallet ?? 0) +
                      (formik.values.second_period.assets.cxc_partners ?? 0) +
                      (formik.values.second_period.assets.other_cxc ?? 0)
                    }
                    id="net_cxc-second_period"
                  >
                    {`$ ${
                      (formik.values.second_period.assets.clients_wallet ?? 0) +
                      (formik.values.second_period.assets.cxc_partners ?? 0) +
                      (formik.values.second_period.assets.other_cxc ?? 0)
                    }`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    23%
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    23%
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                  padding="10px 0px"
                >
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="5%"
                    width="45%"
                    value={
                      (formik.values.third_period.assets.clients_wallet ?? 0) +
                      (formik.values.third_period.assets.cxc_partners ?? 0) +
                      (formik.values.third_period.assets.other_cxc ?? 0)
                    }
                    id="net_cxc-third_period"
                  >
                    {`$ ${
                      (formik.values.third_period.assets.clients_wallet ?? 0) +
                      (formik.values.third_period.assets.cxc_partners ?? 0) +
                      (formik.values.third_period.assets.other_cxc ?? 0)
                    }`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    23%
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    23%
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="row"
                width="100%"
                padding="10px 0px"
                mt="1%"
              >
                <Box width="18%">
                  <Divider
                    sx={{
                      borderBottomWidth: "1.4px",
                      borderColor: "#575757",
                      opacity: "0.5",
                    }}
                  />
                </Box>
                <Box width="calc(76% / 3)">
                  <Divider
                    sx={{
                      borderBottomWidth: "1.4px",
                      borderColor: "#575757",
                      opacity: "0.5",
                    }}
                  />
                </Box>
                <Box width="calc(76% / 3)" ml="3%">
                  <Divider
                    sx={{
                      borderBottomWidth: "1.4px",
                      borderColor: "#575757",
                      opacity: "0.5",
                    }}
                  />
                </Box>
                <Box width="calc(76% / 3)" ml="3%">
                  <Divider
                    sx={{
                      borderBottomWidth: "1.4px",
                      borderColor: "#575757",
                      opacity: "0.5",
                    }}
                  />
                </Box>
              </Box>
              {/* Primera sección Activos */}
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                mt="1%"
                alignItems="center"
              >
                <Box width="15%">
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    CAJA E INVERSIONES TOTALES
                  </InputTitles>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="cash_and_investments-first_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "80%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    value={100}
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "15%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="cash_and_investments-second_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="cash_and_investments-third_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                mt="1%"
                alignItems="center"
              >
                <Box width="15%">
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    CARTERA CLIENTES
                  </InputTitles>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="clients_wallet-first_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "80%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    value={100}
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "15%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="clients_wallet-second_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="clients_wallet-third_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                mt="1%"
                alignItems="center"
              >
                <Box width="15%">
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    CXC SOCIOS
                  </InputTitles>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="cxc_partners-first_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "80%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    value={100}
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "15%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="cxc_partners-second_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="cxc_partners-third_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                mt="1%"
                alignItems="center"
              >
                <Box width="15%">
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    OTRAS CXC
                  </InputTitles>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="other_cxc-first_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "80%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    value={100}
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "15%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="other_cxc-second_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                >
                  <TextField
                    placeholder="Ingrese Monto"
                    type="number"
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="other_cxc-third_period"
                    sx={{
                      ...FinancialStatInput,
                      width: "45%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                      startAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            marginRight: "0.7vw",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-dollar-sign"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "5%",
                      width: "14%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="–"
                    type="number"
                    variant="standard"
                    disabled
                    sx={{
                      ...FinancialStatInput,
                      marginLeft: "4%",
                      width: "16%",
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                        "& .Mui-disabled": {
                          "-webkit-text-fill-color": "#4A4546",
                        },
                      },
                      endAdornment: (
                        <i
                          style={{
                            color: "#5EA3A3",
                            fontSize: "1.1vw",
                          }}
                          class="fa-regular fa-percent"
                        ></i>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                height="100%"
                mt="1%"
                alignItems="center"
                bgcolor="#CFDDDD"
              >
                <Box
                  width="18%"
                  display="flex"
                  bgcolor="#EBEBEB"
                  alignItems="center"
                  height="100%"
                >
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    CXC NETOS
                  </InputTitles>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="0%"
                  padding="10px 0px"
                >
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="5%"
                    width="70%"
                    value={
                      (formik.values.first_period.assets.clients_wallet ?? 0) +
                      (formik.values.first_period.assets.cxc_partners ?? 0) +
                      (formik.values.first_period.assets.other_cxc ?? 0)
                    }
                    id="net_cxc-first_period"
                  >
                    {`$ ${
                      (formik.values.first_period.assets.clients_wallet ?? 0) +
                      (formik.values.first_period.assets.cxc_partners ?? 0) +
                      (formik.values.first_period.assets.other_cxc ?? 0)
                    }`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    23%
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                  padding="10px 0px"
                >
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="5%"
                    width="45%"
                    value={
                      (formik.values.second_period.assets.clients_wallet ?? 0) +
                      (formik.values.second_period.assets.cxc_partners ?? 0) +
                      (formik.values.second_period.assets.other_cxc ?? 0)
                    }
                    id="net_cxc-second_period"
                  >
                    {`$ ${
                      (formik.values.second_period.assets.clients_wallet ?? 0) +
                      (formik.values.second_period.assets.cxc_partners ?? 0) +
                      (formik.values.second_period.assets.other_cxc ?? 0)
                    }`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    23%
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    23%
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="calc(76% / 3)"
                  ml="3%"
                  padding="10px 0px"
                >
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="5%"
                    width="45%"
                    value={
                      (formik.values.third_period.assets.clients_wallet ?? 0) +
                      (formik.values.third_period.assets.cxc_partners ?? 0) +
                      (formik.values.third_period.assets.other_cxc ?? 0)
                    }
                    id="net_cxc-third_period"
                  >
                    {`$ ${
                      (formik.values.third_period.assets.clients_wallet ?? 0) +
                      (formik.values.third_period.assets.cxc_partners ?? 0) +
                      (formik.values.third_period.assets.other_cxc ?? 0)
                    }`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    23%
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    23%
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="row"
                width="100%"
                padding="10px 0px"
                mt="1%"
              >
                <Box width="18%">
                  <Divider
                    sx={{
                      borderBottomWidth: "1.4px",
                      borderColor: "#575757",
                      opacity: "0.5",
                    }}
                  />
                </Box>
                <Box width="calc(76% / 3)">
                  <Divider
                    sx={{
                      borderBottomWidth: "1.4px",
                      borderColor: "#575757",
                      opacity: "0.5",
                    }}
                  />
                </Box>
                <Box width="calc(76% / 3)" ml="3%">
                  <Divider
                    sx={{
                      borderBottomWidth: "1.4px",
                      borderColor: "#575757",
                      opacity: "0.5",
                    }}
                  />
                </Box>
                <Box width="calc(76% / 3)" ml="3%">
                  <Divider
                    sx={{
                      borderBottomWidth: "1.4px",
                      borderColor: "#575757",
                      opacity: "0.5",
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
