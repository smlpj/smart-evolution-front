import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { SearchOutlined } from "@mui/icons-material";
import { Box, Button, Fade, Typography } from "@mui/material";

import DateFormat from "@formats/DateFormat";

import { useFetch } from "@hooks/useFetch";

import CustomTooltip from "@styles/customTooltip";
import MuiTextField from "@styles/fields";
import InputTitles from "@styles/inputTitles";
import CustomDataGrid from "@styles/tables";

import {
  DeleteClientById,
  GetClientList,
  GetClientListByQuery,
} from "./queries";

let dataCount;

export const ClientListComponent = () => {
  const columns = [
    {
      field: "DocumentNumber",
      headerName: "# ID",
      width: 110,
      renderCell: (params) => {
        return (
          <CustomTooltip
            title={params.value}
            arrow
            placement="bottom-start"
            TransitionComponent={Fade}
            PopperProps={{
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, 0],
                  },
                },
              ],
            }}
          >
            <InputTitles>{params.value}</InputTitles>
          </CustomTooltip>
        );
      },
    },
    {
      field: "Customer",
      headerName: "CLIENTE",
      width: 160,
      renderCell: (params) => {
        return (
          <CustomTooltip
            title={params.value}
            arrow
            placement="bottom-start"
            TransitionComponent={Fade}
            PopperProps={{
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, 0],
                  },
                },
              ],
            }}
          >
            <InputTitles>{params.value}</InputTitles>
          </CustomTooltip>
        );
      },
    },
    {
      field: "Status",
      headerName: "ESTATUS",
      width: 120,
      renderCell: (params) => {
        return (
          <Typography
            fontFamily="Montserrat"
            fontSize="80%"
            width="100%"
            fontWeight="bold"
            color="#488B8F"
            backgroundColor="#B5D1C9"
            textTransform="uppercase"
            textAlign="center"
            padding="5.5% 8%"
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
    {
      field: "DateCreated",
      headerName: "FECHA",
      width: 100,
      renderCell: (params) => {
        return <InputTitles>{params.value}</InputTitles>;
      },
    },
    {
      field: "FinancialProfile",
      headerName: "PERFIL FINANCIERO",
      width: 160,
      renderCell: (params) => {
        return params.value === true ? (
          <>
            <Typography
              fontFamily="Montserrat"
              fontSize="80%"
              width="80%"
              fontWeight="bold"
              color="#63595C"
              textAlign="center"
              border="1.4px solid #63595C"
              backgroundColor="transparent"
              textTransform="uppercase"
              padding="3% 8%"
              borderRadius="4px"
            >
              Cargado
            </Typography>
            <Typography fontFamily="icomoon" fontSize="1.5rem" color="#488B8F">
              &#xe906;
            </Typography>
          </>
        ) : (
          <>
            <Typography
              fontFamily="Montserrat"
              fontSize="80%"
              width="80%"
              fontWeight="bold"
              color="#E66431"
              textAlign="center"
              border="1.4px solid #E66431"
              backgroundColor="#E6643133"
              textTransform="uppercase"
              padding="3% 8%"
              borderRadius="4px"
            >
              Sin cargar
            </Typography>
            <Typography fontFamily="icomoon" fontSize="1.5rem" color="#E66431">
              &#xe907;
            </Typography>
          </>
        );
      },
    },

    {
      field: "RiskProfile",
      headerName: "PERFIL DE RIESGO",
      width: 160,

      renderCell: (params) => {
        return params.value === true ? (
          <>
            <Typography
              fontFamily="Montserrat"
              fontSize="80%"
              width="100%"
              fontWeight="bold"
              color="#FFFFFF"
              textAlign="center"
              backgroundColor="#488B8F"
              textTransform="uppercase"
              padding="3% 8%"
              borderRadius="4px"
            >
              <Typography
                fontFamily="icomoon"
                fontSize="1.5rem"
                color="#FFFFFF"
              >
                &#xe91a;
              </Typography>
              Riesgo medio
            </Typography>
          </>
        ) : (
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
        );
      },
    },

    {
      field: "Resumen financiero",
      headerName: "",
      width: 50,
      sortable: false,
      filterable: false,
      renderCell: () => {
        return (
          <Link href="/customers">
            <CustomTooltip
              title="Resumen financiero"
              arrow
              placement="bottom-start"
              TransitionComponent={Fade}
              PopperProps={{
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -15],
                    },
                  },
                ],
              }}
            >
              <Typography
                fontFamily="icomoon"
                fontSize="1.9rem"
                color="#488B8F"
                borderRadius="5px"
                sx={{
                  "&:hover": {
                    backgroundColor: "#B5D1C980",
                  },
                  cursor: "pointer",
                }}
              >
                &#xe905;
              </Typography>
            </CustomTooltip>
          </Link>
        );
      },
    },

    //Iconos de acciones

    {
      field: "Expediente Cliente",
      headerName: "",
      width: 20,
      sortable: false,
      filterable: false,
      renderCell: () => {
        return (
          <Link href="/customers">
            <CustomTooltip
              title="Expediente Cliente"
              arrow
              placement="bottom-start"
              TransitionComponent={Fade}
              PopperProps={{
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -15],
                    },
                  },
                ],
              }}
            >
              <Typography
                fontFamily="icomoon"
                fontSize="1.9rem"
                color="#488B8F"
                borderRadius="5px"
                sx={{
                  "&:hover": {
                    backgroundColor: "#B5D1C980",
                  },
                  cursor: "pointer",
                }}
              >
                &#xe902;
              </Typography>
            </CustomTooltip>
          </Link>
        );
      },
    },
    {
      field: "Perfil Financiero Cliente",
      headerName: "",
      width: 20,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <Link href={`/financialProfile?id=${params.row.id}`}>
            <CustomTooltip
              title="Perfil Financiero Cliente"
              arrow
              placement="bottom-start"
              TransitionComponent={Fade}
              PopperProps={{
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -15],
                    },
                  },
                ],
              }}
            >
              <Typography
                fontFamily="icomoon"
                fontSize="1.9rem"
                color="#488B8F"
                borderRadius="5px"
                sx={{
                  "&:hover": {
                    backgroundColor: "#B5D1C980",
                  },
                  cursor: "pointer",
                }}
              >
                &#xe904;
              </Typography>
            </CustomTooltip>
          </Link>
        );
      },
    },
    {
      field: "Perfil de riesgo Cliente",
      headerName: "",
      width: 60,
      sortable: false,
      filterable: false,
      renderCell: () => {
        return (
          <Link href="/customers">
            <CustomTooltip
              title="Perfil de Riesgo Cliente"
              arrow
              placement="bottom-start"
              TransitionComponent={Fade}
              PopperProps={{
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -15],
                    },
                  },
                ],
              }}
            >
              <Typography
                fontFamily="icomoon"
                fontSize="1.9rem"
                color="#488B8F"
                borderRadius="5px"
                sx={{
                  "&:hover": {
                    backgroundColor: "#B5D1C980",
                  },
                  cursor: "pointer",
                }}
              >
                &#xe903;
              </Typography>
            </CustomTooltip>
          </Link>
        );
      },
    },
    {
      field: "Editar cliente",
      headerName: "",
      width: 50,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <Link href={`/customers?modify=${params.row.id}`}>
            <CustomTooltip
              title="Editar cliente"
              arrow
              placement="bottom-start"
              TransitionComponent={Fade}
              PopperProps={{
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -15],
                    },
                  },
                ],
              }}
            >
              <Typography
                fontFamily="icomoon"
                fontSize="1.9rem"
                color="#999999"
                borderRadius="5px"
                sx={{
                  "&:hover": {
                    backgroundColor: "#B5D1C980",
                    color: "#488B8F",
                  },
                  cursor: "pointer",
                }}
              >
                &#xe900;
              </Typography>
            </CustomTooltip>
          </Link>
        );
      },
    },
    {
      field: "Eliminar",
      headerName: "",
      width: 50,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <CustomTooltip
            title="Eliminar"
            arrow
            placement="bottom-start"
            TransitionComponent={Fade}
            PopperProps={{
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -15],
                  },
                },
              ],
            }}
          >
            <Typography
              fontFamily="icomoon"
              fontSize="1.9rem"
              color="#999999"
              borderRadius="5px"
              sx={{
                "&:hover": {
                  backgroundColor: "#B5D1C980",
                  color: "#488B8F",
                },
                cursor: "pointer",
              }}
              //Delete customer by id

              onClick={() => {
                console.log(params.row.id);
                setCustomer(
                  customer.filter((item) => item.id !== params.row.id)
                );
                DeleteClientById(params.row.id);
              }}
            >
              &#xe901;
            </Typography>
          </CustomTooltip>
        );
      },
    },
  ];
  // Hooks
  const {
    fetch: fetch,
    loading: loading,
    error: error,
    data: data,
  } = useFetch({ service: GetClientList, init: true });

  const [customer, setCustomer] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (data) {
      let Customers = [];
      dataCount = data.count;
      data.results.map((customer) => {
        Customers.push({
          id: customer.id,
          DocumentNumber: customer.document_number,
          Customer: `${customer.first_name ?? ""} ${customer.last_name ?? ""} ${
            customer.social_reason ?? ""
          }`,
          Status: customer.status,
          EnteredBy: `${customer.entered_by.first_name} ${customer.entered_by.last_name}`,
          DateCreated: <DateFormat date={customer.created_at} />,
          FinancialProfile: customer.financial_profile,
          RiskProfile: customer.risk_profile,
        });
      });
      setCustomer(Customers);

      console.log(data);
    }

    if (error) console.log(error);
  }, [data, loading, error]);

  const {
    fetch: fetch2,
    loading: loading2,
    error: error2,
    data: data2,
  } = useFetch({
    service: GetClientListByQuery,
    init: false,
  });

  useEffect(() => {
    if (data2) {
      let Customers = [];
      let pageSizeForPagination = data2.count;
      data2.results.map((customer) => {
        Customers.push({
          id: customer.id,
          DocumentNumber: customer.document_number,
          Customer: `${customer.first_name ?? ""} ${customer.last_name ?? ""} ${
            customer.social_reason ?? ""
          }`,
          Status: customer.status,
          EnteredBy: `${customer.entered_by.first_name} ${customer.entered_by.last_name}`,
          DateCreated: <DateFormat date={customer.created_at} />,
          FinancialProfile: customer.financial_profile,
          RiskProfile: customer.risk_profile,
        });
      });
      setCustomer(Customers);
    }
  }, [data2, loading2, error2]);

  return (
    <>
      <Box
        height="78vh"
        display="flex"
        flexDirection="column"
        width="67.6%"
        position="fixed"
        marginLeft="5%"
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
          <Link href="/customers?=register" underline="none">
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
          <Box
            container
            display="flex"
            flexDirection="row"
            mt={2}
            alignItems="center"
          >
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
            <MuiTextField
              id="searchCustomer"
              placeholder="Nombre de cliente"
              type="text"
              variant="standard"
              margin="normal"
              sx={{
                marginTop: "0",
                marginBottom: "0",
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
          container
          marginTop={4}
          display="flex"
          flexDirection="column"
          width="100%"
          height="100%"
        >
          <CustomDataGrid
            rows={customer}
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

              Pagination: () => (
                <Box
                  container
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    fontFamily="Montserrat"
                    fontSize="0.8rem"
                    fontWeight="600"
                    color="#5EA3A3"
                  >
                    {page * 15 - 14} - {page * 15} de {dataCount}{" "}
                  </Typography>
                  <Box
                    container
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                  >
                    <Typography
                      fontFamily="icomoon"
                      fontSize="1.2rem"
                      marginRight="0.3rem"
                      marginLeft="0.5rem"
                      sx={{
                        cursor: "pointer",
                        transform: "rotate(180deg)",
                        color: "#63595C",
                      }}
                      onClick={() => {
                        if (page > 1) {
                          fetch2(page - 1);
                          setPage(page - 1);
                        }
                      }}
                    >
                      &#xe91f;
                    </Typography>
                    <Typography
                      fontFamily="icomoon"
                      fontSize="1.2rem"
                      marginRight="0.3rem"
                      marginLeft="0.5rem"
                      sx={{
                        cursor: "pointer",

                        color: "#63595C",
                      }}
                      onClick={() => {
                        if (page < dataCount / 15) {
                          fetch2(page + 1);
                          setPage(page + 1);
                        }
                      }}
                    >
                      &#xe91f;
                    </Typography>
                  </Box>
                </Box>
              ),
            }}
            componentsProps={{
              pagination: {
                color: "#5EA3A3",
              },
            }}
            loading={loading}
          />
        </Box>
      </Box>
    </>
  );
};
