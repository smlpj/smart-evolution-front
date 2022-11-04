import { Fragment, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Switch } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import CIIUSelect from "@components/selects/CIIUSelect";
import BrokerSelect from "@components/selects/brokerSelect";
import CitizenshipSelect from "@components/selects/citizenshipSelect";
import CitySelect from "@components/selects/citySelect";
import ClientTypeSelect from "@components/selects/clientTypeSelect";
import DepartmentSelect from "@components/selects/departmentSelect";
import TypeIDSelect from "@components/selects/typeIdentitySelect";

import BackButton from "@styles/buttons/BackButton";
import MuiButton from "@styles/buttons/button";
import MuiTextField from "@styles/fields";
import HelperText from "@styles/helperText";
import InputTitles from "@styles/inputTitles";
import LoadingCircle from "@styles/loading";
import scrollSx from "@styles/scroll";

import { Button } from "@material-ui/core";

export const RiskProfileC = ({ formik, ToastContainer, loading, data }) => {
  return (
    <>
      <Box
        container
        display="flex"
        flexDirection="column"
        marginLeft={"1.5rem"}
        sx={{ ...scrollSx }}
      >
        <Box
          display="flex"
          flexDirection="column"
          borderBottom="2px solid #A1A1A1"
          marginBottom={"20px"}
        >
          <div style={{ marginLeft: "-0.8rem" }}>
            <BackButton path="/dashboard" />
          </div>
          <Box marginBottom={3}>
            <Typography
              letterSpacing={0}
              fontSize="1.8vw"
              fontWeight="regular"
              color="#488B8F"
            >
              Perfil De Riesgo
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column">
            <Box
              display="grid"
              gridTemplateColumns="1fr 1fr 1fr"
              gridTemplateRows="1fr 1fr"
              gap={3.5}
              width="80%"
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
              <Box display="flex" flexDirection="column">
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
              <Box display="flex" flexDirection="column">
                <InputTitles marginBottom={1}>PERFIL DE RIESGO</InputTitles>
                {(data?.data?.riskProfile === 0 ||
                  data?.data?.riskProfile === null) && (
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    padding="3% 8%"
                    width={"160px"}
                    borderRadius="4px"
                    backgroundColor="#488B8F"
                  >
                    <Image
                      src="/assets/Icon - Perfil de riesgo - Desconocido.svg"
                      width={30}
                      height={30}
                      alt="Perfil de riesgo desconocido"
                    />
                    <Typography
                      fontSize="80%"
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
                    width={"160px"}
                    borderRadius="4px"
                    backgroundColor="#488B8F"
                  >
                    <Image
                      src="/assets/Icon - Perfil de riesgo - Bajo.svg"
                      width={30}
                      height={30}
                      alt="Bajo"
                    />
                    <Typography
                      fontSize="80%"
                      width="100%"
                      fontWeight="bold"
                      color="#FFFFFF"
                      textTransform="uppercase"
                    >
                      Riesgo bajo
                    </Typography>
                  </Box>
                )}
                {data?.data?.riskProfile === 2 && (
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    padding="3% 8%"
                    width={"160px"}
                    borderRadius="4px"
                    backgroundColor="#488B8F"
                  >
                    <Image
                      src="/assets/Icon - Perfil de riesgo - Medio.svg"
                      width={30}
                      height={30}
                      alt="Icon - Perfil de riesgo - Medio"
                    />
                    <Typography
                      fontSize="80%"
                      width="100%"
                      fontWeight="bold"
                      color="#FFFFFF"
                      textTransform="uppercase"
                    >
                      Riesgo medio
                    </Typography>
                  </Box>
                )}
                {data?.data?.riskProfile === 3 && (
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    padding="3% 8%"
                    width={"160px"}
                    borderRadius="4px"
                    backgroundColor="#488B8F"
                  >
                    <Image
                      src="/assets/Icon - Perfil de riesgo - Alto.svg"
                      width={30}
                      height={30}
                      alt="Alto"
                    />
                    <Typography
                      fontSize="80%"
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
              <Box display="flex" flexDirection="column">
                <InputTitles marginBottom={2}>Representante legal</InputTitles>
                <Typography
                  letterSpacing={0}
                  fontSize="120%"
                  fontWeight="medium"
                  color="#333333"
                >
                  {`${
                    data?.data?.legalRepresentative[0]?.social_reason
                      ? data?.data?.legalRepresentative[0]?.social_reason
                      : `${data?.data?.legalRepresentative[0]?.first_name} 
                        ${data?.data?.legalRepresentative[0]?.last_name} `
                  } `}
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column">
                <InputTitles marginBottom={2}>Correo Electrónico</InputTitles>
                <Typography
                  letterSpacing={0}
                  fontSize="120%"
                  fontWeight="medium"
                  color="#333333"
                >
                  {`${data?.data?.email} `}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Typography
          letterSpacing={0}
          fontSize="1.8vw"
          fontWeight="regular"
          color="#488B8F"
        >
          Información de Análisis Financiero
        </Typography>
        <Box
          display={"flex"}
          flexDirection="row"
          gap={"20px"}
          marginTop={"20px"}
        >
          <Box display="flex" flexDirection="column" width={"35%"} sx={{ ...scrollSx }}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              width={"80%"}
              bgcolor={"#fafafa"}
              borderRadius={"4px"}
              border={"0.1rem solid #5EA3A380"}
              padding={"0 7px 0 5px"}
            >
              <Typography
                variant="h6"
                fontSize="1vw"
                letterSpacing={0}
                fontWeight="semiBold"
                color="#333333"
              >
                Aplica GMF
              </Typography>
              <Switch
                sx={{
                  "& .MuiSwitch-switchBase": {
                    "&.Mui-checked": {
                      color: "#FFFFFF",
                    },
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
                    console.log("yes");
                  } else {
                    console.log("no");
                  }
                }}
              />
            </Box>
            <div style={{height:'1000px'}}>x</div>
          </Box>
          <Box display="flex" flexDirection="column" width={"35%"}>
            form 2
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            width={"30%"}
            justifyContent={"flex-end"}
          >
            botones
          </Box>
        </Box>
      </Box>
    </>
  );
};
