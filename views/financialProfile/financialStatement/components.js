//React imports
import { useEffect, useState } from "react";

import Link from "next/link";
//Next imports
import { useRouter } from "next/router";

//Material UI imports
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

//Custom imports
import Header from "@components/header";

import { useFetch } from "@hooks/useFetch";

import BackButton from "@styles/buttons/BackButton";
import {
  FinancialStatInputLong,
  FinancialStatInputShort,
} from "@styles/financialStatInput";
import InputTitles from "@styles/inputTitles";
import scrollSx from "@styles/scroll";

//Queries imports
import { GetCustomerById } from "./queries";

export const FinancialStat = () => {
  //Get ID from URL
  const {
    fetch: fetch,
    loading: loading,
    error: error,
    data: data,
  } = useFetch({ service: GetCustomerById, init: false });

  const [id, setID] = useState("");
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
            flexDirection="row"
            marginTop="2%"
            borderTop="2px solid #A1A1A1"
            paddingTop="2%"
          >
            <Box display="flex" flexDirection="column">
              <Box height="2.55vw"></Box>
              <Box
                display="flex"
                flexDirection="row"
                marginTop="4%"
                paddingTop="4%"
              >
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
                marginTop="2%"
                height="0.8rem"
                padding="10px"
              >
                <InputTitles noWrap sx={{ fontSize: "0.7vw" }}>
                  CAJA E INVERSIONES TOTALES
                </InputTitles>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                marginTop="11%"
                height="0.8rem"
                padding="10px"
              >
                <InputTitles sx={{ fontSize: "0.7vw" }}>
                  CARTERA CLIENTES
                </InputTitles>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                marginTop="11%"
                height="0.8rem"
                padding="10px"
              >
                <InputTitles sx={{ fontSize: "0.7vw" }}>CXC SOCIOS</InputTitles>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                marginTop="11%"
                height="0.8rem"
                padding="10px"
              >
                <InputTitles sx={{ fontSize: "0.7vw" }}>OTRAS CXC</InputTitles>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" marginLeft="3%">
              <Typography
                letterSpacing={0}
                fontSize="1.7vw"
                fontWeight="500"
                color="#488B8F"
              >
                Ene-Dic 2021
              </Typography>
              <Box
                display="flex"
                flexDirection="row"
                marginTop="4%"
                borderTop="2px solid #488B8F"
                paddingTop="4%"
              >
                <Box width="15vw"></Box>
                <InputTitles marginLeft="3%" sx={{ fontSize: "0.6vw" }}>
                  Variación<br></br>vertical
                </InputTitles>
              </Box>
              <Box display="flex" flexDirection="row" marginTop="2%">
                <TextField
                  id="ICA"
                  placeholder="Ingrese Monto"
                  type="number"
                  variant="standard"
                  sx={{
                    ...FinancialStatInputLong,
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
                          marginRight: "0.7rem",
                        }}
                        class="fa-regular fa-dollar-sign"
                      ></i>
                    ),
                  }}
                />
                <TextField
                  id="ICA"
                  placeholder="--"
                  type="number"
                  variant="standard"
                  value={0}
                  sx={{
                    ...FinancialStatInputShort,
                    marginLeft: "3%",
                  }}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      marginTop: "-5px",
                    },
                    endAdornment: (
                      <i
                        style={{
                          color: "#5EA3A3",
                        }}
                        class="fa-regular fa-percent"
                      ></i>
                    ),
                  }}
                />
              </Box>
              <Box display="flex" flexDirection="row" marginTop="6%">
                <TextField
                  id="ICA"
                  placeholder="Ingrese Monto"
                  type="number"
                  variant="standard"
                  sx={{
                    ...FinancialStatInputLong,
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
                          marginRight: "0.7rem",
                        }}
                        class="fa-regular fa-dollar-sign"
                      ></i>
                    ),
                  }}
                />
                <TextField
                  id="ICA"
                  placeholder="--"
                  type="number"
                  variant="standard"
                  value={0}
                  sx={{
                    ...FinancialStatInputShort,
                    marginLeft: "3%",
                  }}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      marginTop: "-5px",
                    },
                    endAdornment: (
                      <i
                        style={{
                          color: "#5EA3A3",
                        }}
                        class="fa-regular fa-percent"
                      ></i>
                    ),
                  }}
                />
              </Box>
              <Box display="flex" flexDirection="row" marginTop="6%">
                <TextField
                  id="ICA"
                  placeholder="Ingrese Monto"
                  type="number"
                  variant="standard"
                  sx={{
                    ...FinancialStatInputLong,
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
                          marginRight: "0.7rem",
                        }}
                        class="fa-regular fa-dollar-sign"
                      ></i>
                    ),
                  }}
                />
                <TextField
                  id="ICA"
                  placeholder="--"
                  type="number"
                  variant="standard"
                  value={0}
                  sx={{
                    ...FinancialStatInputShort,
                    marginLeft: "3%",
                  }}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      marginTop: "-5px",
                    },
                    endAdornment: (
                      <i
                        style={{
                          color: "#5EA3A3",
                        }}
                        class="fa-regular fa-percent"
                      ></i>
                    ),
                  }}
                />
              </Box>
              <Box display="flex" flexDirection="row" marginTop="6%">
                <TextField
                  id="ICA"
                  placeholder="Ingrese Monto"
                  type="number"
                  variant="standard"
                  sx={{
                    ...FinancialStatInputLong,
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
                          marginRight: "0.7rem",
                        }}
                        class="fa-regular fa-dollar-sign"
                      ></i>
                    ),
                  }}
                />
                <TextField
                  id="ICA"
                  placeholder="--"
                  type="number"
                  variant="standard"
                  value={0}
                  sx={{
                    ...FinancialStatInputShort,
                    marginLeft: "3%",
                  }}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      marginTop: "-5px",
                    },
                    endAdornment: (
                      <i
                        style={{
                          color: "#5EA3A3",
                        }}
                        class="fa-regular fa-percent"
                      ></i>
                    ),
                  }}
                />
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" marginLeft="3%">
              <Typography
                letterSpacing={0}
                fontSize="1.7vw"
                fontWeight="500"
                color="#488B8F"
              >
                Ene-Dic 2021
              </Typography>
              <Box
                display="flex"
                flexDirection="row"
                marginTop="4%"
                borderTop="2px solid #488B8F"
                paddingTop="4%"
              >
                <Box width="15vw"></Box>
                <InputTitles marginLeft="3%" sx={{ fontSize: "0.6vw" }}>
                  Variación<br></br>vertical
                </InputTitles>
              </Box>
              <Box display="flex" flexDirection="row" marginTop="2%">
                <TextField
                  id="ICA"
                  placeholder="Ingrese Monto"
                  type="number"
                  variant="standard"
                  sx={{
                    ...FinancialStatInputLong,
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
                          marginRight: "0.7rem",
                        }}
                        class="fa-regular fa-dollar-sign"
                      ></i>
                    ),
                  }}
                />
                <TextField
                  id="ICA"
                  placeholder="--"
                  type="number"
                  variant="standard"
                  value={0}
                  sx={{
                    ...FinancialStatInputShort,
                    marginLeft: "3%",
                  }}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      marginTop: "-5px",
                    },
                    endAdornment: (
                      <i
                        style={{
                          color: "#5EA3A3",
                        }}
                        class="fa-regular fa-percent"
                      ></i>
                    ),
                  }}
                />
              </Box>
              <Box display="flex" flexDirection="row" marginTop="6%">
                <TextField
                  id="ICA"
                  placeholder="Ingrese Monto"
                  type="number"
                  variant="standard"
                  sx={{
                    ...FinancialStatInputLong,
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
                          marginRight: "0.7rem",
                        }}
                        class="fa-regular fa-dollar-sign"
                      ></i>
                    ),
                  }}
                />
                <TextField
                  id="ICA"
                  placeholder="--"
                  type="number"
                  variant="standard"
                  value={0}
                  sx={{
                    ...FinancialStatInputShort,
                    marginLeft: "3%",
                  }}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      marginTop: "-5px",
                    },
                    endAdornment: (
                      <i
                        style={{
                          color: "#5EA3A3",
                        }}
                        class="fa-regular fa-percent"
                      ></i>
                    ),
                  }}
                />
              </Box>
              <Box display="flex" flexDirection="row" marginTop="6%">
                <TextField
                  id="ICA"
                  placeholder="Ingrese Monto"
                  type="number"
                  variant="standard"
                  sx={{
                    ...FinancialStatInputLong,
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
                          marginRight: "0.7rem",
                        }}
                        class="fa-regular fa-dollar-sign"
                      ></i>
                    ),
                  }}
                />
                <TextField
                  id="ICA"
                  placeholder="--"
                  type="number"
                  variant="standard"
                  value={0}
                  sx={{
                    ...FinancialStatInputShort,
                    marginLeft: "3%",
                  }}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      marginTop: "-5px",
                    },
                    endAdornment: (
                      <i
                        style={{
                          color: "#5EA3A3",
                        }}
                        class="fa-regular fa-percent"
                      ></i>
                    ),
                  }}
                />
              </Box>
              <Box display="flex" flexDirection="row" marginTop="6%">
                <TextField
                  id="ICA"
                  placeholder="Ingrese Monto"
                  type="number"
                  variant="standard"
                  sx={{
                    ...FinancialStatInputLong,
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
                          marginRight: "0.7rem",
                        }}
                        class="fa-regular fa-dollar-sign"
                      ></i>
                    ),
                  }}
                />
                <TextField
                  id="ICA"
                  placeholder="--"
                  type="number"
                  variant="standard"
                  value={0}
                  sx={{
                    ...FinancialStatInputShort,
                    marginLeft: "3%",
                  }}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      marginTop: "-5px",
                    },
                    endAdornment: (
                      <i
                        style={{
                          color: "#5EA3A3",
                        }}
                        class="fa-regular fa-percent"
                      ></i>
                    ),
                  }}
                />
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" marginLeft="3%">
              <Typography
                letterSpacing={0}
                fontSize="1.7vw"
                fontWeight="500"
                color="#488B8F"
              >
                Ene-Dic 2021
              </Typography>
              <Box
                display="flex"
                flexDirection="row"
                marginTop="4%"
                borderTop="2px solid #488B8F"
                paddingTop="4%"
              >
                <Box width="15vw"></Box>
                <InputTitles marginLeft="3%" sx={{ fontSize: "0.6vw" }}>
                  Variación<br></br>vertical
                </InputTitles>
              </Box>
              <Box display="flex" flexDirection="row" marginTop="2%">
                <TextField
                  id="ICA"
                  placeholder="Ingrese Monto"
                  type="number"
                  variant="standard"
                  sx={{
                    ...FinancialStatInputLong,
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
                          marginRight: "0.7rem",
                        }}
                        class="fa-regular fa-dollar-sign"
                      ></i>
                    ),
                  }}
                />
                <TextField
                  id="ICA"
                  placeholder="--"
                  type="number"
                  variant="standard"
                  value={0}
                  sx={{
                    ...FinancialStatInputShort,
                    marginLeft: "3%",
                  }}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      marginTop: "-5px",
                    },
                    endAdornment: (
                      <i
                        style={{
                          color: "#5EA3A3",
                        }}
                        class="fa-regular fa-percent"
                      ></i>
                    ),
                  }}
                />
              </Box>
              <Box display="flex" flexDirection="row" marginTop="6%">
                <TextField
                  id="ICA"
                  placeholder="Ingrese Monto"
                  type="number"
                  variant="standard"
                  sx={{
                    ...FinancialStatInputLong,
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
                          marginRight: "0.7rem",
                        }}
                        class="fa-regular fa-dollar-sign"
                      ></i>
                    ),
                  }}
                />
                <TextField
                  id="ICA"
                  placeholder="--"
                  type="number"
                  variant="standard"
                  value={0}
                  sx={{
                    ...FinancialStatInputShort,
                    marginLeft: "3%",
                  }}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      marginTop: "-5px",
                    },
                    endAdornment: (
                      <i
                        style={{
                          color: "#5EA3A3",
                        }}
                        class="fa-regular fa-percent"
                      ></i>
                    ),
                  }}
                />
              </Box>
              <Box display="flex" flexDirection="row" marginTop="6%">
                <TextField
                  id="ICA"
                  placeholder="Ingrese Monto"
                  type="number"
                  variant="standard"
                  sx={{
                    ...FinancialStatInputLong,
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
                          marginRight: "0.7rem",
                        }}
                        class="fa-regular fa-dollar-sign"
                      ></i>
                    ),
                  }}
                />
                <TextField
                  id="ICA"
                  placeholder="--"
                  type="number"
                  variant="standard"
                  value={0}
                  sx={{
                    ...FinancialStatInputShort,
                    marginLeft: "3%",
                  }}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      marginTop: "-5px",
                    },
                    endAdornment: (
                      <i
                        style={{
                          color: "#5EA3A3",
                        }}
                        class="fa-regular fa-percent"
                      ></i>
                    ),
                  }}
                />
              </Box>
              <Box display="flex" flexDirection="row" marginTop="6%">
                <TextField
                  id="ICA"
                  placeholder="Ingrese Monto"
                  type="number"
                  variant="standard"
                  sx={{
                    ...FinancialStatInputLong,
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
                          marginRight: "0.7rem",
                        }}
                        class="fa-regular fa-dollar-sign"
                      ></i>
                    ),
                  }}
                />
                <TextField
                  id="ICA"
                  placeholder="--"
                  type="number"
                  variant="standard"
                  value={0}
                  sx={{
                    ...FinancialStatInputShort,
                    marginLeft: "3%",
                  }}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      marginTop: "-5px",
                    },
                    endAdornment: (
                      <i
                        style={{
                          color: "#5EA3A3",
                        }}
                        class="fa-regular fa-percent"
                      ></i>
                    ),
                  }}
                />
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" marginLeft="3%">
              <Typography
                letterSpacing={0}
                fontSize="1.7vw"
                fontWeight="500"
                color="#488B8F"
              >
                Ene-Dic 2021
              </Typography>
              <Box
                display="flex"
                flexDirection="row"
                marginTop="4%"
                borderTop="2px solid #488B8F"
                paddingTop="4%"
              >
                <Box width="15vw"></Box>
                <InputTitles marginLeft="3%" sx={{ fontSize: "0.6vw" }}>
                  Variación<br></br>vertical
                </InputTitles>
              </Box>
              <Box display="flex" flexDirection="row" marginTop="2%">
                <TextField
                  id="ICA"
                  placeholder="Ingrese Monto"
                  type="number"
                  variant="standard"
                  sx={{
                    ...FinancialStatInputLong,
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
                          marginRight: "0.7rem",
                        }}
                        class="fa-regular fa-dollar-sign"
                      ></i>
                    ),
                  }}
                />
                <TextField
                  id="ICA"
                  placeholder="--"
                  type="number"
                  variant="standard"
                  value={0}
                  sx={{
                    ...FinancialStatInputShort,
                    marginLeft: "3%",
                  }}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      marginTop: "-5px",
                    },
                    endAdornment: (
                      <i
                        style={{
                          color: "#5EA3A3",
                        }}
                        class="fa-regular fa-percent"
                      ></i>
                    ),
                  }}
                />
              </Box>
              <Box display="flex" flexDirection="row" marginTop="6%">
                <TextField
                  id="ICA"
                  placeholder="Ingrese Monto"
                  type="number"
                  variant="standard"
                  sx={{
                    ...FinancialStatInputLong,
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
                          marginRight: "0.7rem",
                        }}
                        class="fa-regular fa-dollar-sign"
                      ></i>
                    ),
                  }}
                />
                <TextField
                  id="ICA"
                  placeholder="--"
                  type="number"
                  variant="standard"
                  value={0}
                  sx={{
                    ...FinancialStatInputShort,
                    marginLeft: "3%",
                  }}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      marginTop: "-5px",
                    },
                    endAdornment: (
                      <i
                        style={{
                          color: "#5EA3A3",
                        }}
                        class="fa-regular fa-percent"
                      ></i>
                    ),
                  }}
                />
              </Box>
              <Box display="flex" flexDirection="row" marginTop="6%">
                <TextField
                  id="ICA"
                  placeholder="Ingrese Monto"
                  type="number"
                  variant="standard"
                  sx={{
                    ...FinancialStatInputLong,
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
                          marginRight: "0.7rem",
                        }}
                        class="fa-regular fa-dollar-sign"
                      ></i>
                    ),
                  }}
                />
                <TextField
                  id="ICA"
                  placeholder="--"
                  type="number"
                  variant="standard"
                  value={0}
                  sx={{
                    ...FinancialStatInputShort,
                    marginLeft: "3%",
                  }}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      marginTop: "-5px",
                    },
                    endAdornment: (
                      <i
                        style={{
                          color: "#5EA3A3",
                        }}
                        class="fa-regular fa-percent"
                      ></i>
                    ),
                  }}
                />
              </Box>
              <Box display="flex" flexDirection="row" marginTop="6%">
                <TextField
                  id="ICA"
                  placeholder="Ingrese Monto"
                  type="number"
                  variant="standard"
                  sx={{
                    ...FinancialStatInputLong,
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
                          marginRight: "0.7rem",
                        }}
                        class="fa-regular fa-dollar-sign"
                      ></i>
                    ),
                  }}
                />
                <TextField
                  id="ICA"
                  placeholder="--"
                  type="number"
                  variant="standard"
                  value={0}
                  sx={{
                    ...FinancialStatInputShort,
                    marginLeft: "3%",
                  }}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      marginTop: "-5px",
                    },
                    endAdornment: (
                      <i
                        style={{
                          color: "#5EA3A3",
                        }}
                        class="fa-regular fa-percent"
                      ></i>
                    ),
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
