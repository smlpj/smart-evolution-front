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

  const resultsOf = (name, period) => {
    if (name === "net_cxc") {
      return (
        (formik.values[period].assets.clients_wallet ?? 0) +
        (formik.values[period].assets.cxc_partners ?? 0) +
        (formik.values[period].assets.other_cxc ?? 0)
      );
    }
    if (name === "total_inventory") {
      return (
        (formik.values[period].assets.raw_material_and_others ?? 0) +
        (formik.values[period].assets.products_finished ?? 0)
      );
    }
    if (name === "current_assets") {
      return (
        (formik.values[period].assets.cash_and_investments ?? 0) +
        (formik.values[period].assets.advances_and_progress ?? 0) +
        (formik.values[period].assets.clients_wallet ?? 0) +
        (formik.values[period].assets.cxc_partners ?? 0) +
        (formik.values[period].assets.other_cxc ?? 0) +
        (formik.values[period].assets.raw_material_and_others ?? 0) +
        (formik.values[period].assets.products_finished ?? 0)
      );
    }
    if (name === "gross_fixed_assets") {
      return (
        (formik.values[period].assets.lands_and_buildings ?? 0) +
        (formik.values[period].assets.m_and_e_vehicles ?? 0)
      );
    }
    if (name === "net_fixed_assets") {
      return (
        (formik.values[period].assets.lands_and_buildings ?? 0) +
        (formik.values[period].assets.m_and_e_vehicles ?? 0) -
        (formik.values[period].assets.dep_acum ?? 0)
      );
    }
    if (name === "total_other_assets") {
      return (
        (formik.values[period].assets.difer_intang_leasing ?? 0) +
        (formik.values[period].assets.investments_and_others ?? 0)
      );
    }
    if (name === "total_assets") {
      return (
        (formik.values[period].assets.cash_and_investments ?? 0) +
        (formik.values[period].assets.advances_and_progress ?? 0) +
        (formik.values[period].assets.clients_wallet ?? 0) +
        (formik.values[period].assets.cxc_partners ?? 0) +
        (formik.values[period].assets.other_cxc ?? 0) +
        (formik.values[period].assets.raw_material_and_others ?? 0) +
        (formik.values[period].assets.products_finished ?? 0) +
        (formik.values[period].assets.lands_and_buildings ?? 0) +
        (formik.values[period].assets.m_and_e_vehicles ?? 0) -
        (formik.values[period].assets.dep_acum ?? 0) +
        (formik.values[period].assets.difer_intang_leasing ?? 0) +
        (formik.values[period].assets.investments_and_others ?? 0)
      );
    }
    if (name === "current_liabilities") {
      return (
        (formik.values[period].passives.financial_obligation_cp ?? 0) +
        (formik.values[period].passives.providers ?? 0) +
        (formik.values[period].passives.unpaid_expenses ?? 0) +
        (formik.values[period].passives.unpaid_taxes ?? 0) +
        (formik.values[period].passives.linked_economics ?? 0) +
        (formik.values[period].passives.estimated_passives ?? 0)
      );
    }
    if (name === "lp_passives") {
      return (
        (formik.values[period].passives.financial_obligation_lp ?? 0) +
        (formik.values[period].passives.other_lp_leasing ?? 0)
      );
    }
    if (name === "total_passives") {
      return (
        (formik.values[period].passives.financial_obligation_cp ?? 0) +
        (formik.values[period].passives.providers ?? 0) +
        (formik.values[period].passives.unpaid_expenses ?? 0) +
        (formik.values[period].passives.unpaid_taxes ?? 0) +
        (formik.values[period].passives.linked_economics ?? 0) +
        (formik.values[period].passives.estimated_passives ?? 0) +
        (formik.values[period].passives.financial_obligation_lp ?? 0) +
        (formik.values[period].passives.other_lp_leasing ?? 0)
      );
    }
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
                    onWheel={(e) => e.target.blur()}
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
                    value={
                      formik.values.first_period.assets.cash_and_investments
                        ? Math.round(
                            (formik.values.first_period.assets
                              .cash_and_investments /
                              resultsOf("total_assets", "first_period")) *
                              100
                          )
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
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
                    value={
                      formik.values.second_period.assets.cash_and_investments
                        ? Math.round(
                            (formik.values.second_period.assets
                              .cash_and_investments /
                              resultsOf("total_assets", "first_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.first_period.assets.cash_and_investments &&
                      formik.values.second_period.assets.cash_and_investments
                        ? Math.round(
                            ((formik.values.second_period.assets
                              .cash_and_investments -
                              formik.values.first_period.assets
                                .cash_and_investments) /
                              formik.values.first_period.assets
                                .cash_and_investments) *
                              100
                          ) || 0
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
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
                    value={
                      formik.values.third_period.assets.cash_and_investments
                        ? Math.round(
                            (formik.values.third_period.assets
                              .cash_and_investments /
                              resultsOf("total_assets", "first_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.third_period.assets.cash_and_investments &&
                      formik.values.second_period.assets.cash_and_investments
                        ? Math.round(
                            ((formik.values.third_period.assets
                              .cash_and_investments -
                              formik.values.second_period.assets
                                .cash_and_investments) /
                              formik.values.second_period.assets
                                .cash_and_investments) *
                              100
                          ) || 0
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
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
                    value={
                      formik.values.first_period.assets.clients_wallet
                        ? Math.round(
                            (formik.values.first_period.assets.clients_wallet /
                              resultsOf("total_assets", "first_period")) *
                              100
                          )
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
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
                    value={
                      formik.values.second_period.assets.clients_wallet
                        ? Math.round(
                            (formik.values.second_period.assets.clients_wallet /
                              resultsOf("total_assets", "second_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.second_period.assets.clients_wallet &&
                      formik.values.first_period.assets.clients_wallet
                        ? Math.round(
                            ((formik.values.second_period.assets
                              .clients_wallet -
                              formik.values.first_period.assets
                                .clients_wallet) /
                              formik.values.first_period.assets
                                .clients_wallet) *
                              100
                          ) || 0
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
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
                    value={
                      formik.values.third_period.assets.clients_wallet
                        ? Math.round(
                            (formik.values.third_period.assets.clients_wallet /
                              resultsOf("total_assets", "third_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.third_period.assets.clients_wallet &&
                      formik.values.second_period.assets.clients_wallet
                        ? Math.round(
                            ((formik.values.third_period.assets.clients_wallet -
                              formik.values.second_period.assets
                                .clients_wallet) /
                              formik.values.second_period.assets
                                .clients_wallet) *
                              100
                          ) || 0
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
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
                    type="number"
                    variant="standard"
                    disabled
                    value={
                      formik.values.first_period.assets.cxc_partners
                        ? Math.round(
                            (formik.values.first_period.assets.cxc_partners /
                              resultsOf("total_assets", "first_period")) *
                              100
                          )
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
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
                    value={
                      formik.values.second_period.assets.cxc_partners
                        ? Math.round(
                            (formik.values.second_period.assets.cxc_partners /
                              resultsOf("total_assets", "second_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.first_period.assets.cxc_partners &&
                      formik.values.second_period.assets.cxc_partners
                        ? Math.round(
                            ((formik.values.second_period.assets.cxc_partners -
                              formik.values.first_period.assets.cxc_partners) /
                              formik.values.first_period.assets.cxc_partners) *
                              100
                          ) || 0
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
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
                    value={
                      formik.values.third_period.assets.cxc_partners
                        ? Math.round(
                            (formik.values.third_period.assets.cxc_partners /
                              resultsOf("total_assets", "third_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.third_period.assets.cxc_partners &&
                      formik.values.second_period.assets.cxc_partners
                        ? Math.round(
                            ((formik.values.third_period.assets.cxc_partners -
                              formik.values.second_period.assets.cxc_partners) /
                              formik.values.second_period.assets.cxc_partners) *
                              100
                          ) || 0
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
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
                    type="number"
                    variant="standard"
                    disabled
                    value={
                      formik.values.first_period.assets.other_cxc
                        ? Math.round(
                            (formik.values.first_period.assets.other_cxc /
                              resultsOf("total_assets", "first_period")) *
                              100
                          )
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
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
                    value={
                      formik.values.second_period.assets.other_cxc
                        ? Math.round(
                            (formik.values.second_period.assets.other_cxc /
                              resultsOf("total_assets", "second_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.first_period.assets.other_cxc &&
                      formik.values.second_period.assets.other_cxc
                        ? Math.round(
                            ((formik.values.second_period.assets.other_cxc -
                              formik.values.first_period.assets.other_cxc) /
                              formik.values.first_period.assets.other_cxc) *
                              100
                          ) || 0
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
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
                    value={
                      formik.values.third_period.assets.other_cxc
                        ? Math.round(
                            (formik.values.third_period.assets.other_cxc /
                              resultsOf("total_assets", "third_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.third_period.assets.other_cxc &&
                      formik.values.second_period.assets.other_cxc
                        ? Math.round(
                            ((formik.values.third_period.assets.other_cxc -
                              formik.values.second_period.assets.other_cxc) /
                              formik.values.second_period.assets.other_cxc) *
                              100
                          ) || 0
                        : null
                    }
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
                    value={resultsOf("net_cxc", "first_period")}
                    id="net_cxc-first_period"
                  >
                    {`$ ${resultsOf("net_cxc", "first_period")}`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        (resultsOf("net_cxc", "first_period") /
                          resultsOf("total_assets", "first_period")) *
                          100
                      ) || 0
                    }%`}
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
                    value={resultsOf("net_cxc", "second_period")}
                    id="net_cxc-second_period"
                  >
                    {`$ ${resultsOf("net_cxc", "second_period")}`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        (resultsOf("net_cxc", "second_period") /
                          resultsOf("total_assets", "second_period")) *
                          100
                      ) || 0
                    }%`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        ((resultsOf("net_cxc", "second_period") -
                          resultsOf("net_cxc", "first_period")) /
                          resultsOf("net_cxc", "first_period")) *
                          100
                      ) || 0
                    }%`}
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
                    value={resultsOf("net_cxc", "third_period")}
                    id="net_cxc-third_period"
                  >
                    {`$ ${resultsOf("net_cxc", "third_period")}`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        (resultsOf("net_cxc", "third_period") /
                          resultsOf("total_assets", "third_period")) *
                          100
                      ) || 0
                    }%`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        ((resultsOf("net_cxc", "third_period") -
                          resultsOf("net_cxc", "second_period")) /
                          resultsOf("net_cxc", "second_period")) *
                          100
                      ) || 0
                    }%`}
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
                    onWheel={(e) => e.target.blur()}
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
                    type="number"
                    variant="standard"
                    disabled
                    value={
                      formik.values.first_period.assets.raw_material_and_others
                        ? Math.round(
                            (formik.values.first_period.assets
                              .raw_material_and_others /
                              resultsOf("total_assets", "first_period")) *
                              100
                          )
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
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
                    value={
                      formik.values.second_period.assets.raw_material_and_others
                        ? Math.round(
                            (formik.values.second_period.assets
                              .raw_material_and_others /
                              resultsOf("total_assets", "second_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.first_period.assets
                        .raw_material_and_others &&
                      formik.values.second_period.assets.raw_material_and_others
                        ? Math.round(
                            ((formik.values.second_period.assets
                              .raw_material_and_others -
                              formik.values.first_period.assets
                                .raw_material_and_others) /
                              formik.values.first_period.assets
                                .raw_material_and_others) *
                              100
                          ) || 0
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
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
                    value={
                      formik.values.third_period.assets.raw_material_and_others
                        ? Math.round(
                            (formik.values.third_period.assets
                              .raw_material_and_others /
                              resultsOf("total_assets", "third_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.third_period.assets
                        .raw_material_and_others &&
                      formik.values.second_period.assets.raw_material_and_others
                        ? Math.round(
                            ((formik.values.third_period.assets
                              .raw_material_and_others -
                              formik.values.second_period.assets
                                .raw_material_and_others) /
                              formik.values.second_period.assets
                                .raw_material_and_others) *
                              100
                          ) || 0
                        : null
                    }
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
                    PRODUCTOS TERMINADOS
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
                    onWheel={(e) => e.target.blur()}
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
                    type="number"
                    variant="standard"
                    disabled
                    value={
                      formik.values.first_period.assets.products_finished
                        ? Math.round(
                            (formik.values.first_period.assets
                              .products_finished /
                              resultsOf("total_assets", "first_period")) *
                              100
                          )
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
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
                    value={
                      formik.values.second_period.assets.products_finished
                        ? Math.round(
                            (formik.values.second_period.assets
                              .products_finished /
                              resultsOf("total_assets", "second_period")) *
                              100
                          ) || 0
                        : null
                    }
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
                    value={
                      formik.values.first_period.assets.products_finished &&
                      formik.values.second_period.assets.products_finished
                        ? Math.round(
                            ((formik.values.second_period.assets
                              .products_finished -
                              formik.values.first_period.assets
                                .products_finished) /
                              formik.values.first_period.assets
                                .products_finished) *
                              100
                          ) || 0
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
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
                    value={
                      formik.values.third_period.assets.products_finished
                        ? Math.round(
                            (formik.values.third_period.assets
                              .products_finished /
                              resultsOf("total_assets", "third_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.third_period.assets.products_finished &&
                      formik.values.second_period.assets.products_finished
                        ? Math.round(
                            ((formik.values.third_period.assets
                              .products_finished -
                              formik.values.second_period.assets
                                .products_finished) /
                              formik.values.second_period.assets
                                .products_finished) *
                              100
                          ) || 0
                        : null
                    }
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
                    value={resultsOf("total_inventory", "first_period")}
                    id="total_inventory-first_period"
                  >
                    {`$ ${resultsOf("total_inventory", "first_period")}`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        (resultsOf("total_inventory", "first_period") /
                          resultsOf("total_assets", "first_period")) *
                          100
                      ) || 0
                    }%`}
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
                    value={resultsOf("total_inventory", "second_period")}
                    id="total_inventory-second_period"
                  >
                    {`$ ${resultsOf("total_inventory", "second_period")}`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        (resultsOf("total_inventory", "second_period") /
                          resultsOf("total_assets", "second_period")) *
                          100
                      ) || 0
                    }%`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        ((resultsOf("total_inventory", "second_period") -
                          resultsOf("total_inventory", "first_period")) /
                          resultsOf("total_inventory", "first_period")) *
                          100
                      ) || 0
                    }%`}
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
                    value={resultsOf("total_inventory", "third_period")}
                    id="total_inventory-third_period"
                  >
                    {`$ ${resultsOf("total_inventory", "third_period")}`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        (resultsOf("total_inventory", "third_period") /
                          resultsOf("total_assets", "third_period")) *
                          100
                      ) || 0
                    }%`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        ((resultsOf("total_inventory", "third_period") -
                          resultsOf("total_inventory", "second_period")) /
                          resultsOf("total_inventory", "second_period")) *
                          100
                      ) || 0
                    }%`}
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
              {/* Tercera sección Activos */}
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                mt="1%"
                alignItems="center"
              >
                <Box width="15%">
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    ANTICIPOS Y AVANCES
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="advances_and_progress-first_period"
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
                    type="number"
                    variant="standard"
                    disabled
                    value={
                      formik.values.first_period.assets.advances_and_progress
                        ? Math.round(
                            (formik.values.first_period.assets
                              .advances_and_progress /
                              resultsOf("total_assets", "first_period")) *
                              100
                          )
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="advances_and_progress-second_period"
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
                    value={
                      formik.values.second_period.assets.advances_and_progress
                        ? Math.round(
                            (formik.values.second_period.assets
                              .advances_and_progress /
                              resultsOf("total_assets", "second_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.first_period.assets.advances_and_progress &&
                      formik.values.second_period.assets.advances_and_progress
                        ? Math.round(
                            ((formik.values.second_period.assets
                              .advances_and_progress -
                              formik.values.first_period.assets
                                .advances_and_progress) /
                              formik.values.first_period.assets
                                .advances_and_progress) *
                              100
                          ) || 0
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="advances_and_progress-third_period"
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
                    value={
                      formik.values.third_period.assets.advances_and_progress
                        ? Math.round(
                            (formik.values.third_period.assets
                              .advances_and_progress /
                              resultsOf("total_assets", "third_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.third_period.assets.advances_and_progress &&
                      formik.values.second_period.assets.advances_and_progress
                        ? Math.round(
                            ((formik.values.third_period.assets
                              .advances_and_progress -
                              formik.values.second_period.assets
                                .advances_and_progress) /
                              formik.values.second_period.assets
                                .advances_and_progress) *
                              100
                          ) || 0
                        : null
                    }
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
                    ACTIVO CORRIENTE
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
                    value={resultsOf("current_assets", "first_period")}
                    id="current_assets-first_period"
                  >
                    {`$ ${resultsOf("current_assets", "first_period")}`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        (resultsOf("current_assets", "first_period") /
                          resultsOf("total_assets", "first_period")) *
                          100
                      ) || 0
                    }%`}
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
                    value={resultsOf("current_assets", "second_period")}
                    id="current_assets-second_period"
                  >
                    {`$ ${resultsOf("current_assets", "second_period")}`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        (resultsOf("current_assets", "second_period") /
                          resultsOf("total_assets", "second_period")) *
                          100
                      ) || 0
                    }%`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        ((resultsOf("current_assets", "second_period") -
                          resultsOf("current_assets", "first_period")) /
                          resultsOf("current_assets", "first_period")) *
                          100
                      ) || 0
                    }%`}
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
                    value={resultsOf("current_assets", "third_period")}
                    id="current_assets-third_period"
                  >
                    {`$ ${resultsOf("current_assets", "third_period")}`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        (resultsOf("current_assets", "third_period") /
                          resultsOf("total_assets", "third_period")) *
                          100
                      ) || 0
                    }%`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        ((resultsOf("current_assets", "third_period") -
                          resultsOf("current_assets", "second_period")) /
                          resultsOf("current_assets", "second_period")) *
                          100
                      ) || 0
                    }%`}
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
              {/* Cuarta sección Activos */}
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                mt="1%"
                alignItems="center"
              >
                <Box width="15%">
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    TERRENOS Y EDIFICIOS
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="lands_and_buildings-first_period"
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
                    type="number"
                    variant="standard"
                    disabled
                    value={
                      formik.values.first_period.assets.lands_and_buildings
                        ? Math.round(
                            (formik.values.first_period.assets
                              .lands_and_buildings /
                              resultsOf("total_assets", "first_period")) *
                              100
                          )
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="lands_and_buildings-second_period"
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
                    value={
                      formik.values.second_period.assets.lands_and_buildings
                        ? Math.round(
                            (formik.values.second_period.assets
                              .lands_and_buildings /
                              resultsOf("total_assets", "second_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.first_period.assets.lands_and_buildings &&
                      formik.values.second_period.assets.lands_and_buildings
                        ? Math.round(
                            ((formik.values.second_period.assets
                              .lands_and_buildings -
                              formik.values.first_period.assets
                                .lands_and_buildings) /
                              formik.values.first_period.assets
                                .lands_and_buildings) *
                              100
                          ) || 0
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="lands_and_buildings-third_period"
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
                    value={
                      formik.values.third_period.assets.lands_and_buildings
                        ? Math.round(
                            (formik.values.third_period.assets
                              .lands_and_buildings /
                              resultsOf("total_assets", "third_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.third_period.assets.lands_and_buildings &&
                      formik.values.second_period.assets.lands_and_buildings
                        ? Math.round(
                            ((formik.values.third_period.assets
                              .lands_and_buildings -
                              formik.values.second_period.assets
                                .lands_and_buildings) /
                              formik.values.second_period.assets
                                .lands_and_buildings) *
                              100
                          ) || 0
                        : null
                    }
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
                    M&E, VEHÍCULOS
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="m_and_e_vehicles-first_period"
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
                    type="number"
                    variant="standard"
                    disabled
                    value={
                      formik.values.first_period.assets.m_and_e_vehicles
                        ? Math.round(
                            (formik.values.first_period.assets
                              .m_and_e_vehicles /
                              resultsOf("total_assets", "first_period")) *
                              100
                          )
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="m_and_e_vehicles-second_period"
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
                    value={
                      formik.values.second_period.assets.m_and_e_vehicles
                        ? Math.round(
                            (formik.values.second_period.assets
                              .m_and_e_vehicles /
                              resultsOf("total_assets", "second_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.first_period.assets.m_and_e_vehicles &&
                      formik.values.second_period.assets.m_and_e_vehicles
                        ? Math.round(
                            ((formik.values.second_period.assets
                              .m_and_e_vehicles -
                              formik.values.first_period.assets
                                .m_and_e_vehicles) /
                              formik.values.first_period.assets
                                .m_and_e_vehicles) *
                              100
                          ) || 0
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="m_and_e_vehicles-third_period"
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
                    value={
                      formik.values.third_period.assets.m_and_e_vehicles
                        ? Math.round(
                            (formik.values.third_period.assets
                              .m_and_e_vehicles /
                              resultsOf("total_assets", "third_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.third_period.assets.m_and_e_vehicles &&
                      formik.values.second_period.assets.m_and_e_vehicles
                        ? Math.round(
                            ((formik.values.third_period.assets
                              .m_and_e_vehicles -
                              formik.values.second_period.assets
                                .m_and_e_vehicles) /
                              formik.values.second_period.assets
                                .m_and_e_vehicles) *
                              100
                          ) || 0
                        : null
                    }
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
                    ACTIVO FIJO BRUTO
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
                    value={resultsOf("gross_fixed_assets", "first_period")}
                    id="gross_fixed_assets-first_period"
                  >
                    {`$ ${resultsOf("gross_fixed_assets", "first_period")}`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        (resultsOf("gross_fixed_assets", "first_period") /
                          resultsOf("total_assets", "first_period")) *
                          100
                      ) || 0
                    }%`}
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
                    value={resultsOf("gross_fixed_assets", "second_period")}
                    id="gross_fixed_assets-second_period"
                  >
                    {`$ ${resultsOf("gross_fixed_assets", "second_period")}`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        (resultsOf("gross_fixed_assets", "second_period") /
                          resultsOf("total_assets", "second_period")) *
                          100
                      ) || 0
                    }%`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        ((resultsOf("gross_fixed_assets", "second_period") -
                          resultsOf("gross_fixed_assets", "first_period")) /
                          resultsOf("gross_fixed_assets", "first_period")) *
                          100
                      ) || 0
                    }%`}
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
                    value={resultsOf("gross_fixed_assets", "third_period")}
                    id="gross_fixed_assets-third_period"
                  >
                    {`$ ${resultsOf("gross_fixed_assets", "third_period")}`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        (resultsOf("gross_fixed_assets", "third_period") /
                          resultsOf("total_assets", "third_period")) *
                          100
                      ) || 0
                    }%`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        ((resultsOf("gross_fixed_assets", "third_period") -
                          resultsOf("gross_fixed_assets", "second_period")) /
                          resultsOf("gross_fixed_assets", "second_period")) *
                          100
                      ) || 0
                    }%`}
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
              {/* Quinta sección Activos */}
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                mt="1%"
                alignItems="center"
              >
                <Box width="15%">
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    DEPRECIACIÓN ACUMULADA
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="dep_acum-first_period"
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
                    type="number"
                    variant="standard"
                    disabled
                    value={
                      formik.values.first_period.assets.dep_acum
                        ? Math.round(
                            (formik.values.first_period.assets.dep_acum /
                              resultsOf("total_assets", "first_period")) *
                              100
                          )
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="dep_acum-second_period"
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
                    value={
                      formik.values.second_period.assets.dep_acum
                        ? Math.round(
                            (formik.values.second_period.assets.dep_acum /
                              resultsOf("total_assets", "second_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.first_period.assets.dep_acum &&
                      formik.values.second_period.assets.dep_acum
                        ? Math.round(
                            ((formik.values.second_period.assets.dep_acum -
                              formik.values.first_period.assets.dep_acum) /
                              formik.values.first_period.assets.dep_acum) *
                              100
                          ) || 0
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="dep_acum-third_period"
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
                    value={
                      formik.values.third_period.assets.dep_acum
                        ? Math.round(
                            (formik.values.third_period.assets.dep_acum /
                              resultsOf("total_assets", "third_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.third_period.assets.dep_acum &&
                      formik.values.second_period.assets.dep_acum
                        ? Math.round(
                            ((formik.values.third_period.assets.dep_acum -
                              formik.values.second_period.assets.dep_acum) /
                              formik.values.second_period.assets.dep_acum) *
                              100
                          ) || 0
                        : null
                    }
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
                    ACTIVO FIJO NETO
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
                    value={resultsOf("net_fixed_assets", "first_period")}
                    id="net_fixed_assets-first_period"
                  >
                    {`$ ${resultsOf("net_fixed_assets", "first_period")}`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        (resultsOf("net_fixed_assets", "first_period") /
                          resultsOf("total_assets", "first_period")) *
                          100
                      ) || 0
                    }%`}
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
                    value={resultsOf("net_fixed_assets", "second_period")}
                    id="net_fixed_assets-second_period"
                  >
                    {`$ ${resultsOf("net_fixed_assets", "second_period")}`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        (resultsOf("net_fixed_assets", "second_period") /
                          resultsOf("total_assets", "second_period")) *
                          100
                      ) || 0
                    }%`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        ((resultsOf("net_fixed_assets", "second_period") -
                          resultsOf("net_fixed_assets", "first_period")) /
                          resultsOf("net_fixed_assets", "first_period")) *
                          100
                      ) || 0
                    }%`}
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
                    value={resultsOf("net_fixed_assets", "third_period")}
                    id="net_fixed_assets-third_period"
                  >
                    {`$ ${resultsOf("net_fixed_assets", "third_period")}`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        (resultsOf("net_fixed_assets", "third_period") /
                          resultsOf("total_assets", "third_period")) *
                          100
                      ) || 0
                    }%`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        ((resultsOf("net_fixed_assets", "third_period") -
                          resultsOf("net_fixed_assets", "second_period")) /
                          resultsOf("net_fixed_assets", "second_period")) *
                          100
                      ) || 0
                    }%`}
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
              {/* Sexta sección Activos */}
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                mt="1%"
                alignItems="center"
              >
                <Box width="15%">
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    DIFERIDOS, INTANGIBLES, LEASING
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="difer_intang_leasing-first_period"
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
                    type="number"
                    variant="standard"
                    disabled
                    value={
                      formik.values.first_period.assets.difer_intang_leasing
                        ? Math.round(
                            (formik.values.first_period.assets
                              .difer_intang_leasing /
                              resultsOf("total_assets", "first_period")) *
                              100
                          )
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="difer_intang_leasing-second_period"
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
                    value={
                      formik.values.second_period.assets.difer_intang_leasing
                        ? Math.round(
                            (formik.values.second_period.assets
                              .difer_intang_leasing /
                              resultsOf("total_assets", "second_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.first_period.assets.difer_intang_leasing &&
                      formik.values.second_period.assets.difer_intang_leasing
                        ? Math.round(
                            ((formik.values.second_period.assets
                              .difer_intang_leasing -
                              formik.values.first_period.assets
                                .difer_intang_leasing) /
                              formik.values.first_period.assets
                                .difer_intang_leasing) *
                              100
                          ) || 0
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="difer_intang_leasing-third_period"
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
                    value={
                      formik.values.third_period.assets.difer_intang_leasing
                        ? Math.round(
                            (formik.values.third_period.assets
                              .difer_intang_leasing /
                              resultsOf("total_assets", "third_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.third_period.assets.difer_intang_leasing &&
                      formik.values.second_period.assets.difer_intang_leasing
                        ? Math.round(
                            ((formik.values.third_period.assets
                              .difer_intang_leasing -
                              formik.values.second_period.assets
                                .difer_intang_leasing) /
                              formik.values.second_period.assets
                                .difer_intang_leasing) *
                              100
                          ) || 0
                        : null
                    }
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
                    INVERSIONES PERMANENTES Y OTROS
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="investments_and_others-first_period"
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
                    type="number"
                    variant="standard"
                    disabled
                    value={
                      formik.values.first_period.assets.investments_and_others
                        ? Math.round(
                            (formik.values.first_period.assets
                              .investments_and_others /
                              resultsOf("total_assets", "first_period")) *
                              100
                          )
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="investments_and_others-second_period"
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
                    value={
                      formik.values.second_period.assets.investments_and_others
                        ? Math.round(
                            (formik.values.second_period.assets
                              .investments_and_others /
                              resultsOf("total_assets", "second_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.first_period.assets
                        .investments_and_others &&
                      formik.values.second_period.assets.investments_and_others
                        ? Math.round(
                            ((formik.values.second_period.assets
                              .investments_and_others -
                              formik.values.first_period.assets
                                .investments_and_others) /
                              formik.values.first_period.assets
                                .investments_and_others) *
                              100
                          ) || 0
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="assets"
                    id="investments_and_others-third_period"
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
                    value={
                      formik.values.third_period.assets.investments_and_others
                        ? Math.round(
                            (formik.values.third_period.assets
                              .investments_and_others /
                              resultsOf("total_assets", "third_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.third_period.assets
                        .investments_and_others &&
                      formik.values.second_period.assets.investments_and_others
                        ? Math.round(
                            ((formik.values.third_period.assets
                              .investments_and_others -
                              formik.values.second_period.assets
                                .investments_and_others) /
                              formik.values.second_period.assets
                                .investments_and_others) *
                              100
                          ) || 0
                        : null
                    }
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
                    TOTAL OTROS ACTIVOS
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
                    value={resultsOf("total_other_assets", "first_period")}
                    id="total_other_assets-first_period"
                  >
                    {`$ ${resultsOf("total_other_assets", "first_period")}`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        (resultsOf("total_other_assets", "first_period") /
                          resultsOf("total_assets", "first_period")) *
                          100
                      ) || 0
                    }%`}
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
                    value={resultsOf("total_other_assets", "second_period")}
                    id="total_other_assets-second_period"
                  >
                    {`$ ${resultsOf("total_other_assets", "second_period")}`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        (resultsOf("total_other_assets", "second_period") /
                          resultsOf("total_assets", "second_period")) *
                          100
                      ) || 0
                    }%`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        ((resultsOf("total_other_assets", "second_period") -
                          resultsOf("total_other_assets", "first_period")) /
                          resultsOf("total_other_assets", "first_period")) *
                          100
                      ) || 0
                    }%`}
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
                    value={resultsOf("total_other_assets", "third_period")}
                    id="total_other_assets-third_period"
                  >
                    {`$ ${resultsOf("total_other_assets", "third_period")}`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        (resultsOf("total_other_assets", "third_period") /
                          resultsOf("total_assets", "third_period")) *
                          100
                      ) || 0
                    }%`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        ((resultsOf("total_other_assets", "third_period") -
                          resultsOf("total_other_assets", "second_period")) /
                          resultsOf("total_other_assets", "second_period")) *
                          100
                      ) || 0
                    }%`}
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                height="100%"
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
                    TOTAL ACTIVOS
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
                    value={resultsOf("total_assets", "first_period")}
                    id="total_assets-first_period"
                  >
                    {`$ ${resultsOf("total_assets", "first_period")}`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        (resultsOf("total_assets", "first_period") /
                          resultsOf("total_assets", "first_period")) *
                          100
                      ) || 0
                    }%`}
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
                    value={resultsOf("total_assets", "second_period")}
                    id="total_assets-second_period"
                  >
                    {`$ ${resultsOf("total_assets", "second_period")}`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        (resultsOf("total_assets", "second_period") /
                          resultsOf("total_assets", "second_period")) *
                          100
                      ) || 0
                    }%`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        ((resultsOf("total_assets", "second_period") -
                          resultsOf("total_assets", "first_period")) /
                          resultsOf("total_assets", "first_period")) *
                          100
                      ) || 0
                    }%`}
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
                    value={resultsOf("total_assets", "third_period")}
                    id="total_assets-third_period"
                  >
                    {`$ ${resultsOf("total_assets", "third_period")}`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        (resultsOf("total_assets", "third_period") /
                          resultsOf("total_assets", "third_period")) *
                          100
                      ) || 0
                    }%`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        ((resultsOf("total_assets", "third_period") -
                          resultsOf("total_assets", "second_period")) /
                          resultsOf("total_assets", "second_period")) *
                          100
                      ) || 0
                    }%`}
                  </Typography>
                </Box>
              </Box>

              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                mt="6%"
                alignItems="center"
              >
                <Box width="15%">
                  <Typography
                    letterSpacing={0}
                    fontSize="1.85vw"
                    fontWeight="500"
                    color="#333333"
                  >
                    Pasivos
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
              {/* Primera sección pasivos */}
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                mt="1%"
                alignItems="center"
              >
                <Box width="15%">
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    OBLIGACIONES FINANCIERAS CP
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="passives"
                    id="financial_obligation_cp-first_period"
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
                    type="number"
                    variant="standard"
                    disabled
                    value={
                      formik.values.first_period.passives
                        .financial_obligation_cp
                        ? Math.round(
                            (formik.values.first_period.passives
                              .financial_obligation_cp /
                              resultsOf("total_assets", "first_period")) *
                              100
                          )
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="passives"
                    id="financial_obligation_cp-second_period"
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
                    value={
                      formik.values.second_period.passives
                        .financial_obligation_cp
                        ? Math.round(
                            (formik.values.second_period.passives
                              .financial_obligation_cp /
                              resultsOf("total_assets", "second_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.first_period.passives
                        .financial_obligation_cp &&
                      formik.values.second_period.passives
                        .financial_obligation_cp
                        ? Math.round(
                            ((formik.values.second_period.passives
                              .financial_obligation_cp -
                              formik.values.first_period.passives
                                .financial_obligation_cp) /
                              formik.values.first_period.passives
                                .financial_obligation_cp) *
                              100
                          ) || 0
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="passives"
                    id="financial_obligation_cp-third_period"
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
                    value={
                      formik.values.third_period.passives
                        .financial_obligation_cp
                        ? Math.round(
                            (formik.values.third_period.passives
                              .financial_obligation_cp /
                              resultsOf("total_assets", "third_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.third_period.passives
                        .financial_obligation_cp &&
                      formik.values.second_period.passives
                        .financial_obligation_cp
                        ? Math.round(
                            ((formik.values.third_period.passives
                              .financial_obligation_cp -
                              formik.values.second_period.passives
                                .financial_obligation_cp) /
                              formik.values.second_period.passives
                                .financial_obligation_cp) *
                              100
                          ) || 0
                        : null
                    }
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
                    PROVEEDORES
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="passives"
                    id="providers-first_period"
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
                    type="number"
                    variant="standard"
                    disabled
                    value={
                      formik.values.first_period.passives.providers
                        ? Math.round(
                            (formik.values.first_period.passives.providers /
                              resultsOf("total_assets", "first_period")) *
                              100
                          )
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="passives"
                    id="providers-second_period"
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
                    value={
                      formik.values.second_period.passives.providers
                        ? Math.round(
                            (formik.values.second_period.passives.providers /
                              resultsOf("total_assets", "second_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.first_period.passives.providers &&
                      formik.values.second_period.passives.providers
                        ? Math.round(
                            ((formik.values.second_period.passives.providers -
                              formik.values.first_period.passives.providers) /
                              formik.values.first_period.passives.providers) *
                              100
                          )
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="passives"
                    id="providers-third_period"
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
                    value={
                      formik.values.third_period.passives.providers
                        ? Math.round(
                            (formik.values.third_period.passives.providers /
                              resultsOf("total_assets", "third_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.third_period.passives.providers &&
                      formik.values.second_period.passives.providers
                        ? Math.round(
                            ((formik.values.third_period.passives.providers -
                              formik.values.second_period.passives.providers) /
                              formik.values.second_period.passives.providers) *
                              100
                          )
                        : null
                    }
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
                    GASTOS X PAGAR
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="passives"
                    id="unpaid_expenses-first_period"
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
                    type="number"
                    variant="standard"
                    disabled
                    value={
                      formik.values.first_period.passives.unpaid_expenses
                        ? Math.round(
                            (formik.values.first_period.passives
                              .unpaid_expenses /
                              resultsOf("total_assets", "first_period")) *
                              100
                          )
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="passives"
                    id="unpaid_expenses-second_period"
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
                    value={
                      formik.values.second_period.passives.unpaid_expenses
                        ? Math.round(
                            (formik.values.second_period.passives
                              .unpaid_expenses /
                              resultsOf("total_assets", "second_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.first_period.passives.unpaid_expenses &&
                      formik.values.second_period.passives.unpaid_expenses
                        ? Math.round(
                            ((formik.values.second_period.passives
                              .unpaid_expenses -
                              formik.values.first_period.passives
                                .unpaid_expenses) /
                              formik.values.first_period.passives
                                .unpaid_expenses) *
                              100
                          )
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="passives"
                    id="unpaid_expenses-third_period"
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
                    value={
                      formik.values.third_period.passives.unpaid_expenses
                        ? Math.round(
                            (formik.values.third_period.passives
                              .unpaid_expenses /
                              resultsOf("total_assets", "third_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.third_period.passives.unpaid_expenses &&
                      formik.values.second_period.passives.unpaid_expenses
                        ? Math.round(
                            ((formik.values.third_period.passives
                              .unpaid_expenses -
                              formik.values.second_period.passives
                                .unpaid_expenses) /
                              formik.values.second_period.passives
                                .unpaid_expenses) *
                              100
                          )
                        : null
                    }
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
                    IMPUESTOS POR PAGAR
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="passives"
                    id="unpaid_taxes-first_period"
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
                    type="number"
                    variant="standard"
                    disabled
                    value={
                      formik.values.first_period.passives.unpaid_taxes
                        ? Math.round(
                            (formik.values.first_period.passives.unpaid_taxes /
                              resultsOf("total_assets", "first_period")) *
                              100
                          )
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="passives"
                    id="unpaid_taxes-second_period"
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
                    value={
                      formik.values.second_period.passives.unpaid_taxes
                        ? Math.round(
                            (formik.values.second_period.passives.unpaid_taxes /
                              resultsOf("total_assets", "second_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.first_period.passives.unpaid_taxes &&
                      formik.values.second_period.passives.unpaid_taxes
                        ? Math.round(
                            ((formik.values.second_period.passives
                              .unpaid_taxes -
                              formik.values.first_period.passives
                                .unpaid_taxes) /
                              formik.values.first_period.passives
                                .unpaid_taxes) *
                              100
                          )
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="passives"
                    id="unpaid_taxes-third_period"
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
                    value={
                      formik.values.third_period.passives.unpaid_taxes
                        ? Math.round(
                            (formik.values.third_period.passives.unpaid_taxes /
                              resultsOf("total_assets", "third_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.third_period.passives.unpaid_taxes &&
                      formik.values.second_period.passives.unpaid_taxes
                        ? Math.round(
                            ((formik.values.third_period.passives.unpaid_taxes -
                              formik.values.second_period.passives
                                .unpaid_taxes) /
                              formik.values.second_period.passives
                                .unpaid_taxes) *
                              100
                          )
                        : null
                    }
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
                    VINCULADOS ECONÓMICOS
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="passives"
                    id="linked_economics-first_period"
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
                    type="number"
                    variant="standard"
                    disabled
                    value={
                      formik.values.first_period.passives.linked_economics
                        ? Math.round(
                            (formik.values.first_period.passives
                              .linked_economics /
                              resultsOf("total_assets", "first_period")) *
                              100
                          )
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="passives"
                    id="linked_economics-second_period"
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
                    value={
                      formik.values.second_period.passives.linked_economics
                        ? Math.round(
                            (formik.values.second_period.passives
                              .linked_economics /
                              resultsOf("total_assets", "second_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.first_period.passives.linked_economics &&
                      formik.values.second_period.passives.linked_economics
                        ? Math.round(
                            ((formik.values.second_period.passives
                              .linked_economics -
                              formik.values.first_period.passives
                                .linked_economics) /
                              formik.values.first_period.passives
                                .linked_economics) *
                              100
                          )
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="passives"
                    id="linked_economics-third_period"
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
                    value={
                      formik.values.third_period.passives.linked_economics
                        ? Math.round(
                            (formik.values.third_period.passives
                              .linked_economics /
                              resultsOf("total_assets", "third_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.third_period.passives.linked_economics &&
                      formik.values.second_period.passives.linked_economics
                        ? Math.round(
                            ((formik.values.third_period.passives
                              .linked_economics -
                              formik.values.second_period.passives
                                .linked_economics) /
                              formik.values.second_period.passives
                                .linked_economics) *
                              100
                          )
                        : null
                    }
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
                    PASIVOS ESTIMADOS Y PROV.
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="passives"
                    id="estimated_passives-first_period"
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
                    type="number"
                    variant="standard"
                    disabled
                    value={
                      formik.values.first_period.passives.estimated_passives
                        ? Math.round(
                            (formik.values.first_period.passives
                              .estimated_passives /
                              resultsOf("total_assets", "first_period")) *
                              100
                          )
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="passives"
                    id="estimated_passives-second_period"
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
                    value={
                      formik.values.second_period.passives.estimated_passives
                        ? Math.round(
                            (formik.values.second_period.passives
                              .estimated_passives /
                              resultsOf("total_assets", "second_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.first_period.passives.estimated_passives &&
                      formik.values.second_period.passives.estimated_passives
                        ? Math.round(
                            ((formik.values.second_period.passives
                              .estimated_passives -
                              formik.values.first_period.passives
                                .estimated_passives) /
                              formik.values.first_period.passives
                                .estimated_passives) *
                              100
                          )
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="passives"
                    id="estimated_passives-third_period"
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
                    value={
                      formik.values.third_period.passives.estimated_passives
                        ? Math.round(
                            (formik.values.third_period.passives
                              .estimated_passives /
                              resultsOf("total_assets", "third_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.third_period.passives.estimated_passives &&
                      formik.values.second_period.passives.estimated_passives
                        ? Math.round(
                            ((formik.values.third_period.passives
                              .estimated_passives -
                              formik.values.second_period.passives
                                .estimated_passives) /
                              formik.values.second_period.passives
                                .estimated_passives) *
                              100
                          )
                        : null
                    }
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
                    PASIVO CORRIENTE
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
                    value={resultsOf("current_liabilities", "first_period")}
                    id="current_liabilities-first_period"
                  >
                    {`$ ${resultsOf("current_liabilities", "first_period")}`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        (resultsOf("current_liabilities", "first_period") /
                          resultsOf("total_assets", "first_period")) *
                          100
                      ) || 0
                    }%`}
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
                    value={resultsOf("current_liabilities", "second_period")}
                    id="current_liabilities-second_period"
                  >
                    {`$ ${resultsOf("current_liabilities", "second_period")}`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        (resultsOf("current_liabilities", "second_period") /
                          resultsOf("total_assets", "second_period")) *
                          100
                      ) || 0
                    }%`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        ((resultsOf("current_liabilities", "second_period") -
                          resultsOf("current_liabilities", "first_period")) /
                          resultsOf("current_liabilities", "first_period")) *
                          100
                      ) || 0
                    }%`}
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
                    value={resultsOf("current_liabilities", "third_period")}
                    id="current_liabilities-third_period"
                  >
                    {`$ ${resultsOf("current_liabilities", "third_period")}`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        (resultsOf("current_liabilities", "third_period") /
                          resultsOf("total_assets", "third_period")) *
                          100
                      ) || 0
                    }%`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        ((resultsOf("current_liabilities", "third_period") -
                          resultsOf("current_liabilities", "second_period")) /
                          resultsOf("current_liabilities", "second_period")) *
                          100
                      ) || 0
                    }%`}
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
              {/* Segunda sección pasivos */}
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                mt="1%"
                alignItems="center"
              >
                <Box width="15%">
                  <InputTitles sx={{ fontSize: "0.7vw" }}>
                    OBLIGACIONES FINANCIERAS LP
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="passives"
                    id="financial_obligation_lp-first_period"
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
                    type="number"
                    variant="standard"
                    disabled
                    value={
                      formik.values.first_period.passives
                        .financial_obligation_lp
                        ? Math.round(
                            (formik.values.first_period.passives
                              .financial_obligation_lp /
                              resultsOf("total_assets", "first_period")) *
                              100
                          )
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="passives"
                    id="financial_obligation_lp-second_period"
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
                    value={
                      formik.values.second_period.passives
                        .financial_obligation_lp
                        ? Math.round(
                            (formik.values.second_period.passives
                              .financial_obligation_lp /
                              resultsOf("total_assets", "second_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.first_period.passives
                        .financial_obligation_lp &&
                      formik.values.second_period.passives
                        .financial_obligation_lp
                        ? Math.round(
                            ((formik.values.second_period.passives
                              .financial_obligation_lp -
                              formik.values.first_period.passives
                                .financial_obligation_lp) /
                              formik.values.first_period.passives
                                .financial_obligation_lp) *
                              100
                          )
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="passives"
                    id="financial_obligation_lp-third_period"
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
                    value={
                      formik.values.third_period.passives
                        .financial_obligation_lp
                        ? Math.round(
                            (formik.values.third_period.passives
                              .financial_obligation_lp /
                              resultsOf("total_assets", "third_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.third_period.passives
                        .financial_obligation_lp &&
                      formik.values.second_period.passives
                        .financial_obligation_lp
                        ? Math.round(
                            ((formik.values.third_period.passives
                              .financial_obligation_lp -
                              formik.values.second_period.passives
                                .financial_obligation_lp) /
                              formik.values.second_period.passives
                                .financial_obligation_lp) *
                              100
                          )
                        : null
                    }
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
                    OTROS LP, LEASING
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="passives"
                    id="other_lp_leasing-first_period"
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
                    type="number"
                    variant="standard"
                    disabled
                    value={
                      formik.values.first_period.passives.other_lp_leasing
                        ? Math.round(
                            (formik.values.first_period.passives
                              .other_lp_leasing /
                              resultsOf("total_assets", "first_period")) *
                              100
                          )
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="passives"
                    id="other_lp_leasing-second_period"
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
                    value={
                      formik.values.second_period.passives.other_lp_leasing
                        ? Math.round(
                            (formik.values.second_period.passives
                              .other_lp_leasing /
                              resultsOf("total_assets", "second_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.first_period.passives.other_lp_leasing &&
                      formik.values.second_period.passives.other_lp_leasing
                        ? Math.round(
                            ((formik.values.second_period.passives
                              .other_lp_leasing -
                              formik.values.first_period.passives
                                .other_lp_leasing) /
                              formik.values.first_period.passives
                                .other_lp_leasing) *
                              100
                          )
                        : null
                    }
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
                    onWheel={(e) => e.target.blur()}
                    variant="standard"
                    onChange={(e) => {
                      handleFieldChange(e);
                    }}
                    name="passives"
                    id="other_lp_leasing-third_period"
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
                    value={
                      formik.values.third_period.passives.other_lp_leasing
                        ? Math.round(
                            (formik.values.third_period.passives
                              .other_lp_leasing /
                              resultsOf("total_assets", "third_period")) *
                              100
                          )
                        : null
                    }
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
                    value={
                      formik.values.third_period.passives.other_lp_leasing &&
                      formik.values.second_period.passives.other_lp_leasing
                        ? Math.round(
                            ((formik.values.third_period.passives
                              .other_lp_leasing -
                              formik.values.second_period.passives
                                .other_lp_leasing) /
                              formik.values.second_period.passives
                                .other_lp_leasing) *
                              100
                          )
                        : null
                    }
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
                    PASIVOS DE LP
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
                    value={resultsOf("lp_passives", "first_period")}
                    id="lp_passives-first_period"
                  >
                    {`$ ${resultsOf("lp_passives", "first_period")}`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        (resultsOf("lp_passives", "first_period") /
                          resultsOf("total_assets", "first_period")) *
                          100
                      ) || 0
                    }%`}
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
                    value={resultsOf("lp_passives", "second_period")}
                    id="lp_passives-second_period"
                  >
                    {`$ ${resultsOf("lp_passives", "second_period")}`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        (resultsOf("lp_passives", "second_period") /
                          resultsOf("total_assets", "second_period")) *
                          100
                      ) || 0
                    }%`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        ((resultsOf("lp_passives", "second_period") -
                          resultsOf("lp_passives", "first_period")) /
                          resultsOf("lp_passives", "first_period")) *
                          100
                      ) || 0
                    }%`}
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
                    value={resultsOf("lp_passives", "third_period")}
                    id="lp_passives-third_period"
                  >
                    {`$ ${resultsOf("lp_passives", "third_period")}`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        (resultsOf("lp_passives", "third_period") /
                          resultsOf("total_assets", "third_period")) *
                          100
                      ) || 0
                    }%`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        ((resultsOf("lp_passives", "third_period") -
                          resultsOf("lp_passives", "second_period")) /
                          resultsOf("lp_passives", "second_period")) *
                          100
                      ) || 0
                    }%`}
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                height="100%"
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
                    TOTAL PASIVOS
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
                    value={resultsOf("total_passives", "first_period")}
                    id="total_passives-first_period"
                  >
                    {`$ ${resultsOf("total_passives", "first_period")}`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        (resultsOf("total_passives", "first_period") /
                          resultsOf("total_assets", "first_period")) *
                          100
                      ) || 0
                    }%`}
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
                    value={resultsOf("total_passives", "second_period")}
                    id="total_passives-second_period"
                  >
                    {`$ ${resultsOf("total_passives", "second_period")}`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        (resultsOf("total_passives", "second_period") /
                          resultsOf("total_assets", "second_period")) *
                          100
                      ) || 0
                    }%`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        ((resultsOf("total_passives", "second_period") -
                          resultsOf("total_passives", "first_period")) /
                          resultsOf("total_passives", "first_period")) *
                          100
                      ) || 0
                    }%`}
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
                    value={resultsOf("total_passives", "third_period")}
                    id="total_passives-third_period"
                  >
                    {`$ ${resultsOf("total_passives", "third_period")}`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        (resultsOf("total_passives", "third_period") /
                          resultsOf("total_assets", "third_period")) *
                          100
                      ) || 0
                    }%`}
                  </Typography>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.1vw"
                    fontWeight="500"
                    color="#488B8F"
                    marginLeft="10%"
                    width="15%"
                  >
                    {`${
                      Math.round(
                        ((resultsOf("total_passives", "third_period") -
                          resultsOf("total_passives", "second_period")) /
                          resultsOf("total_passives", "second_period")) *
                          100
                      ) || 0
                    }%`}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
