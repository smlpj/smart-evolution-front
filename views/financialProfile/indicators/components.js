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
import { GetCustomerById } from "./queries";

export const FinancialInd = () => {
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
                color="#63595C"
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
                    Ene-Dic 2019
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
                    Nuevo registro
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
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
