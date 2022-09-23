import { Button } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import Link from "next/link";
import InputTitles from "../../../styles/inputTitles";
import { DataGrid } from "@mui/x-data-grid";
import { GetClientList } from "./queries";
import { useFetch } from "../../../shared/hooks/useFetch";
import { useEffect, useState } from "react";
import CustomDataGrid from "../../../styles/tables";

const columns = [
  {
    field: "Customer",
    headerName: "CLIENTE",
    width: 130,
    renderCell: (params) => {
      return <InputTitles>{params.value}</InputTitles>;
    },
  },
  {
    field: "Status",
    headerName: "ESTATUS",
    width: 130,
    renderCell: (params) => {
      return (
        <Typography
          fontFamily="Montserrat"
          fontSize="80%"
          fontWeight="bold"
          color="#488B8F"
          backgroundColor="#B5D1C9"
          textTransform="uppercase"
          padding="3% 8%"
          borderRadius="4px"
        >
          {params.value === true ? "Validado" : "En proceso"}
        </Typography>
      );
    },
  },
  {
    field: "EnteredBy",
    headerName: "INGRESADO POR",
    width: 160,
    renderCell: (params) => {
      return (
        <Typography
          fontFamily="Montserrat"
          fontSize="80%"
          width="100%"
          fontWeight="bold"
          color="#63595C"
          textAlign="center"
          border="1.4px solid #63595C"
          backgroundColor="transparent"
          textTransform="uppercase"
          padding="3% 8%"
          borderRadius="4px"
        >
          {params.value}
        </Typography>
      );
    },
  },

  /* {
    field: "DateCreated",
    headerName: "FECHA",
    width: 130,
    renderCell: (params) => {
      return <InputTitles>{params.value}</InputTitles>;
    },
  }, */
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
  { id: 10, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 11, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 12, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 13, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 14, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 15, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 16, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 17, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 18, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 19, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 20, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 21, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 22, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 23, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 24, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 25, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 26, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 27, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 28, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 29, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 30, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export const ClientListComponent = () => {
  // Hooks
  const {
    fetch: fetch,
    loading: loading,
    error: error,
    data: data,
  } = useFetch({ service: GetClientList, init: true });
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    if (data) {
      let Customers = [];
      data.data.map((customer) => {
        Customers.push({
          id: customer.id,
          Customer: `${customer.first_name} ${customer.last_name}`,
          Status: customer.status,
          EnteredBy: `${customer.entered_by.first_name} ${customer.entered_by.last_name}`,
          /* DateCreated: customer.created_at.substring(0, 10).replace("-", "/"), */
        });
      });
      setCustomer(Customers);

      console.log(customer);
    }

    if (error) console.log(error);
  }, [data, loading, error]);

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
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Typography
            letterSpacing={0}
            fontSize="1.7rem"
            fontFamily="Montserrat"
            fontWeight="regular"
            marginBottom="0.7rem"
            color="#5EA3A3"
          >
            Consulta de Clientes
          </Typography>
          <Link href="/customers" underline="none">
            <Button
              variant="standard"
              color="primary"
              size="large"
              sx={{
                height: "2.6rem",
                backgroundColor: "transparent",
                border: "1.4px solid #63595C",
                borderRadius: "4px",
              }}
            >
              <Typography
                letterSpacing={0}
                fontSize="80%"
                fontFamily="Montserrat"
                fontWeight="bold"
                color="#63595C"
              >
                Registrar nuevo cliente
              </Typography>

              <Typography
                fontFamily="icomoon"
                fontSize="1.2rem"
                color="#63595C"
                marginLeft="0.9rem"
              >
                &#xe927;
              </Typography>
            </Button>
          </Link>
        </Box>
        <Box container display="flex" flexDirection="column" mt={3}>
          <InputTitles>Buscar cliente</InputTitles>
          <Box container display="flex" flexDirection="row" mt={2}>
            <Button
              variant="standard"
              size="medium"
              sx={{
                height: "2rem",
                backgroundColor: "transparent",
                border: "1.4px solid #5EA3A3",
                borderRadius: "4px",
                marginRight: "0.3rem",
              }}
            >
              <Typography
                letterSpacing={0}
                fontSize="85%"
                fontFamily="Montserrat"
                fontWeight="600"
                color="#5EA3A3"
                textTransform="none"
              >
                Cliente
              </Typography>
            </Button>
            <Button
              variant="standard"
              size="medium"
              sx={{
                height: "2rem",
                backgroundColor: "transparent",
                border: "1.4px solid #5EA3A3",
                borderRadius: "4px",
                marginRight: "0.3rem",
              }}
            >
              <Typography
                letterSpacing={0}
                fontSize="85%"
                fontFamily="Montserrat"
                fontWeight="600"
                color="#5EA3A3"
                textTransform="none"
              >
                Nº ID Cliente
              </Typography>
            </Button>
            <Button
              variant="standard"
              size="medium"
              sx={{
                height: "2rem",
                backgroundColor: "transparent",
                border: "1.4px solid #5EA3A3",
                borderRadius: "4px",
                marginRight: "1rem",
              }}
            >
              <Typography
                letterSpacing={0}
                fontSize="85%"
                fontFamily="Montserrat"
                fontWeight="600"
                color="#5EA3A3"
                textTransform="none"
              >
                Estatus
              </Typography>
            </Button>
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
            /* rows={rows}
            columns={columns} */
            rows={customer}
            columns={columns}
            pageSize={15}
            rowsPerPageOptions={[5]}
          />
        </Box>
      </Box>
    </>
  );
};
