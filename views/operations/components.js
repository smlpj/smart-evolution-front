import { SearchOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

import MuiTextField from "@styles/fields";
import InputTitles from "@styles/inputTitles";
import CustomDataGrid from "@styles/tables";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export const OperationsComponents = () => {
  return (
    <>
      <Box
        height="78vh"
        display="flex"
        flexDirection="column"
        marginLeft="5%"
        width="67.6%"
        position="fixed"
        sx={{}}
      >
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

        <Box
          display="flex"
          flexDirection="row"
          mt={3}
          alignItems="center"
          height="45vh"
          minHeight="150px"
        >
          <Box
            display="flex"
            width="45%"
            flexWrap="wrap"
            justifyContent="center"
            gap={1}
          >
            <Box display="flex" flexDirection="column" width="45%">
              <InputTitles>Buscar N° Operación</InputTitles>

              <MuiTextField
                id="searchOperation"
                placeholder="N° Operación"
                type="text"
                variant="standard"
                margin="normal"
                sx={{}}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    marginTop: "-5px",
                  },
                  endAdornment: <SearchOutlined sx={{ color: "#5EA3A3" }} />,
                }}
              />
            </Box>
            <Box display="flex" flexDirection="column" width="45%">
              <InputTitles>Buscar N° Factura</InputTitles>
              <MuiTextField
                id="searchBill"
                placeholder="N° Factura"
                type="text"
                variant="standard"
                margin="normal"
                sx={{}}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    marginTop: "-5px",
                  },
                  endAdornment: <SearchOutlined sx={{ color: "#5EA3A3" }} />,
                }}
              />
            </Box>
            <Box display="flex" flexDirection="column" width="calc(90% + 8px)">
              <InputTitles>Buscar nombres</InputTitles>
              <MuiTextField
                id="searchName"
                placeholder="Nombre"
                type="text"
                variant="standard"
                margin="normal"
                sx={{}}
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
            justifyContent="center"
            width="55%"
            height="100%"
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
            <Box
              display="grid"
              gridTemplateColumns="1fr 1fr"
              gridTemplateRows="35px 35px 35px 35px 35px"
              padding="0.5rem 2rem"
              height="fit-content"
              columnGap={2.5}
              rowGap={1}
              sx={{
                "@media (max-height: 900px)": {
                  pt: 12,
                },
                backgroundColor: "#488B8F",
                borderRadius: "4px",
              }}
            >
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-end"
              >
                <Typography
                  letterSpacing={0}
                  fontSize="80%"
                  fontFamily="Montserrat"
                  fontWeight="bold"
                  color="#EBEBEB"
                  textTransform="uppercase"
                  textAlign="right"
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
                  width="55%"
                  textAlign="right"
                >
                  543.220.140
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-end"
              >
                <Typography
                  letterSpacing={0}
                  fontSize="80%"
                  fontFamily="Montserrat"
                  fontWeight="bold"
                  color="#EBEBEB"
                  textTransform="uppercase"
                  textAlign="right"
                >
                  Otros
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
                  width="55%"
                  textAlign="right"
                >
                  0
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-end"
              >
                <Typography
                  letterSpacing={0}
                  fontSize="80%"
                  fontFamily="Montserrat"
                  fontWeight="bold"
                  color="#EBEBEB"
                  textTransform="uppercase"
                  textAlign="right"
                >
                  IVA
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
                  width="55%"
                  textAlign="right"
                >
                  101.121.827
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-end"
              >
                <Typography
                  letterSpacing={0}
                  fontSize="80%"
                  fontFamily="Montserrat"
                  fontWeight="bold"
                  color="#EBEBEB"
                  textTransform="uppercase"
                  textAlign="right"
                >
                  Valor inversor
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
                  width="55%"
                  textAlign="right"
                >
                  49.483.766.518
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-end"
              >
                <Typography
                  letterSpacing={0}
                  fontSize="80%"
                  fontFamily="Montserrat"
                  fontWeight="bold"
                  color="#EBEBEB"
                  textTransform="uppercase"
                  textAlign="right"
                >
                  RETEFUENTE
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
                  width="55%"
                  textAlign="right"
                >
                  58.544.215
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-end"
              >
                <Typography
                  letterSpacing={0}
                  fontSize="80%"
                  fontFamily="Montserrat"
                  fontWeight="bold"
                  color="#EBEBEB"
                  textTransform="uppercase"
                  textAlign="right"
                >
                  FACTURAR NETO
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
                  width="55%"
                  textAlign="right"
                >
                  574.797.751
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-end"
              >
                <Typography
                  letterSpacing={0}
                  fontSize="80%"
                  fontFamily="Montserrat"
                  fontWeight="bold"
                  color="#EBEBEB"
                  textTransform="uppercase"
                  textAlign="right"
                >
                  RETEICA
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
                  width="55%"
                  textAlign="right"
                >
                  0
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-end"
              >
                <Typography
                  letterSpacing={0}
                  fontSize="80%"
                  fontFamily="Montserrat"
                  fontWeight="bold"
                  color="#EBEBEB"
                  textTransform="uppercase"
                  textAlign="right"
                >
                  VALOR FUTURO
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
                  width="55%"
                  textAlign="right"
                >
                  50.330.594.558
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-end"
              >
                <Typography
                  letterSpacing={0}
                  fontSize="80%"
                  fontFamily="Montserrat"
                  fontWeight="bold"
                  color="#EBEBEB"
                  textTransform="uppercase"
                  textAlign="right"
                >
                  RETEIVA
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
                  width="55%"
                  textAlign="right"
                >
                  0
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-end"
              >
                <Typography
                  letterSpacing={0}
                  fontSize="80%"
                  fontFamily="Montserrat"
                  fontWeight="bold"
                  color="#EBEBEB"
                  textTransform="uppercase"
                  textAlign="right"
                >
                  VALOR A GIRAR
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
                  width="55%"
                  textAlign="right"
                >
                  48.908.968.767
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          container
          marginTop={4}
          display="flex"
          flexDirection="column"
          width="100%"
          height="100%"
        >
          <CustomDataGrid
            rows={rows}
            columns={columns}
            pageSize={15}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            disableColumnMenu
            components={{
              ColumnSortedAscendingIcon: () => (
                <Typography fontFamily="icomoon" fontSize="0.7rem">
                  &#xe908;
                </Typography>
              ),

              ColumnSortedDescendingIcon: () => (
                <Typography fontFamily="icomoon" fontSize="0.7rem">
                  &#xe908;
                </Typography>
              ),
            }}
          />
        </Box>
      </Box>
    </>
  );
};
