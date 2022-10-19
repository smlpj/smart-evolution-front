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
            fontSize="170%"
            fontFamily="Montserrat"
            fontWeight="medium"
            marginBottom="0.7rem"
            color="#5EA3A3"
          >
            Administración
          </Typography>
          <Typography
            letterSpacing={0}
            fontSize="150%"
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
          justifyContent="space-between"
          alignItems="center"
          width="95%"
          height="100%"
        >
          <Link
            href="/administration/deposit-emitter/depositList"
            underline="none"
          >
            <Box
              height="100%"
              width="25%"
              display="flex"
              flexDirection="column"
              sx={{
                borderRadius: "4px",
                border: "1px solid #488B8F",
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "#CFDDDD",
                },
                cursor: "pointer",
                justifyContent: "center",
                alignItems: "center",
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
                Giros Emisor
              </Typography>
            </Box>
          </Link>
        </Box>
      </Box>
    </>
  );
};
