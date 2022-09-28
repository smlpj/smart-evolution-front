import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Typography, SvgIcon } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import InputTitles from "../../styles/inputTitles";
import RiskButton from "../../styles/riesgos";
import Image from "next/image";
import { CircularProgress } from "@material-ui/core";
import SquareIcon from "@mui/icons-material/Square";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MuiTextField from "../../styles/fields";
import { Formik } from "formik";
import * as Yup from "yup";
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
  }, [router]);

  useEffect(() => {
    if (id) {
      fetch(id);
    }
  }, [id, loading]);

  const [tabValue, setTabValue] = useState("2022-I");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const [selectedFile2, setSelectedFile2] = useState();
  const [isFilePicked2, setIsFilePicked2] = useState(false);

  const [selectedFile3, setSelectedFile3] = useState();
  const [isFilePicked3, setIsFilePicked3] = useState(false);

  const [selectedFile4, setSelectedFile4] = useState();
  const [isFilePicked4, setIsFilePicked4] = useState(false);

  const [selectedFile5, setSelectedFile5] = useState();
  const [isFilePicked5, setIsFilePicked5] = useState(false);

  const [selectedFile6, setSelectedFile6] = useState();
  const [isFilePicked6, setIsFilePicked6] = useState(false);

  const [selectedFile7, setSelectedFile7] = useState();
  const [isFilePicked7, setIsFilePicked7] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const changeHandler2 = (event) => {
    setSelectedFile2(event.target.files[0]);
    setIsFilePicked2(true);
  };

  const changeHandler3 = (event) => {
    setSelectedFile3(event.target.files[0]);
    setIsFilePicked3(true);
  };

  const changeHandler4 = (event) => {
    setSelectedFile4(event.target.files[0]);
    setIsFilePicked4(true);
  };

  const changeHandler5 = (event) => {
    setSelectedFile5(event.target.files[0]);
    setIsFilePicked5(true);
  };

  const changeHandler6 = (event) => {
    setSelectedFile6(event.target.files[0]);
    setIsFilePicked6(true);
  };

  const changeHandler7 = (event) => {
    setSelectedFile7(event.target.files[0]);
    setIsFilePicked7(true);
  };

  const handleSubmission = () => {
    console.log(isFilePicked7);
  };

  return (
    <>
      <Box
        height="73vh"
        display="flex"
        flexDirection="column"
        marginLeft="6rem"
      >
        <Box
          container
          height="27vh"
          borderBottom="2px solid #A1A1A1"
          marginBottom={4}
          display="flex"
          flexDirection="column"
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
                gridTemplateColumns="1fr 1fr 1fr 1fr"
                gridTemplateRows="1fr 1fr"
                gap={3}
              >
                <Box display="flex" flexDirection="column">
                  <InputTitles marginBottom={2}>N° ID</InputTitles>
                  <Typography
                    letterSpacing={0}
                    fontSize="130%"
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
                    fontSize="130%"
                    fontFamily="Montserrat"
                    fontWeight="medium"
                    color="#333333"
                  >
                    {`${data?.data?.first_name} ${data?.data?.last_name}`}
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column">
                  <InputTitles marginBottom={2}>PERFIL DE RIESGO</InputTitles>

                  {data?.data?.riskProfile === null && (
                    <Link href={`/riskProfile?id=${id}`} underline="none">
                      <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="center"
                        textAlign="center"
                        alignItems="center"
                        padding="3% 8%"
                        borderRadius="4px"
                        width="40%"
                        backgroundColor="#488B8F"
                      >
                        <Typography
                          fontFamily="Montserrat"
                          fontSize="70%"
                          width="50%"
                          fontWeight="bold"
                          color="#FFFFFF"
                          textTransform="uppercase"
                        >
                          Cargar
                        </Typography>
                      </Box>
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
                    fontSize="130%"
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
                    fontSize="130%"
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
                    fontSize="130%"
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

        <Box
          container
          height="46vh"
          display="flex"
          flexDirection="column"
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
          <Box display="flex" flexDirection="row">
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
          </Box>

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
                              <PublishRounded
                                sx={{ margin: "0rem 0.7rem", color: "#5EA3A3" }}
                                fontSize="small"
                              />
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
                    <Box marginTop={4}>
                      <InputTitles marginBottom={2}>
                        Estado de situación financiera
                      </InputTitles>
                      <input
                        style={{ display: "none" }}
                        id="contained-button-file2"
                        name="file"
                        type="file"
                        onChange={changeHandler2}
                      />
                      <label
                        style={{ height: "3rem" }}
                        htmlFor="contained-button-file2"
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
                          <PublishRounded
                            sx={{ margin: "0rem 0.7rem", color: "#5EA3A3" }}
                            fontSize="small"
                          />
                        </FileUploadButton>
                      </label>
                    </Box>
                    <Box marginTop={4}>
                      <InputTitles marginBottom={2}>
                        Dictamen de estados financieros
                      </InputTitles>
                      <input
                        style={{ display: "none" }}
                        id="contained-button-file3"
                        name="file"
                        type="file"
                        onChange={changeHandler3}
                      />
                      <label
                        style={{ height: "3rem" }}
                        htmlFor="contained-button-file3"
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
                          <PublishRounded
                            sx={{ margin: "0rem 0.7rem", color: "#5EA3A3" }}
                            fontSize="small"
                          />
                        </FileUploadButton>
                      </label>
                    </Box>
                    <Box marginTop={4}>
                      <InputTitles marginBottom={2}>
                        Certificado de composición accionaria
                      </InputTitles>
                      <input
                        style={{ display: "none" }}
                        id="contained-button-file4"
                        name="file"
                        type="file"
                        onChange={changeHandler4}
                      />
                      <label
                        style={{ height: "3rem" }}
                        htmlFor="contained-button-file4"
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
                          <PublishRounded
                            sx={{ margin: "0rem 0.7rem", color: "#5EA3A3" }}
                            fontSize="small"
                          />
                        </FileUploadButton>
                      </label>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    marginTop={3}
                    marginLeft={15}
                  >
                    <Box>
                      <InputTitles marginBottom={2}>
                        Estado de flujo de efectivo
                      </InputTitles>
                      <input
                        style={{ display: "none" }}
                        id="contained-button-file5"
                        name="file"
                        type="file"
                        onChange={changeHandler5}
                      />
                      <label
                        style={{ height: "3rem" }}
                        htmlFor="contained-button-file5"
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
                          <PublishRounded
                            sx={{ margin: "0rem 0.7rem", color: "#5EA3A3" }}
                            fontSize="small"
                          />
                        </FileUploadButton>
                      </label>
                    </Box>
                    <Box marginTop={4}>
                      <InputTitles marginBottom={2}>
                        Informe de gestión - Periodo {tabValue}
                      </InputTitles>
                      <input
                        style={{ display: "none" }}
                        id="contained-button-file6"
                        name="file"
                        type="file"
                        onChange={changeHandler6}
                      />
                      <label
                        style={{ height: "3rem" }}
                        htmlFor="contained-button-file6"
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
                          <PublishRounded
                            sx={{ margin: "0rem 0.7rem", color: "#5EA3A3" }}
                            fontSize="small"
                          />
                        </FileUploadButton>
                      </label>
                    </Box>
                    <Box marginTop={4}>
                      <InputTitles marginBottom={2}>
                        Declaración de renta
                      </InputTitles>
                      <input
                        style={{ display: "none" }}
                        id="contained-button-file7"
                        name="file"
                        type="file"
                        onChange={changeHandler7}
                      />
                      <label
                        style={{ height: "3rem" }}
                        htmlFor="contained-button-file7"
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
                          <PublishRounded
                            sx={{ margin: "0rem 0.7rem", color: "#5EA3A3" }}
                            fontSize="small"
                          />
                        </FileUploadButton>
                      </label>
                    </Box>
                  </Box>
                </Box>
                <Fab
                  variant="extended"
                  onClick={handleSubmission}
                  sx={{
                    backgroundColor: "#5EA3A3",
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
                      backgroundColor: "#5EA3A380",
                    },
                  }}
                  aria-label="add"
                >
                  GUARDAR BORRADOR
                  <BookOutlined sx={{ ml: 1, fontSize: "medium" }} />
                </Fab>
                <Fab
                  variant="extended"
                  onClick={handleSubmission}
                  sx={{
                    backgroundColor: "#5EA3A3",
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
                      backgroundColor: "#5EA3A380",
                    },
                  }}
                  aria-label="add"
                >
                  GUARDAR DATOS ACTUALIZADOS
                  <SaveOutlined sx={{ ml: 1, fontSize: "medium" }} />
                </Fab>
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
