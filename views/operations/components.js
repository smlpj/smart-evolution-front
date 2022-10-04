import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import InputTitles from "../../styles/inputTitles";
import MuiTextField from "../../styles/fields";
import { SearchOutlined } from "@mui/icons-material";

export const OperationsComponents = () => {
  return (
    <>
      <Box height="73vh" display="flex" flexDirection="column" marginLeft="5%">
        <Typography
          letterSpacing={0}
          fontSize="1.7rem"
          fontFamily="Montserrat"
          fontWeight="regular"
          marginBottom="0.7rem"
          color="#5EA3A3"
        >
          Consulta de Operaciones
        </Typography>

        <Box display="flex" flexDirection="row" mt={3}>
          <Box display="flex" flexDirection="column" width="45%">
            <Box display="flex" flexDirection="column">
              <InputTitles>Buscar N° Operación</InputTitles>
              <MuiTextField
                id="searchOperation"
                placeholder="N° Operación"
                type="text"
                variant="standard"
                margin="normal"
                sx={{
                  width: "60%",
                }}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    marginTop: "-5px",
                  },
                  endAdornment: <SearchOutlined sx={{ color: "#5EA3A3" }} />,
                }}
              />
            </Box>
            <Box display="flex" flexDirection="column" mt={4}>
              <InputTitles>Buscar N° Factura</InputTitles>
              <MuiTextField
                id="searchInvoice"
                placeholder="N° Factura"
                type="text"
                variant="standard"
                margin="normal"
                sx={{
                  width: "60%",
                }}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    marginTop: "-5px",
                  },
                  endAdornment: <SearchOutlined sx={{ color: "#5EA3A3" }} />,
                }}
              />
            </Box>
            <Box display="flex" flexDirection="column" mt={4}>
              <InputTitles>Buscar nombres</InputTitles>
              <MuiTextField
                id="searchName"
                placeholder="Nombre"
                type="text"
                variant="standard"
                margin="normal"
                sx={{
                  width: "60%",
                }}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    marginTop: "-5px",
                  },
                  endAdornment: <SearchOutlined sx={{ color: "#5EA3A3" }} />,
                }}
              />
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            width="55%"
            sx={{
              backgroundColor: "#488B8F",
              borderRadius: "4px",
            }}
          >
            <Box
              display="grid"
              gridTemplateColumns="1fr 1fr"
              gridTemplateRows="1fr 1fr 1fr 1fr 1fr"
              gap={2}
              padding="1rem 2rem"
            >
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography
                  letterSpacing={0}
                  fontSize="80%"
                  fontFamily="Montserrat"
                  fontWeight="bold"
                  color="#EBEBEB"
                  textTransform="uppercase"
                >
                  Comisión
                </Typography>
                <Typography
                  letterSpacing={0}
                  fontSize="90%"
                  fontFamily="Montserrat"
                  fontWeight="500"
                  color="#EBEBEB"
                  border="1px solid #C7C7C780"
                  borderRadius="4px"
                  backgroundColor="#5B979A"
                  padding="0.35rem"
                  ml={1}
                  width="45%"
                  textAlign="right"
                >
                  543.220.140
                </Typography>
              </Box>
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography
                  letterSpacing={0}
                  fontSize="80%"
                  fontFamily="Montserrat"
                  fontWeight="bold"
                  color="#EBEBEB"
                  textTransform="uppercase"
                >
                  Comisión
                </Typography>
                <Typography
                  letterSpacing={0}
                  fontSize="90%"
                  fontFamily="Montserrat"
                  fontWeight="500"
                  color="#EBEBEB"
                  border="1px solid #C7C7C780"
                  borderRadius="4px"
                  backgroundColor="#5B979A"
                  padding="0.35rem"
                  ml={1}
                  width="45%"
                  textAlign="right"
                >
                  543.220.140
                </Typography>
              </Box>
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography
                  letterSpacing={0}
                  fontSize="80%"
                  fontFamily="Montserrat"
                  fontWeight="bold"
                  color="#EBEBEB"
                  textTransform="uppercase"
                >
                  Comisión
                </Typography>
                <Typography
                  letterSpacing={0}
                  fontSize="90%"
                  fontFamily="Montserrat"
                  fontWeight="500"
                  color="#EBEBEB"
                  border="1px solid #C7C7C780"
                  borderRadius="4px"
                  backgroundColor="#5B979A"
                  padding="0.35rem"
                  ml={1}
                  width="45%"
                  textAlign="right"
                >
                  543.220.140
                </Typography>
              </Box>
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography
                  letterSpacing={0}
                  fontSize="80%"
                  fontFamily="Montserrat"
                  fontWeight="bold"
                  color="#EBEBEB"
                  textTransform="uppercase"
                >
                  Comisión
                </Typography>
                <Typography
                  letterSpacing={0}
                  fontSize="90%"
                  fontFamily="Montserrat"
                  fontWeight="500"
                  color="#EBEBEB"
                  border="1px solid #C7C7C780"
                  borderRadius="4px"
                  backgroundColor="#5B979A"
                  padding="0.35rem"
                  ml={1}
                  width="45%"
                  textAlign="right"
                >
                  543.220.140
                </Typography>
              </Box>
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography
                  letterSpacing={0}
                  fontSize="80%"
                  fontFamily="Montserrat"
                  fontWeight="bold"
                  color="#EBEBEB"
                  textTransform="uppercase"
                >
                  Comisión
                </Typography>
                <Typography
                  letterSpacing={0}
                  fontSize="90%"
                  fontFamily="Montserrat"
                  fontWeight="500"
                  color="#EBEBEB"
                  border="1px solid #C7C7C780"
                  borderRadius="4px"
                  backgroundColor="#5B979A"
                  padding="0.35rem"
                  ml={1}
                  width="45%"
                  textAlign="right"
                >
                  543.220.140
                </Typography>
              </Box>
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography
                  letterSpacing={0}
                  fontSize="80%"
                  fontFamily="Montserrat"
                  fontWeight="bold"
                  color="#EBEBEB"
                  textTransform="uppercase"
                >
                  Comisión
                </Typography>
                <Typography
                  letterSpacing={0}
                  fontSize="90%"
                  fontFamily="Montserrat"
                  fontWeight="500"
                  color="#EBEBEB"
                  border="1px solid #C7C7C780"
                  borderRadius="4px"
                  backgroundColor="#5B979A"
                  padding="0.35rem"
                  ml={1}
                  width="45%"
                  textAlign="right"
                >
                  543.220.140
                </Typography>
              </Box>
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography
                  letterSpacing={0}
                  fontSize="80%"
                  fontFamily="Montserrat"
                  fontWeight="bold"
                  color="#EBEBEB"
                  textTransform="uppercase"
                >
                  Comisión
                </Typography>
                <Typography
                  letterSpacing={0}
                  fontSize="90%"
                  fontFamily="Montserrat"
                  fontWeight="500"
                  color="#EBEBEB"
                  border="1px solid #C7C7C780"
                  borderRadius="4px"
                  backgroundColor="#5B979A"
                  padding="0.35rem"
                  ml={1}
                  width="45%"
                  textAlign="right"
                >
                  543.220.140
                </Typography>
              </Box>
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography
                  letterSpacing={0}
                  fontSize="80%"
                  fontFamily="Montserrat"
                  fontWeight="bold"
                  color="#EBEBEB"
                  textTransform="uppercase"
                >
                  Comisión
                </Typography>
                <Typography
                  letterSpacing={0}
                  fontSize="90%"
                  fontFamily="Montserrat"
                  fontWeight="500"
                  color="#EBEBEB"
                  border="1px solid #C7C7C780"
                  borderRadius="4px"
                  backgroundColor="#5B979A"
                  padding="0.35rem"
                  ml={1}
                  width="45%"
                  textAlign="right"
                >
                  543.220.140
                </Typography>
              </Box>
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography
                  letterSpacing={0}
                  fontSize="80%"
                  fontFamily="Montserrat"
                  fontWeight="bold"
                  color="#EBEBEB"
                  textTransform="uppercase"
                >
                  Comisión
                </Typography>
                <Typography
                  letterSpacing={0}
                  fontSize="90%"
                  fontFamily="Montserrat"
                  fontWeight="500"
                  color="#EBEBEB"
                  border="1px solid #C7C7C780"
                  borderRadius="4px"
                  backgroundColor="#5B979A"
                  padding="0.35rem"
                  ml={1}
                  width="45%"
                  textAlign="right"
                >
                  543.220.140
                </Typography>
              </Box>
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography
                  letterSpacing={0}
                  fontSize="80%"
                  fontFamily="Montserrat"
                  fontWeight="bold"
                  color="#EBEBEB"
                  textTransform="uppercase"
                >
                  Comisión
                </Typography>
                <Typography
                  letterSpacing={0}
                  fontSize="90%"
                  fontFamily="Montserrat"
                  fontWeight="500"
                  color="#EBEBEB"
                  border="1px solid #C7C7C780"
                  borderRadius="4px"
                  backgroundColor="#5B979A"
                  padding="0.35rem"
                  ml={1}
                  width="45%"
                  textAlign="right"
                >
                  543.220.140
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
