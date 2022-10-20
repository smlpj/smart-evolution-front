import { Button, Grid, Typography, Box } from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const AdministrationComponents = () => {
  return (
    <>
      <Box
        marginLeft="5%"
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
      >
        <Box display="flex" flexDirection="column">
          <Link href="/dashboard" underline="none">
            <Button
              variant="standard"
              color="transparent"
              justifyContent="flex-start"
              alignItems="center"
              startIcon={<ArrowBackIcon sx={{ color: "#5EA3A3" }} />}
              sx={{
                width: "6%",
                height: "10%",
                fontFamily: "Montserrat",
                fontWeight: "bold",
                letterSpacing: "0",
                textTransform: "uppercase",
                color: "#5EA3A3",
                fontSize: "70%",
                borderRadius: "4px",
                padding: "15px",
              }}
            >
              Atrás
            </Button>
          </Link>
          <Typography
            letterSpacing={0}
            fontSize="1.5vw"
            fontFamily="Montserrat"
            fontWeight="medium"
            marginBottom="0.7rem"
            color="#5EA3A3"
          >
            Administración
          </Typography>
          <Typography
            letterSpacing={0}
            fontSize="1.2vw"
            fontFamily="Montserrat"
            fontWeight="medium"
            marginBottom="0.7rem"
            color="#333333"
          >
            Bienvenido al módulo de Administración.
            <br />A continuación selecciona a donde deseas acceder
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          width="95%"
          height="100%"
        >
          <Link
            href="/administration/deposit-emitter/depositList"
            underline="none"
          >
            <Box
              height="100%"
              width="24%"
              display="flex"
              justifyContent="space-between"
              flexDirection="column"
              sx={{
                borderRadius: "4px",
                border: "2px solid #488B8F",
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "#CFDDDD",
                },
                cursor: "pointer",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box flexGrow={0} />
              <Box textAlign="center">
                <i
                  className="fa-regular fa-paper-plane"
                  style={{
                    fontSize: "3rem",
                    color: "#488B8F",
                    marginBottom: "1.5rem",
                  }}
                ></i>
                <Typography
                  letterSpacing={0}
                  fontSize="80%"
                  fontFamily="Montserrat"
                  fontWeight="bold"
                  color="#488B8F"
                  textTransform="uppercase"
                >
                  Giros Emisor
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                  border: "2px solid #488B8F",
                  padding: "0.5rem 0.7rem",
                  marginBottom: "3rem",
                }}
              >
                <Typography
                  letterSpacing={0}
                  fontSize="80%"
                  fontFamily="Montserrat"
                  fontWeight="bold"
                  color="#488B8F"
                  textTransform="uppercase"
                >
                  Acceder a esta sección
                </Typography>
                <ArrowBackIcon
                  sx={{
                    color: "#488B8F",
                    transform: "rotate(180deg)",
                    marginLeft: "0.5rem",
                  }}
                />
              </Box>
            </Box>
          </Link>
          <Link
            href="/administration/deposit-investor/depositList"
            underline="none"
          >
            <Box
              height="100%"
              width="24%"
              display="flex"
              justifyContent="space-between"
              flexDirection="column"
              sx={{
                borderRadius: "4px",
                border: "2px solid #488B8F",
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "#CFDDDD",
                },
                cursor: "pointer",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box flexGrow={0} />
              <Box textAlign="center">
                <i
                  className="fa-regular fa-paper-plane"
                  style={{
                    fontSize: "3rem",
                    color: "#488B8F",
                    marginBottom: "1.5rem",
                  }}
                ></i>
                <Typography
                  letterSpacing={0}
                  fontSize="80%"
                  fontFamily="Montserrat"
                  fontWeight="bold"
                  color="#488B8F"
                  textTransform="uppercase"
                >
                  Giros Inversionista
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                  border: "2px solid #488B8F",
                  padding: "0.5rem 0.7rem",
                  marginBottom: "3rem",
                }}
              >
                <Typography
                  letterSpacing={0}
                  fontSize="80%"
                  fontFamily="Montserrat"
                  fontWeight="bold"
                  color="#488B8F"
                  textTransform="uppercase"
                >
                  Acceder a esta sección
                </Typography>
                <ArrowBackIcon
                  sx={{
                    color: "#488B8F",
                    transform: "rotate(180deg)",
                    marginLeft: "0.5rem",
                  }}
                />
              </Box>
            </Box>
          </Link>
          <Link
            href="/administration/deposit-emitter/depositList"
            underline="none"
          >
            <Box
              height="100%"
              width="24%"
              display="flex"
              justifyContent="space-between"
              flexDirection="column"
              sx={{
                borderRadius: "4px",
                border: "2px solid #488B8F",
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "#CFDDDD",
                },
                cursor: "pointer",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box flexGrow={0} />
              <Box textAlign="center">
                <i
                  class="fa-regular fa-handshake"
                  style={{
                    fontSize: "3rem",
                    color: "#488B8F",
                    marginBottom: "1.5rem",
                  }}
                ></i>
                <Typography
                  letterSpacing={0}
                  fontSize="80%"
                  fontFamily="Montserrat"
                  fontWeight="bold"
                  color="#488B8F"
                  textTransform="uppercase"
                >
                  Negociaciones
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                  border: "2px solid #488B8F",
                  padding: "0.5rem 0.7rem",
                  marginBottom: "3rem",
                }}
              >
                <Typography
                  letterSpacing={0}
                  fontSize="80%"
                  fontFamily="Montserrat"
                  fontWeight="bold"
                  color="#488B8F"
                  textTransform="uppercase"
                >
                  Acceder a esta sección
                </Typography>
                <ArrowBackIcon
                  sx={{
                    color: "#488B8F",
                    transform: "rotate(180deg)",
                    marginLeft: "0.5rem",
                  }}
                />
              </Box>
            </Box>
          </Link>
          <Link
            href="/administration/deposit-emitter/depositList"
            underline="none"
          >
            <Box
              height="100%"
              width="24%"
              display="flex"
              justifyContent="space-between"
              flexDirection="column"
              sx={{
                borderRadius: "4px",
                border: "2px solid #488B8F",
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "#CFDDDD",
                },
                cursor: "pointer",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box flexGrow={0} />
              <Box textAlign="center">
                <i
                  className="fa-solid fa-person-walking-arrow-loop-left"
                  style={{
                    fontSize: "3rem",
                    color: "#488B8F",
                    marginBottom: "1.5rem",
                  }}
                ></i>
                <Typography
                  letterSpacing={0}
                  fontSize="80%"
                  fontFamily="Montserrat"
                  fontWeight="bold"
                  color="#488B8F"
                  textTransform="uppercase"
                >
                  Giros Emisor
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                  border: "2px solid #488B8F",
                  padding: "0.5rem 0.7rem",
                  marginBottom: "3rem",
                }}
              >
                <Typography
                  letterSpacing={0}
                  fontSize="80%"
                  fontFamily="Montserrat"
                  fontWeight="bold"
                  color="#488B8F"
                  textTransform="uppercase"
                >
                  Acceder a esta sección
                </Typography>
                <ArrowBackIcon
                  sx={{
                    color: "#488B8F",
                    transform: "rotate(180deg)",
                    marginLeft: "0.5rem",
                  }}
                />
              </Box>
            </Box>
          </Link>
        </Box>
      </Box>
    </>
  );
};
