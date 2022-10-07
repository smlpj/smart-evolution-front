import { Button } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import Link from "next/link";
import InputTitles from "../../../styles/inputTitles";
import {
  GetBrokerList,
  GetBrokerListByQuery,
  DeleteBrokerById,
} from "./queries";
import { useFetch } from "../../../shared/hooks/useFetch";
import { useEffect, useState } from "react";
import CustomDataGrid from "../../../styles/tables";
import { format } from "date-fns";
import Image from "next/image";
import CustomTooltip from "../../../styles/customTooltip";
import { Fade } from "@mui/material";
import MuiTextField from "../../../styles/fields";
import { SearchOutlined } from "@mui/icons-material";

let dataCount;

export const BrokerListComponent = () => {
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
      field: "Broker",
      headerName: "CORREDOR",
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
      field: "DateCreated",
      headerName: "FECHA",
      width: 100,
      renderCell: (params) => {
        return <InputTitles>{params.value}</InputTitles>;
      },
    },

    //Iconos de acciones
    {
      field: "Editar corredor",
      headerName: "",
      width: 50,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <Link href={`/brokers?modify=${params.row.id}`}>
            <CustomTooltip
              title="Editar corredor"
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
              //Delete broker by id

              onClick={() => {
                setBroker(broker.filter((item) => item.id !== params.row.id));
                DeleteBrokerById(params.row.id);
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
  } = useFetch({ service: GetBrokerList, init: true });

  const [broker, setBroker] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (data) {
      let Brokers = [];
      dataCount = data.count;
      data.results.map((broker) => {
        Brokers.push({
          id: broker.id,
          DocumentNumber: broker.document_number,
          Broker: `${broker.first_name ?? ""} ${broker.last_name ?? ""} ${
            broker.social_reason ?? ""
          }`,
          Status: broker.state,
          DateCreated: format(new Date(broker.created_at), "dd / MM / yyyy"),
        });
      });
      setBroker(Brokers);

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
    service: GetBrokerListByQuery,
    init: false,
  });

  useEffect(() => {
    if (data2) {
      let Brokers = [];
      let pageSizeForPagination = data2.count;
      data2.results.map((broker) => {
        Brokers.push({
          id: broker.id,
          DocumentNumber: broker.document_number,
          Broker: `${broker.first_name ?? ""} ${broker.last_name ?? ""} ${
            broker.social_reason ?? ""
          }`,
          Status: broker.status,
          EnteredBy: `${broker.entered_by.first_name} ${broker.entered_by.last_name}`,
          DateCreated: format(new Date(broker.created_at), "dd / MM / yyyy"),
          FinancialProfile: broker.financial_profile,
          RiskProfile: broker.risk_profile,
        });
      });
      setBroker(Brokers);
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
            Consulta de Corredores
          </Typography>
          <Link href="/brokers?=register" underline="none">
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
                Registrar nuevo corredor
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
          <InputTitles>Buscar corredor</InputTitles>
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
                Corredor
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
                Nº ID Corredor
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
              id="searchBroker"
              placeholder="Nombre de corredor"
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
            rows={broker}
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
