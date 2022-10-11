import { IconButton, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import InputTitles from "../../styles/inputTitles";
import MuiTextField from "../../styles/fields";
import { ArrowForward, SearchOutlined } from "@mui/icons-material";
import CustomDataGrid from "../../styles/tables";
import { Link, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import Divider from "@mui/material/Divider";
import { useState } from "react";

export const BillsComponents = () => {
  const [rowsToModify, setRowsToModify] = useState([]);

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
    console.log(selectedRowsData);
    setRowsToModify(selectedRowsData);
  };

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
    {
      field: "ica",
      headerName: "RET. ICA",
      width: 90,
      sortable: false,
      renderCell: (params) => (
        <Typography
          fontFamily="Montserrat"
          fontSize="100%"
          width="100%"
          fontWeight="bold"
          color="#488B8F"
          backgroundColor="#488B8F1A"
          textTransform="uppercase"
          border="1px solid #488B8F"
          textAlign="right"
          padding="5.5% 8%"
          borderRadius="4px"
        >
          {params.value === 0 ? "%" : `${params.value}%`}
        </Typography>
      ),
    },
    {
      field: "fte",
      headerName: "RET. FTE",
      width: 90,
      sortable: false,
      renderCell: (params) => (
        <Typography
          fontFamily="Montserrat"
          fontSize="100%"
          width="100%"
          fontWeight="bold"
          color="#488B8F"
          backgroundColor="#488B8F1A"
          textTransform="uppercase"
          border="1px solid #488B8F"
          textAlign="right"
          padding="5.5% 8%"
          borderRadius="4px"
        >
          {params.value === 0 ? "%" : `${params.value}%`}
        </Typography>
      ),
    },
  ];

  const [rows, setRows] = useState([
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35, ica: 0, fte: 0 },
    {
      id: 2,
      lastName: "Lannister",
      firstName: "Cersei",
      age: 42,
      ica: 0,
      fte: 0,
    },
    {
      id: 3,
      lastName: "Lannister",
      firstName: "Jaime",
      age: 45,
      ica: 0,
      fte: 0,
    },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16, ica: 0, fte: 0 },
    {
      id: 5,
      lastName: "Targaryen",
      firstName: "Daenerys",
      age: null,
      ica: 0,
      fte: 0,
    },
    {
      id: 6,
      lastName: "Melisandre",
      firstName: null,
      age: 150,
      ica: 0,
      fte: 0,
    },
    {
      id: 7,
      lastName: "Clifford",
      firstName: "Ferrara",
      age: 44,
      ica: 0,
      fte: 0,
    },
    {
      id: 8,
      lastName: "Frances",
      firstName: "Rossini",
      age: 36,
      ica: 0,
      fte: 0,
    },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65, ica: 0, fte: 0 },
  ]);
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
              "&:hover": {
                backgroundColor: "#B5D1C9",
              },
              height: "100%",
            }}
            onClick={() => {}}
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
              "&:hover": {
                backgroundColor: "#B5D1C9",
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
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography
                letterSpacing={0}
                fontSize="85%"
                fontFamily="Montserrat"
                fontWeight="bold"
                color={rowsToModify.length === 0 ? "#488B8F50" : "#488B8F"}
                textTransform="uppercase"
                marginRight="0.5rem"
              >
                Valor Ret. ICA
              </Typography>
              <TextField
                id="ICA"
                placeholder="0,00%"
                disabled={rowsToModify.length === 0 ? true : false}
                type="number"
                variant="standard"
                sx={{
                  backgroundColor: "#488B8F1A",
                  opacity: rowsToModify.length === 0 ? "0.5" : "1",
                  border: "1px solid #488B8F",
                  borderRadius: "4px",
                  padding: "10px",
                  height: "0.8rem",
                  width: "5rem",
                  textAlign: "right",
                  alignContent: "center",
                  "input::-webkit-outer-spin-button": {
                    "-webkit-appearance": "none",
                    margin: 0,
                  },
                  "input::-webkit-inner-spin-button": {
                    "-webkit-appearance": "none",
                    margin: 0,
                  },
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
                      opacity: 1,
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
              <IconButton
                aria-label="save"
                disabled={rowsToModify.length === 0 ? true : false}
                sx={{
                  opacity: rowsToModify.length === 0 ? "0.5" : "1",
                  width: "2rem",
                  height: "2.2rem",
                  marginLeft: "0.2rem",
                  backgroundColor: "#488B8F",
                  padding: "0 1.3rem",
                  borderRadius: "4px",
                  "&:hover": {
                    backgroundColor: "#488B8F80",
                    transition: "0.3s",
                  },
                  "&:disabled": {
                    backgroundColor: "#488B8F",
                  },
                  transition:
                    "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",

                  "& .MuiButton-startIcon": { margin: 0 },
                }}
                onClick={() => {
                  console.log("clicked");
                }}
              >
                <ArrowForward sx={{ color: "white" }} />
              </IconButton>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              marginLeft={2}
            >
              <Typography
                letterSpacing={0}
                fontSize="85%"
                fontFamily="Montserrat"
                fontWeight="bold"
                color={rowsToModify.length === 0 ? "#488B8F50" : "#488B8F"}
                textTransform="uppercase"
                marginRight="0.5rem"
              >
                Valor Ret. Fte
              </Typography>
              <TextField
                id="FTE"
                placeholder="0,00%"
                disabled={rowsToModify.length === 0 ? true : false}
                type="number"
                variant="standard"
                sx={{
                  backgroundColor: "#488B8F1A",
                  opacity: rowsToModify.length === 0 ? "0.5" : "1",
                  border: "1px solid #488B8F",
                  borderRadius: "4px",
                  padding: "10px",
                  height: "0.8rem",
                  width: "5rem",
                  textAlign: "right",
                  alignContent: "center",
                  "input::-webkit-outer-spin-button": {
                    "-webkit-appearance": "none",
                    margin: 0,
                  },
                  "input::-webkit-inner-spin-button": {
                    "-webkit-appearance": "none",
                    margin: 0,
                  },
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
                      opacity: 1,
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
              <IconButton
                aria-label="save"
                disabled={rowsToModify.length === 0 ? true : false}
                sx={{
                  opacity: rowsToModify.length === 0 ? "0.5" : "1",
                  width: "2rem",
                  height: "2.2rem",
                  marginLeft: "0.2rem",
                  backgroundColor: "#488B8F",
                  padding: "0 1.3rem",
                  borderRadius: "4px",
                  "&:hover": {
                    backgroundColor: "#488B8F80",
                    transition: "0.3s",
                  },
                  "&:disabled": {
                    backgroundColor: "#488B8F",
                  },
                  transition:
                    "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",

                  "& .MuiButton-startIcon": { margin: 0 },
                }}
                onClick={() => {
                  console.log("clicked");
                }}
              >
                <ArrowForward sx={{ color: "white" }} />
              </IconButton>
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
            onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
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
