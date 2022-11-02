import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { BookOutlined, SaveOutlined } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";

import { useFetch } from "@hooks/useFetch";

import BackButton from "@styles/buttons/BackButton";
import FileUploadButton from "@styles/buttons/uploadFileButton";
import InputTitles from "@styles/inputTitles";
import scrollSx from "@styles/scroll";

import { GetCustomerById } from "./queries";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export const FinancialProfile = ({ formik }) => {
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
    }
  }, [id]);

  const [tabValue, setTabValue] = useState("2022-I");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubmission = () => {
    console.log(allFiles);
  };

  const [allFiles, setAllFiles] = useState({
    file1: null,
    file2: null,
    file3: null,
    file4: null,
    file5: null,
    file6: null,
  });

  const changeHandler = (event) => {
    setAllFiles({
      ...allFiles,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Box height="76vh" display="flex" flexDirection="column" marginLeft="5%">
        <Box
          container
          borderBottom="2px solid #A1A1A1"
          marginBottom={4}
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
                  <InputTitles marginBottom={1}>INGRESADO POR</InputTitles>
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
                      {`${data?.data?.entered_by?.first_name ?? ""} ${
                        data?.data?.entered_by?.last_name ?? ""
                      }`}
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" flexDirection="column">
                  <InputTitles marginBottom={1}>
                    REPRESENTANTE LEGAL
                  </InputTitles>
                  <Typography
                    letterSpacing={0}
                    fontSize="1.042vw"
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
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          container
          display="flex"
          flexDirection="column"
          sx={{ ...scrollSx }}
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
              <form onSubmit={formik.handleSubmit}>
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
                        <InputTitles marginBottom={1}>Balance</InputTitles>
                        <>
                          <input
                            style={{ display: "none" }}
                            id="file1"
                            name="file1"
                            type="file"
                            onChange={(e) => {
                              formik.setFieldValue(
                                "file1",
                                e.currentTarget.files[0]
                              );
                            }}
                          />
                          <label style={{ height: "3rem" }} htmlFor="file1">
                            <FileUploadButton component="span">
                              <Typography
                                alignContent="center"
                                letterSpacing={0}
                                fontSize="0.9rem"
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
                      </Box>
                      <Box>
                        <InputTitles mt={3} marginBottom={1}>
                          Hola2
                        </InputTitles>
                        <>
                          <input
                            style={{ display: "none" }}
                            id="file2"
                            name="file2"
                            type="file"
                            onChange={(e) => {
                              formik.setFieldValue(
                                "file2",
                                e.currentTarget.files[0]
                              );
                            }}
                          />
                          <label style={{ height: "3rem" }} htmlFor="file2">
                            <FileUploadButton component="span">
                              <Typography
                                alignContent="center"
                                letterSpacing={0}
                                fontSize="0.9rem"
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
                      </Box>
                      <Box>
                        <InputTitles mt={3} marginBottom={1}>
                          Hola
                        </InputTitles>
                        <>
                          <input
                            style={{ display: "none" }}
                            id="file3"
                            name="file3"
                            type="file"
                            onChange={(e) => {
                              getBase64(e.currentTarget.files[0]).then((data) =>
                                /* formik.setFieldValue("file3", data) */
                                console.log(data)
                              );
                            }}
                          />
                          <label style={{ height: "3rem" }} htmlFor="file3">
                            <FileUploadButton component="span">
                              <Typography
                                alignContent="center"
                                letterSpacing={0}
                                fontSize="0.9rem"
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
                      </Box>
                    </Box>
                  </Box>
                  <Button
                    variant="standard"
                    onClick={formik.handleSubmit}
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
                    onClick={() => handleSubmission()}
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
              </form>
            )}
            {tabValue === "2022-II" && <p>a</p>}
            {tabValue === "2022-III" && <p>a</p>}
          </Box>
        </Box>
      </Box>
    </>
  );
};
