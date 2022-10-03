import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Typography, SvgIcon, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import InputTitles from "../../styles/inputTitles";
import Image from "next/image";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FileUploadButton from "../../styles/uploadFileButton";
import { useFetch } from "../../shared/hooks/useFetch";
import Link from "next/link";
import {
  BookOutlined,
  PublishRounded,
  SaveOutlined,
} from "@mui/icons-material";
import Fab from "@mui/material/Fab";
import { useRouter } from "next/router";
import { GetCustomerById } from "./queries";

export default function FinancialProfile() {
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
      console.log(router.query);
      setID(router.query.id);
    }
  }, [router.query]);

  useEffect(() => {
    if (id) {
      fetch(id);
      console.log(data.data);
    }
  }, [id]);

  const [tabValue, setTabValue] = useState("2022-I");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = () => {
    console.log(isFilePicked);
  };

  return (
    <>
      <Box height="73vh" display="flex" flexDirection="column" marginLeft="5%">
        <Box
          container
          borderBottom="2px solid #A1A1A1"
          marginBottom={4}
          display="flex"
          flexDirection="column"
          height="27vh"
          sx={{
            scrollBehavior: "smooth",
            overflowY: "auto",
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
          }}
        >
          <Box display="flex" flexDirection="column">
            <Link href="/dashboard" underline="none">
              <Box display="flex" flexDirection="row">
                <ArrowBackIcon fontSize="50%" sx={{ color: "#5EA3A3" }} />
                <Typography
                  letterSpacing={0}
                  fontSize="80%"
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
                fontSize="170%"
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
                gridTemplateColumns="1fr 1fr 1fr"
                gridTemplateRows="1fr 1fr"
                gap={3}
                width="80%"
              >
                <Box display="flex" flexDirection="column">
                  <InputTitles marginBottom={2}>N° Identificación</InputTitles>
                  <Typography
                    letterSpacing={0}
                    fontSize="120%"
                    fontFamily="Montserrat"
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
                    fontFamily="Montserrat"
                    fontWeight="medium"
                    color="#333333"
                  >
                    {`${data?.data?.first_name ?? ""} ${
                      data?.data?.last_name ?? ""
                    } ${data?.data?.social_reason ?? ""}`}
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column">
                  <InputTitles marginBottom={2}>PERFIL DE RIESGO</InputTitles>

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
                          fontFamily="Montserrat"
                          fontSize="85.714%"
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
                        fontFamily="Montserrat"
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
                      />
                      <Typography
                        fontFamily="Montserrat"
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
                      />
                      <Typography
                        fontFamily="Montserrat"
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
                      />
                      <Typography
                        fontFamily="Montserrat"
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
                  <InputTitles marginBottom={2}>INGRESADO POR</InputTitles>
                  <Box borderRadius="4px">
                    <Typography
                      fontFamily="Montserrat"
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
                      {`${data?.data?.entered_by?.first_name ?? ""} ${
                        data?.data?.entered_by?.last_name ?? ""
                      }`}
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" flexDirection="column">
                  <InputTitles marginBottom={2}>
                    REPRESENTANTE LEGAL
                  </InputTitles>
                  <Typography
                    letterSpacing={0}
                    fontSize="120%"
                    fontFamily="Montserrat"
                    fontWeight="medium"
                    color="#333333"
                    noWrap
                  >
                    {`${data?.data?.legalRepresentative[0]?.first_name ?? ""} ${
                      data?.data?.legalRepresentative[0]?.last_name ?? ""
                    } 
                    ${data?.data?.legalRepresentative[0]?.social_reason ?? ""}`}
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column">
                  <InputTitles marginBottom={2}>CORREO ELECTRÓNICO</InputTitles>
                  <Typography
                    letterSpacing={0}
                    fontSize="120%"
                    fontFamily="Montserrat"
                    fontWeight="medium"
                    color="#333333"
                  >
                    {data?.data?.email ?? ""}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          container
          display="flex"
          flexDirection="column"
          height="46vh"
          sx={{
            scrollBehavior: "smooth",
            overflowY: "auto",
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
          }}
        >
          {/* <Box display="flex" flexDirection="row">
            <Box position="relative" height="auto">
              <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress
                  variant="determinate"
                  value={93}
                  size="12vw"
                  onClick={() => console.log("hola")}
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
                    value={75}
                    size="10vw"
                    onClick={() => console.log("chao")}
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
                      value={50}
                      size="8vw"
                      onClick={() => console.log("como tas")}
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
          <Box display="flex" flexDirection="row" marginLeft={3} marginTop={3}>
            <Box display="flex" flexDirection="row">
              <SquareIcon sx={{ color: "#E0EDED" }} />
              <Typography
                alignContent="center"
                letterSpacing={0}
                fontSize="0.9rem"
                fontFamily="Montserrat"
                fontWeight="regular"
                color="#333333"
              >
                - 2020
              </Typography>
            </Box>
            <Box display="flex" flexDirection="row">
              <SquareIcon sx={{ color: "#CFDDDD" }} />
              <Typography
                alignContent="center"
                letterSpacing={0}
                fontSize="0.9rem"
                fontFamily="Montserrat"
                fontWeight="regular"
                color="#333333"
              >
                - 2021
              </Typography>
            </Box>
            <Box display="flex" flexDirection="row">
              <SquareIcon sx={{ color: "#498B8F" }} />
              <Typography
                alignContent="center"
                letterSpacing={0}
                fontSize="0.9rem"
                fontFamily="Montserrat"
                fontWeight="regular"
                color="#333333"
              >
                - 2022
              </Typography>
            </Box>
          </Box> */}

          <Box
            sx={{ width: "100%", borderBottom: "2px solid #5EA3A3" }}
            marginTop={4}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="secondary tabs example"
              indicatorColor="transparent"
              sx={{
                "& button": {
                  border: "1.8px solid #5EA3A3",
                  borderRadius: "8px 8px 0px 0px",
                  marginRight: "0.2rem",
                  fontFamily: "Montserrat",
                  fontSize: "0.7rem",
                  color: "#5EA3A3",
                  height: "2rem",
                },
                "& button:hover": {
                  backgroundColor: "#5EA3A320",
                },
                "& button:focus": {
                  backgroundColor: "#5EA3A320",
                },
                "& button.Mui-selected": {
                  backgroundColor: "#498B8F",
                  color: "white",
                },
              }}
            >
              <Tab value="2022-I" label="Periodo I" />
              <Tab value="2022-II" label="Periodo II" />
              <Tab value="2022-III" label="Periodo III" />
              <Tab value="Historico-de-pedidos" label="Histórico de pedidos" />
            </Tabs>
          </Box>
          <Box sx={{ width: "100%" }}>
            {tabValue === "2022-I" && (
              <Box
                display="flex"
                flexDirection="column"
                position="relative"
                marginTop={3}
              >
                <Typography
                  alignContent="center"
                  letterSpacing={0}
                  fontSize="1.5rem"
                  fontFamily="Montserrat"
                  fontWeight="medium"
                  color="#333333"
                >
                  Periodo: {tabValue}
                </Typography>
                <Box
                  display="flex"
                  position="relative"
                  flexDirection="row"
                  marginTop={3}
                >
                  <Box display="flex" flexDirection="column" marginTop={3}>
                    <Box>
                      <InputTitles marginBottom={2}>Balance</InputTitles>
                      {!isFilePicked ? (
                        <>
                          <input
                            style={{ display: "none" }}
                            id="contained-button-file1"
                            name="file"
                            type="file"
                            onChange={changeHandler}
                          />
                          <label
                            style={{ height: "3rem" }}
                            htmlFor="contained-button-file1"
                          >
                            <FileUploadButton component="span">
                              <Typography
                                alignContent="center"
                                letterSpacing={0}
                                fontSize="0.9rem"
                                fontFamily="Montserrat"
                                fontWeight="regular"
                                textTransform="none"
                                padding="0.5rem 2.5rem 0.5rem 1rem"
                              >
                                Seleccione archivo a cargar
                              </Typography>

                              <Typography
                                fontFamily="icomoon"
                                fontSize="1.5rem"
                                color="#5EA3A3"
                                margin="0rem 0.7rem"
                              >
                                
                              </Typography>
                            </FileUploadButton>
                          </label>
                        </>
                      ) : (
                        <FileUploadButton disabled>
                          <Typography
                            alignContent="center"
                            letterSpacing={0}
                            fontSize="0.9rem"
                            fontFamily="Montserrat"
                            fontWeight="regular"
                            textTransform="none"
                            color="#63595C"
                            padding="0.5rem 2.5rem 0.5rem 1rem"
                          >
                            {selectedFile.name.length > 20
                              ? selectedFile.name.substring(0, 25) + "..."
                              : selectedFile.name}
                          </Typography>
                          <ArrowForwardIcon
                            fontSize="small"
                            sx={{ color: "#5EA3A3", marginRight: "0.5rem" }}
                          />
                        </FileUploadButton>
                      )}
                    </Box>
                  </Box>
                </Box>
                <Button
                  variant="standard"
                  onClick={handleSubmission}
                  sx={{
                    backgroundColor: "#488B8F",
                    borderRadius: "4px",
                    color: "#FFFFFF",
                    height: "3rem",
                    marginTop: "2rem",
                    marginBottom: "2rem",
                    position: "absolute",
                    bottom: "3.5rem",
                    right: "2rem",
                    fontSize: "0.7rem",
                    fontFamily: "Montserrat",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#5EA3A3",
                    },
                  }}
                  aria-label="add"
                >
                  GUARDAR BORRADOR
                  <BookOutlined sx={{ ml: 1, fontSize: "medium" }} />
                </Button>
                <Button
                  variant="standard"
                  onClick={handleSubmission}
                  sx={{
                    backgroundColor: "#488B8F",
                    borderRadius: "4px",
                    color: "#FFFFFF",
                    height: "3rem",
                    marginTop: "2rem",
                    marginBottom: "2rem",
                    position: "absolute",
                    bottom: "0rem",
                    right: "2rem",
                    fontSize: "0.7rem",
                    fontFamily: "Montserrat",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#5EA3A3",
                    },
                  }}
                  aria-label="add"
                >
                  GUARDAR DATOS ACTUALIZADOS
                  <SaveOutlined sx={{ ml: 1, fontSize: "medium" }} />
                </Button>
              </Box>
            )}
            {tabValue === "2022-II" && <p>a</p>}
            {tabValue === "2022-III" && <p>a</p>}
          </Box>
        </Box>
      </Box>
    </>
  );
}
