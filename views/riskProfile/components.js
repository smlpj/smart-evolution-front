import Image from "next/image";

import { Switch } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import bankSelect from "@components/selects/bankSelect"
import AccountTypeSelect from "@components/selects/accountTypeSelect";


import BackButton from "@styles/buttons/BackButton";
import MuiTextField from "@styles/fields";
import InputTitles from "@styles/inputTitles";
import scrollSx from "@styles/scroll";
import BankSelect from "@components/selects/bankSelect";

export const RiskProfileC = ({ formik, ToastContainer, loading, data }) => {
  return (
    <>
      <Box height="76vh" display="flex" flexDirection="column" marginLeft="5%">
        <Box
          container
          borderBottom="2px solid #A1A1A1"
          display="flex"
          flexDirection="column"
          sx={{ ...scrollSx }}
        >
          <Box display="flex" flexDirection="column">
            <BackButton path="/dashboard" />
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
                  <InputTitles marginBottom={2}>
                    Representante legal
                  </InputTitles>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.042vw"
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
                    fontSize="1.042vw"
                    fontWeight="medium"
                    color="#333333"
                  >
                    {`${data?.data?.email} `}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Typography
          letterSpacing={0}
          fontSize="1.242vw"
          fontWeight="regular"
          color="#488B8F"
          marginTop={"20px"}
        >
          Información de Análisis Financiero
        </Typography>
        <Box
          container
          display="flex"
          flexDirection="column"
          sx={{ ...scrollSx }}
        >
          <Box
            display={"flex"}
            flexDirection="row"
            marginTop={"20px"}
            sx={{ ...scrollSx }}
          >
            <Box display="flex" flexDirection="column" width={"35%"}>
            <InputTitles marginBottom={2}>Aplica GMF</InputTitles>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                width={"17vw"}
                bgcolor={"#fafafa"}
                borderRadius={"4px"}
                border={"0.1rem solid #5EA3A380"}
                padding={"0 7px 0 5px"}
                marginBottom={"30px"}
              >
                <Typography
                  variant="h6"
                  fontSize="0.9vw"
                  letterSpacing={0}
                  fontWeight="regular"
                  color="#333333"
                >
                  Aplica GMF
                </Typography>
                <Switch
                value={formik.values.gmf}
                checked={formik.values.gmf}
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
                      formik.setFieldValue("gmf", true);
                    } else {
                      formik.setFieldValue("gmf", false);
                    }
                  }}
                />
              </Box>
              <InputTitles marginBottom={2}>Aplica IVA</InputTitles>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                width={"17vw"}
                bgcolor={"#fafafa"}
                borderRadius={"4px"}
                border={"0.1rem solid #5EA3A380"}
                padding={"0 7px 0 5px"}
                marginBottom={"30px"}
              >
                <Typography
                  variant="h6"
                  fontSize="0.9vw"
                  letterSpacing={0}
                  fontWeight="regular"
                  color="#333333"
                >
                  Aplica IVA
                </Typography>
                <Switch
                value={formik.values.iva}
                checked={formik.values.iva}
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
                      formik.setFieldValue("iva", true);
                    } else {
                      formik.setFieldValue("iva", false);
                    }
                  }}
                />
              </Box>

              <Box>
              <InputTitles marginBottom={2}>Tasa de Inversionista</InputTitles>
              <MuiTextField
                id="discount_rate_investor"
                placeholder="Tasa de inversionista"
                name="discount_rate_investor"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.discount_rate_investor}
                variant="standard"
                margin="normal"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    marginTop: "-5px",
                  },
                }}
                sx={{
                  ['@media (max-width:1366px)']: { // eslint-disable-line no-useless-computed-key
                    width: '70%',
                    height: '3vh',
                  },
                  marginTop:'0',
                  width: "16.7vw",
                  height: "1.77vh",
                  marginBottom: "30px",
                }}
              />
              </Box>

              <Box>
              <InputTitles marginBottom={2}>Cupo Inversionista</InputTitles>
              <MuiTextField
                id="investor_balance"
                placeholder="Cupo Inversionista"
                name="investor_balance"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.investor_balance}
                variant="standard"
                margin="normal"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    marginTop: "-5px",
                  },
                }}
                sx={{
                  ['@media (max-width:1366px)']: { // eslint-disable-line no-useless-computed-key
                    width: '70%',
                    height: '3vh',
                  },
                  marginTop:'0',
                  width: "16.7vw",
                  height: "1.77vh",
                  marginBottom: "30px",
                }}
              />
              </Box>
              <Box display="flex" flexDirection="row">
                  <BankSelect formik={formik} />
              </Box>

              <Box>
              <InputTitles marginBottom={2} sx={{
                marginTop: "30px",
              }}>Numero de cuenta</InputTitles>
              <MuiTextField
                id="account_number"
                placeholder="Numero de cuenta"
                name="account_number"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.account_number}
                variant="standard"
                margin="normal"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    marginTop: "-5px",
                  },
                }}
                sx={{
                  ['@media (max-width:1366px)']: { // eslint-disable-line no-useless-computed-key
                    width: '70%',
                    height: '3vh',
                  },
                  marginTop:'0',
                  width: "17vw",
                  height: "1.77vh",
                  marginBottom: "30px",
                }}
              />
              </Box>

            </Box>
            <Box display="flex" flexDirection="column" width={"35%"}>
            <InputTitles marginBottom={2}>Aplica ICA</InputTitles>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                width={"17vw"}
                bgcolor={"#fafafa"}
                borderRadius={"4px"}
                border={"0.1rem solid #5EA3A380"}
                padding={"0 7px 0 5px"}
                marginBottom={"30px"}
              >
                <Typography
                  variant="h6"
                  fontSize="0.9vw"
                  letterSpacing={0}
                  fontWeight="regular"
                  color="#333333"
                >
                  Aplica ICA
                </Typography>
                <Switch
                value={formik.values.ica}
                checked={formik.values.ica}
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
                      formik.setFieldValue("ica", true);
                    } else {
                      formik.setFieldValue("ica", false);
                    }
                  }}
                />
              </Box>
              <Box>
              <InputTitles marginBottom={2}>Tasa de descuento</InputTitles>
              <MuiTextField
                id="discount_rate"
                placeholder="Tasa de descuento"
                name="discount_rate"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.discount_rate}
                variant="standard"
                margin="normal"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    marginTop: "-5px",
                  },
                }}
                sx={{
                  ['@media (max-width:1366px)']: { // eslint-disable-line no-useless-computed-key
                    width: '70%',
                    height: '3vh',
                  },
                  marginTop:'0',
                  width: "17vw",
                  height: "1.77vh",
                  marginBottom: "30px",
                }}
              />
              </Box>

              <Box>
              <InputTitles marginBottom={2}>Cupo Emisor</InputTitles>
              <MuiTextField
                id="emitter_balance"
                placeholder="Cupo Emisor"
                name="emitter_balance"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.emitter_balance}
                variant="standard"
                margin="normal"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    marginTop: "-5px",
                  },
                }}
                sx={{
                  ['@media (max-width:1366px)']: { // eslint-disable-line no-useless-computed-key
                    width: '70%',
                    height: '3vh',
                  },
                  marginTop:'0',
                  width: "16.7vw",
                  height: "1.77vh",
                  marginBottom: "30px",
                }}
              />
              </Box>

              <Box>
              <InputTitles marginBottom={2}>Cupo Pagador</InputTitles>
              <MuiTextField
                id="payer_balance"
                placeholder="Cupo Pagador"
                name="payer_balance"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.payer_balance}
                variant="standard"
                margin="normal"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    marginTop: "-5px",
                  },
                }}
                sx={{
                  ['@media (max-width:1366px)']: { // eslint-disable-line no-useless-computed-key
                    width: '70%',
                    height: '3vh',
                  },
                  marginTop:'0',
                  width: "16.7vw",
                  height: "1.77vh",
                  marginBottom: "30px",
                }}
              />
              </Box>

              <Box display="flex" flexDirection="row">
                  <AccountTypeSelect formik={formik} />
              </Box>
              
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              width={"30%"}
              justifyContent={"flex-end"}
            >
              <button onClick={formik.handleSubmit}>test</button>
            </Box>
          </Box>
        </Box>
      </Box>
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
    </>
  );
};
