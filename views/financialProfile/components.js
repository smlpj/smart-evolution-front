import { Box } from "@mui/system";
import { Typography, Link, SvgIcon } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Grid from "@material-ui/core/Grid";
import InputTitles from "../../styles/inputTitles";
import RiskButton from "../../styles/riesgos";
import Image from "next/image";
import { CircularProgress } from "@material-ui/core";

export default function FinancialProfile() {
  return (
    <>
      <Box
        height="73vh"
        display="flex"
        flexDirection="column"
        marginLeft="6rem"

        /* sx={{
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            position: "absolute",
            width: "9px",
            webkitAppearance: "none",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#CFDDDD",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#5EA3A3",
            backgroundClip: "content-box",
            borderColor: "transparent",
            borderStyle: "solid",
            borderWidth: "1px 2px",
            borderRadius: "10px",
          },
        }} */
      >
        <Box height="27vh" borderBottom="2px solid #A1A1A1" marginBottom={4}>
          <Box display="flex" flexDirection="column">
            <Link href="/dashboard" underline="none">
              <Box display="flex" flexDirection="row">
                <ArrowBackIcon fontSize="12px" sx={{ color: "#5EA3A3" }} />
                <Typography
                  letterSpacing={0}
                  fontSize="0.8rem"
                  fontFamily="Montserrat"
                  fontWeight="bold"
                  marginBottom="0.7rem"
                  textTransform="uppercase"
                  color="#5EA3A3"
                  marginLeft="0.5rem"
                >
                  Atrás
                </Typography>
              </Box>
            </Link>
            <Box marginBottom={3}>
              <Typography
                letterSpacing={0}
                fontSize="1.7rem"
                fontFamily="Montserrat"
                fontWeight="regular"
                marginBottom="0.7rem"
                color="#5EA3A3"
              >
                Perfil Financiero
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column">
              <Box
                display="grid"
                gridTemplateColumns="1fr 1fr 1fr 1fr"
                gridTemplateRows="1fr 1fr"
                gap={3}
              >
                <Box display="flex" flexDirection="column">
                  <InputTitles marginBottom={2}>N° ID</InputTitles>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.3rem"
                    fontFamily="Montserrat"
                    fontWeight="medium"
                    color="#333333"
                  >
                    12345
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column">
                  <InputTitles marginBottom={2}>Cliente</InputTitles>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.3rem"
                    fontFamily="Montserrat"
                    fontWeight="medium"
                    color="#333333"
                  >
                    Benfor S.A.S
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column">
                  <InputTitles marginBottom={2}>PERFIL DE RIESGO</InputTitles>
                  <RiskButton
                    width="2rem"
                    startIcon={
                      <Image
                        src="/assets/Icon - Perfil de riesgo - Alto.svg"
                        width={30}
                        height={30}
                      />
                    }
                  >
                    RIESGO ALTO
                  </RiskButton>
                </Box>
                <Box display="flex" flexDirection="column">
                  <InputTitles marginBottom={2}>INGRESADO POR</InputTitles>
                  <Box
                    border="2px solid #63595C"
                    padding="0rem 1rem"
                    borderRadius="4px"
                    width={70}
                  >
                    <Typography
                      letterSpacing={0}
                      fontSize="0.8rem"
                      fontFamily="Montserrat"
                      fontWeight="bold"
                      color="#333333"
                    >
                      ASESOR 1
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" flexDirection="column">
                  <InputTitles marginBottom={2}>NIT DEL CLIENTE</InputTitles>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.3rem"
                    fontFamily="Montserrat"
                    fontWeight="medium"
                    color="#333333"
                  >
                    123.456.789-2
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column">
                  <InputTitles marginBottom={2}>
                    REPRESENTANTE LEGAL
                  </InputTitles>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.3rem"
                    fontFamily="Montserrat"
                    fontWeight="medium"
                    color="#333333"
                  >
                    Juan Pablo Hernandez
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column">
                  <InputTitles marginBottom={2}>CORREO ELECTRÓNICO</InputTitles>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.3rem"
                    fontFamily="Montserrat"
                    fontWeight="medium"
                    color="#333333"
                  >
                    gerencia@benfor.com.co
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box height="46vh">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="row"
          >
            <CircularProgress
              variant="determinate"
              value={93}
              size="10.5vw"
              style={{
                backgroundColor: "white",
                color: "#488B8F",
                borderRadius: "50%",
              }}
              thickness={4.5}
            />
            <Box
              sx={{
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress
                variant="determinate"
                value={82}
                size="9vw"
                style={{
                  backgroundColor: "white",
                  color: "#CFDDDD",
                  borderRadius: "50%",
                }}
                thickness={4.5}
              />
              <Box
                sx={{
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress
                  variant="determinate"
                  value={45}
                  size="7.5vw"
                  style={{
                    backgroundColor: "white",
                    color: "#5EA3A333",
                    borderRadius: "50%",
                  }}
                  thickness={4.5}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
