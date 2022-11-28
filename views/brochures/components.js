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
  DeleteBrochureById,
  GetBrochureList,
  GetBrochureListByQuery,
} from "./queries";

let dataCount;

export const BrochureListComponent = () => {
  const columns = [
    {
      field: "id",
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
      width: 200,
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
      headerName: "ESTADO",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            {params.value === true ? (
              <i className="fa-light fa-badge-check"></i>
            ) : (
              <i class="fa-thin fa-badge"></i>
            )}
            <Typography
              fontSize="12px"
              width="100%"
              fontWeight="bold"
              color={params.value === true ? "#488B8F" : "#E66431"}
              textTransform="uppercase"
              textAlign="center"
              padding="5.5% 8%"
            >
              {params.value === true ? "Verificado" : "Sin verificar"}
            </Typography>
          </>
        );
      },
    },
    {
      field: "Ciuu",
      headerName: "CIUU",
      width: 80,
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
      field: "DateCreated",
      headerName: "FECHA SOLICITUD",
      width: 130,
      renderCell: (params) => {
        return <InputTitles>{params.value}</InputTitles>;
      },
    },
    {
      field: "AccountType",
      headerName: "TIPO DE CUENTA",
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <Typography
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
              AUTOGESTIÓN
            </Typography>
          </>
        );
      },
    },
    {
      field: "Exp",
      headerName: "EXP. CONSOLIDADO",
      width: 160,

      renderCell: (params) => {
        return (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            textAlign="center"
            alignItems="center"
            padding="1% 10%"
            borderRadius="4px"
            backgroundColor="transparent"
            border="1px solid #488B8F"
            // pointer events
            sx={{
              cursor: "pointer",
            }}

            // onClick={() => {
            //   downloadFile(params.value);
            // }}
          >
            <Typography
              fontSize="80%"
              width="100%"
              fontWeight="bold"
              color="#488B8F"
              textTransform="uppercase"
              marginRight="1px"
            >
              Descargar
            </Typography>
            <Typography fontFamily="icomoon" fontSize="19px" color="#488B8F">
              &#xe902;
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "Comite",
      headerName: "RESULTADO COMITE DE RIESGO",
      width: 260,

      renderCell: (params) => {
        return (
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
            <Typography
              fontSize="80%"
              width="100%"
              fontWeight="bold"
              color="#FFFFFF"
              textTransform="uppercase"
            >
              APROBAR
              {/* <Typography
                fontFamily="icomoon"
                fontSize="1.5rem"
                color="#E66431"
              >
                &#xe907;
              </Typography> */}
            </Typography>
          </Box>
        );
      },
    },

    //Iconos de acciones
    {
      field: "vinculacion",
      headerName: "",
      width: 20,
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
                setBrochure(
                  brochure.filter((item) => item.id !== params.row.id)
                );
                DeleteBrochureById(params.row.id);
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

  const [brochure, setBrochure] = useState([]);
  const [brochureType, setBrochureType] = useState("natural");
  const [page, setPage] = useState(1);

  const {
    fetch: fetch,
    loading: loading,
    error: error,
    data: data,
  } = useFetch({ service: GetBrochureList, init: false });

  useEffect(() => {
    fetch(brochureType);
  }, [brochureType]);

  useEffect(() => {
    if (data) {
      console.log(data);
      let Brochures = [];
      dataCount = data.count;
      data.data.map((brochure) => {
        Brochures.push({
          id: brochure.id,
          Customer: `${brochure.firstName ?? ""} ${brochure.lastName ?? ""} ${
            brochure.socialReason ?? ""
          }`,
          Status: brochure.status === 0 ? true : false,
          Ciuu: brochure.ciiu,
          DateCreated: <DateFormat date={brochure.created_at} />,
        });
      });
      setBrochure(Brochures);
    }

    if (error) console.log(error);
  }, [data, loading, error]);

  const {
    fetch: fetch2,
    loading: loading2,
    error: error2,
    data: data2,
  } = useFetch({
    service: GetBrochureListByQuery,
    init: false,
  });

  useEffect(() => {
    if (data2) {
      let Brochures = [];
      let pageSizeForPagination = data2.count;
      data2.data.map((brochure) => {
        Brochures.push({
          id: brochure.id,
          Customer: `${brochure.firstName ?? ""} ${brochure.lastName ?? ""} ${
            brochure.socialReason ?? ""
          }`,
          Status: brochure.status,
          Ciuu: brochure.ciuu,
        });
      });
      setBrochure(Brochures);
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
            fontWeight="regular"
            color="#5EA3A3"
          >
            Consulta y gestión de Prospectos
          </Typography>
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
            onClick={() => {
              //change text to Ver prospectos jurídicos o Ver prospectos naturales
              brochureType === "natural"
                ? setBrochureType("")
                : setBrochureType("natural");
            }}
          >
            <Typography
              letterSpacing={0}
              fontSize="80%"
              fontWeight="bold"
              color="#63595C"
            >
              Ver prospectos{" "}
              {brochureType == "" ? "naturales" : "jurídicos"}
            </Typography>

            <Typography
              fontFamily="icomoon"
              fontSize="1.8rem"
              color="#63595C"
              marginLeft="0.6rem"
            >
              &#xe923;
            </Typography>
          </Button>
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
            rows={brochure}
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
