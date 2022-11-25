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

import typeForeignCurrencyAccountStep from "@views/self-management/Steps/LegalSteps/typeForeignCurrencyAccountStep";

//Queries imports
import { GetCustomerById, GetFinancialProfileIndicatorsById } from "./queries";

export const FinancialInd = () => {
  //Get ID from URL
  const {
    fetch: fetch,
    loading: loading,
    error: error,
    data: data,
  } = useFetch({ service: GetCustomerById, init: false });

  //Get Financial Profile Indicators by ID
  const {
    fetch: fetchIndicators,
    loading: loadingIndicators,
    error: errorIndicators,
    data: dataIndicators,
  } = useFetch({ service: GetFinancialProfileIndicatorsById, init: false });

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
      fetchIndicators(id);
    }
  }, [id]);

  useEffect(() => {
    if (dataIndicators) {
      console.log(dataIndicators);
    }
  }, [dataIndicators]);

  const sxNumbers = {
    letterSpacing: 0,
    fontSize: "0.9vw",
    fontWeight: "medium",
    color: "#333333",
    height: "5.5vh",
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
        <Grid
          item
          xs
          sx={{
            margin: "1% 5%",
            "@media all and (display-mode: fullscreen)": {
              margin: "0% 1%",
              paddingTop: "1vh",
            },
          }}
        >
          <Box
            display="flex"
            flexDirection="row"
            sx={{
              "@media all and (display-mode: fullscreen)": {
                display: "none",
              },
            }}
          >
            <BackButton path={`/financialProfile?id=${id}`} />
            <Typography
              letterSpacing={0}
              fontSize="1.2vw"
              fontWeight="500"
              color="#488B8F"
              marginLeft="3%"
            >
              Indicadores financieros
            </Typography>
            <Box flexGrow={1} />
            <Button
              variant="standard"
              color="primary"
              size="large"
              onClick={() => {
                console.log("clicked");
              }}
              sx={{
                height: "2.6rem",
                backgroundColor: "#488B8F",
                border: "1.4px solid #5EA3A3",
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: "#5EA3A3",
                },
              }}
            >
              <Typography
                letterSpacing={0}
                fontSize="80%"
                fontWeight="bold"
                color="#FFFFFF"
              >
                Descargar indicadores
              </Typography>

              <i
                style={{
                  color: "#FFFFFF",
                  marginLeft: "0.7rem",
                }}
                class="fa-regular fa-download"
              ></i>
            </Button>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            marginTop="1%"
            sx={{
              "@media all and (display-mode: fullscreen)": {
                display: "none",
              },
            }}
          >
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
              {data?.data?.riskProfile && (
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
                      Ver
                    </Typography>
                  </Button>
                </Link>
              )}
            </Box>
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
              "@media all and (display-mode: fullscreen)": {
                border: "none",
                margin: "0px",
                paddingTop: "0",
                height: "88vh",
              },
            }}
          >
            {/* Actividad / Eficiencia */}
            <Box display="flex" flexDirection="column">
              {/* Titulo */}
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                mt="1%"
                alignItems="center"
              >
                <Box width="100%">
                  <Typography
                    letterSpacing={0}
                    fontSize="1.85vw"
                    fontWeight="500"
                    color="#333333"
                  >
                    Actividad / Eficiencia
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
                <Box display="flex" flexDirection="column" width="40%">
                  <Box display="flex" flexDirection="row">
                    <Box width="50%"></Box>
                    <Box width="50%">
                      <Box display="flex" flexDirection="row">
                        <Box
                          width="calc(91%/3)"
                          ml="3%"
                          borderRight="1px solid #57575780"
                        >
                          <InputTitles
                            sx={{ fontSize: "0.7vw", height: "6vh" }}
                          >
                            ENE-DIC<br></br>2019
                          </InputTitles>
                        </Box>
                        <Box
                          width="calc(91%/3)"
                          ml="3%"
                          borderRight="1px solid #57575780"
                        >
                          <InputTitles sx={{ fontSize: "0.7vw" }}>
                            ENE-DIC<br></br>2020
                          </InputTitles>
                        </Box>
                        <Box width="calc(91%/3)" ml="3%">
                          <InputTitles sx={{ fontSize: "0.7vw" }}>
                            ENE-DIC<br></br>2021
                          </InputTitles>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box display="flex" flexDirection="row">
                    <Box width="50%">
                      <InputTitles sx={{ fontSize: "0.7vw" }}>
                        ROTACIÓN CARTERA
                      </InputTitles>
                    </Box>
                    <Box width="50%">
                      <Box display="flex" flexDirection="row">
                        <Box
                          width="calc(91%/3)"
                          ml="3%"
                          borderRight="1px solid #57575780"
                        >
                          <Typography sx={{ ...sxNumbers }}>
                            {dataIndicators?.data?.activityEfficiency?.period_1
                              ?.walletRotation ?? ""}
                          </Typography>
                        </Box>
                        <Box
                          width="calc(91%/3)"
                          ml="3%"
                          borderRight="1px solid #57575780"
                        >
                          <Typography sx={{ ...sxNumbers }}>
                            {dataIndicators?.data?.activityEfficiency?.period_2
                              ?.walletRotation ?? ""}
                          </Typography>
                        </Box>
                        <Box width="calc(91%/3)" ml="3%">
                          <Typography sx={{ ...sxNumbers }}>
                            {dataIndicators?.data?.activityEfficiency?.period_3
                              ?.walletRotation ?? ""}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box display="flex" flexDirection="row">
                    <Box width="50%">
                      <InputTitles sx={{ fontSize: "0.7vw" }}>
                        ROTACIÓN INVENTARIOS
                      </InputTitles>
                    </Box>
                    <Box width="50%">
                      <Box display="flex" flexDirection="row">
                        <Box
                          width="calc(91%/3)"
                          ml="3%"
                          borderRight="1px solid #57575780"
                        >
                          <Typography sx={{ ...sxNumbers }}>
                            {dataIndicators?.data?.activityEfficiency?.period_1
                              ?.inventoryRotation ?? ""}
                          </Typography>
                        </Box>
                        <Box
                          width="calc(91%/3)"
                          ml="3%"
                          borderRight="1px solid #57575780"
                        >
                          <Typography sx={{ ...sxNumbers }}>
                            {dataIndicators?.data?.activityEfficiency?.period_2
                              ?.inventoryRotation ?? ""}
                          </Typography>
                        </Box>
                        <Box width="calc(91%/3)" ml="3%">
                          <Typography sx={{ ...sxNumbers }}>
                            {dataIndicators?.data?.activityEfficiency?.period_3
                              ?.inventoryRotation ?? ""}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box display="flex" flexDirection="row">
                    <Box width="50%">
                      <InputTitles sx={{ fontSize: "0.7vw" }}>
                        CICLO OPERACIONAL
                      </InputTitles>
                    </Box>
                    <Box width="50%">
                      <Box display="flex" flexDirection="row">
                        <Box
                          width="calc(91%/3)"
                          ml="3%"
                          borderRight="1px solid #57575780"
                        >
                          <Typography sx={{ ...sxNumbers }}>
                            {dataIndicators?.data?.activityEfficiency?.period_1
                              ?.operationalCycle ?? ""}
                          </Typography>
                        </Box>
                        <Box
                          width="calc(91%/3)"
                          ml="3%"
                          borderRight="1px solid #57575780"
                        >
                          <Typography sx={{ ...sxNumbers }}>
                            {dataIndicators?.data?.activityEfficiency?.period_2
                              ?.operationalCycle ?? ""}
                          </Typography>
                        </Box>
                        <Box width="calc(91%/3)" ml="3%">
                          <Typography sx={{ ...sxNumbers }}>
                            {dataIndicators?.data?.activityEfficiency?.period_3
                              ?.operationalCycle ?? ""}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box display="flex" flexDirection="row">
                    <Box width="50%">
                      <InputTitles sx={{ fontSize: "0.7vw" }}>
                        ROTACIÓN PROVEEDORES
                      </InputTitles>
                    </Box>
                    <Box width="50%">
                      <Box display="flex" flexDirection="row">
                        <Box
                          width="calc(91%/3)"
                          ml="3%"
                          borderRight="1px solid #57575780"
                        >
                          <Typography sx={{ ...sxNumbers }}>
                            {dataIndicators?.data?.activityEfficiency?.period_1
                              ?.providersRotation ?? ""}
                          </Typography>
                        </Box>
                        <Box
                          width="calc(91%/3)"
                          ml="3%"
                          borderRight="1px solid #57575780"
                        >
                          <Typography sx={{ ...sxNumbers }}>
                            {dataIndicators?.data?.activityEfficiency?.period_2
                              ?.providersRotation ?? ""}
                          </Typography>
                        </Box>
                        <Box width="calc(91%/3)" ml="3%">
                          <Typography sx={{ ...sxNumbers }}>
                            {dataIndicators?.data?.activityEfficiency?.period_3
                              ?.providersRotation ?? ""}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box display="flex" flexDirection="row">
                    <Box width="50%">
                      <InputTitles sx={{ fontSize: "0.7vw" }}>
                        ROTACIÓN GASTOS ACUMULADOS
                      </InputTitles>
                    </Box>
                    <Box width="50%">
                      <Box display="flex" flexDirection="row">
                        <Box
                          width="calc(91%/3)"
                          ml="3%"
                          borderRight="1px solid #57575780"
                        >
                          <Typography sx={{ ...sxNumbers }}>
                            {dataIndicators?.data?.activityEfficiency?.period_1
                              ?.accumulatedExpensesRotation ?? ""}
                          </Typography>
                        </Box>
                        <Box
                          width="calc(91%/3)"
                          ml="3%"
                          borderRight="1px solid #57575780"
                        >
                          <Typography sx={{ ...sxNumbers }}>
                            {dataIndicators?.data?.activityEfficiency?.period_2
                              ?.accumulatedExpensesRotation ?? ""}
                          </Typography>
                        </Box>
                        <Box width="calc(91%/3)" ml="3%">
                          <Typography sx={{ ...sxNumbers }}>
                            {dataIndicators?.data?.activityEfficiency?.period_3
                              ?.accumulatedExpensesRotation ?? ""}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box display="flex" flexDirection="row">
                    <Box width="50%">
                      <InputTitles sx={{ fontSize: "0.7vw" }}>
                        CICLO CONVERSIÓN EFECTIVO
                      </InputTitles>
                    </Box>
                    <Box width="50%">
                      <Box display="flex" flexDirection="row">
                        <Box
                          width="calc(91%/3)"
                          ml="3%"
                          borderRight="1px solid #57575780"
                        >
                          <Typography sx={{ ...sxNumbers }}>
                            {dataIndicators?.data?.activityEfficiency?.period_1
                              ?.cashConversionCycle ?? ""}
                          </Typography>
                        </Box>
                        <Box
                          width="calc(91%/3)"
                          ml="3%"
                          borderRight="1px solid #57575780"
                        >
                          <Typography sx={{ ...sxNumbers }}>
                            {dataIndicators?.data?.activityEfficiency?.period_2
                              ?.cashConversionCycle ?? ""}
                          </Typography>
                        </Box>
                        <Box width="calc(91%/3)" ml="3%">
                          <Typography sx={{ ...sxNumbers }}>
                            {dataIndicators?.data?.activityEfficiency?.period_3
                              ?.cashConversionCycle ?? ""}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box display="flex" flexDirection="row">
                    <Box width="50%">
                      <InputTitles sx={{ fontSize: "0.7vw" }}>
                        ROTACIÓN DE ACTIVOS
                      </InputTitles>
                    </Box>
                    <Box width="50%">
                      <Box display="flex" flexDirection="row">
                        <Box
                          width="calc(91%/3)"
                          ml="3%"
                          borderRight="1px solid #57575780"
                        >
                          <Typography sx={{ ...sxNumbers, height: "0%" }}>
                            {Math.round(
                              dataIndicators?.data?.activityEfficiency?.period_1
                                ?.assetsRotation ?? ""
                            )}
                          </Typography>
                        </Box>
                        <Box
                          width="calc(91%/3)"
                          ml="3%"
                          borderRight="1px solid #57575780"
                        >
                          <Typography sx={{ ...sxNumbers, height: "0%" }}>
                            {Math.round(
                              dataIndicators?.data?.activityEfficiency?.period_2
                                ?.assetsRotation ?? ""
                            )}
                          </Typography>
                        </Box>
                        <Box width="calc(91%/3)" ml="3%">
                          <Typography sx={{ ...sxNumbers, height: "0%" }}>
                            {Math.round(
                              dataIndicators?.data?.activityEfficiency?.period_3
                                ?.assetsRotation ?? ""
                            )}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box display="flex" flexDirection="column" width="60%"></Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
