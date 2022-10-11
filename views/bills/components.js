import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import InputTitles from "../../styles/inputTitles";
import MuiTextField from "../../styles/fields";
import { ArrowForward, SearchOutlined } from "@mui/icons-material";
import CustomDataGrid from "../../styles/tables";
import { Link, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import Divider from "@mui/material/Divider";

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

export const BillsComponents = () => {
  return (
    <>
      <Box
        height="78vh"
        display="flex"
        flexDirection="column"
        marginLeft="5%"
        width="67.6%"
        position="fixed"
      >
        <Box display="flex" flexDirection="row" alignItems="center">
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
              }}
            >
              Atrás
            </Button>
          </Link>
          <Typography
            letterSpacing={0}
            fontSize="1.6rem"
            fontFamily="Montserrat"
            fontWeight="medium"
            marginBottom="0.7rem"
            color="#5EA3A3"
          >
            Control de Factura Electrónica
          </Typography>
          <Box flexGrow={1} />
          <Button
            variant="standard"
            startIcon={<UploadFileOutlinedIcon sx={{ color: "#488B8F" }} />}
            sx={{
              border: "2px solid #488B8F",
              borderRadius: "4px",
              hover: {
                backgroundColor: "#488B8F",
              },
              height: "100%",
            }}
          >
            <Typography
              letterSpacing={0}
              fontSize="90%"
              fontFamily="Montserrat"
              fontWeight="bold"
              color="#488B8F"
            >
              Extraer Factura
            </Typography>
          </Button>
          <Button
            variant="standard"
            startIcon={<UploadFileOutlinedIcon sx={{ color: "#488B8F" }} />}
            sx={{
              border: "2px solid #488B8F",
              borderRadius: "4px",
              hover: {
                backgroundColor: "#488B8F",
              },
              height: "100%",
              marginLeft: "0.6rem",
            }}
          >
            <Typography
              letterSpacing={0}
              fontSize="90%"
              fontFamily="Montserrat"
              fontWeight="bold"
              color="#488B8F"
            >
              Extraer Notas de Crédito
            </Typography>
          </Button>
        </Box>

        <Box display="flex" flexDirection="column" marginTop="1.5rem">
          <Typography
            letterSpacing={0}
            fontSize="95%"
            fontFamily="Montserrat"
            fontWeight="bold"
            color="#488B8F"
            textTransform="uppercase"
          >
            Cambios Globales
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            marginTop="0.5rem"
            alignItems="center"
          >
            <Typography
              letterSpacing={0}
              fontSize="95%"
              fontFamily="Montserrat"
              fontWeight="bold"
              color="#B5D1C9"
              textTransform="uppercase"
              marginRight="1.5rem"
            >
              Retenciones
            </Typography>
            <Typography
              letterSpacing={0}
              fontSize="85%"
              fontFamily="Montserrat"
              fontWeight="bold"
              color="#488B8F"
              textTransform="uppercase"
              marginRight="0.5rem"
            >
              Valor Ret. ICA
            </Typography>
            <TextField
              id="ICA"
              placeholder="0.00%"
              type="number"
              variant="standard"
              sx={{
                backgroundColor: "#488B8F1A",
                border: "1px solid #488B8F",
                borderRadius: "4px",
                padding: "10px",
                height: "0.8rem",
                width: "5rem",
                textAlign: "right",
                alignContent: "center",
                "& .MuiInputBase-input": {
                  padding: "2px",
                  fontFamily: "Montserrat",
                  color: "#488B8F",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  textAlign: "right",

                  "&::placeholder": {
                    color: "#488B8F",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    textAlign: "right",
                  },
                },
              }}
              InputProps={{
                disableUnderline: true,
                sx: {
                  marginTop: "-5px",
                },
              }}
            />
            <Box
              sx={{
                marginLeft: "0.2rem",
                backgroundColor: "#488B8F",
                padding: "0.25rem 0.4rem",
                borderRadius: "4px",
              }}
            >
              <ArrowForward sx={{ color: "white" }} />
            </Box>
            <Typography
              letterSpacing={0}
              fontSize="85%"
              fontFamily="Montserrat"
              fontWeight="bold"
              color="#488B8F"
              textTransform="uppercase"
              marginRight="0.5rem"
              marginLeft="0.7rem"
            >
              Valor Ref. FTE
            </Typography>
            <TextField
              id="ICA"
              placeholder="0.00%"
              type="text"
              variant="standard"
              sx={{
                backgroundColor: "#488B8F1A",
                border: "1px solid #488B8F",
                borderRadius: "4px",
                padding: "10px",
                height: "0.8rem",
                width: "5rem",
                textAlign: "right",
                alignContent: "center",
                "& .MuiInputBase-input": {
                  padding: "2px",
                  fontFamily: "Montserrat",
                  color: "#488B8F",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  textAlign: "right",

                  "&::placeholder": {
                    color: "#488B8F",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    textAlign: "right",
                  },
                },
              }}
              InputProps={{
                disableUnderline: true,
                sx: {
                  marginTop: "-5px",
                },
              }}
            />
            <Box
              sx={{
                marginLeft: "0.2rem",
                backgroundColor: "#488B8F",
                padding: "0.25rem 0.4rem",
                borderRadius: "4px",
              }}
            >
              <ArrowForward sx={{ color: "white" }} />
            </Box>
          </Box>
        </Box>
        <Divider sx={{ marginTop: 2, backgroundColor: "#B5D1C9" }} />
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
            checkboxSelection
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
