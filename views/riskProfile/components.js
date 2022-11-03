import { Fragment, useState } from "react";

import Image from "next/image";
import Link from "next/link";

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

import MuiButton from "@styles/buttons/button";
import MuiTextField from "@styles/fields";
import HelperText from "@styles/helperText";
import InputTitles from "@styles/inputTitles";
import LoadingCircle from "@styles/loading";
import scrollSx from "@styles/scroll";

import { Button } from "@material-ui/core";
import { Switch } from "@mui/material";

export const RiskProfileC = ({ formik, ToastContainer, loading, data }) => {
return (
    <>
      <Typography
        letterSpacing={0}
        fontSize="170%"
        fontWeight="regular"
        marginBottom="3rem"
        color="#5EA3A3"
        marginLeft={'1.5rem'}

      >
        Perfil De Riesgo
      </Typography>
    <Box height="76vh" display="flex" flexDirection="column" width="75%" position="fixed" marginLeft="1.5%">

    <Box
    display={'flex'}
    flexDirection={'row'}
    width={'100%'}
    borderBottom={'2px solid black'}
    >
        <Box
          display="grid"
          gridTemplateColumns="1fr 1fr 1fr"
          gridTemplateRows="1fr 1fr"
          gap={5}
          width="80%"
        >
            <Box display="flex" flexDirection="column">
              <InputTitles marginBottom={2}>N° Identificación</InputTitles>
              <Typography
                letterSpacing={0}
                fontSize="120%"
                fontWeight="medium"
                color="#333333"
              >
                {data?.data?.document_number}
              </Typography>
            </Box>

            <Box display="flex" flexDirection="column">
                <InputTitles marginBottom={2}>Cliente</InputTitles>
                <Typography
                  letterSpacing={0}
                  fontSize="120%"
                  fontWeight="medium"
                  color="#333333"
                >
                  {`${data?.data?.social_reason ? data?.data?.social_reason : data?.data?.first_name} ${data?.data?.last_name}`}
                </Typography>
            </Box>

            <Box display="flex" flexDirection="column">
                <InputTitles marginBottom={2}>INGRESADO POR</InputTitles>
                <Box borderRadius="4px">
                  <Typography
                    fontSize="80%"
                    fontWeight="bold"
                    color="#63595C"
                    backgroundColor="transparent"
                    textTransform="uppercase"
                    borderRadius="4px"
                    display="inline-block"
                    border="1.4px solid #63595C"
                    padding="4px 8px"
                  >
                    {`${data?.data?.entered_by?.first_name ?? ""} ${ data?.data?.entered_by?.last_name ?? "" }`}
                  </Typography>
                </Box>
            </Box>

            <Box display="flex" flexDirection="column">
              <InputTitles marginBottom={2}>Representante legal</InputTitles>
              <Typography
                letterSpacing={0}
                fontSize="120%"
                fontWeight="medium"
                color="#333333"
              >
                {`${data?.data?.legalRepresentative[0]?.social_reason ? 
                  data?.data?.legalRepresentative[0]?.social_reason 
                  : `${data?.data?.legalRepresentative[0]?.first_name} 
                      ${data?.data?.legalRepresentative[0]?.last_name} `} `}
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

        <Box 
        width={'30%'}
        height={'100%'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-around'}
        >
          {(data?.data?.riskProfile === null || data?.data?.riskProfile === 0)   && (
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              textAlign="center"
              alignItems="center"
              width="180px"
              padding="3% 8%"
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
                  borderRadius="4px"
                  backgroundColor="#488B8F"
                >
                  <Image
                    src="/assets/Icon - Perfil de riesgo - Bajo.svg"
                    width={30}
                    height={30}
                    alt="Perfil de riesgo bajo"
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
                        alt="Perfil de riesgo medio"
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
                        alt="Perfil de riesgo alto"
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
    </Box>

    <Box display={'flex'} flexDirection={'row'} bgcolor={'red'} sx={{ ...scrollSx}} height={'46vh'}>
    

    <Box width={'40%'} display={'flex'} flexDirection={'column'} justifyContent={'space-around'}>

    </Box>
    <Box width={'40%'} display={'flex'} flexDirection={'column'}  justifyContent={'space-around'}>
      <div style={{height: '2000px'}}>

      </div>
    </Box>
    <Box width={'20%'} display={'flex'} flexDirection={'column'} justifyContent={'flex-end'}>
      boton de guardado
    </Box>



    </Box>
    
    </Box>
    </>
);
};
