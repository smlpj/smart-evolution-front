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

import { DeleteBillById, GetBillList, GetBillListByQuery } from "./queries";

let dataCount;

export const BillsComponents = () => {
  const columns = [
    {
      field: "Cufe",
      headerName: "CUFE",
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
      field: "Emitter",
      headerName: "EMISOR",
      width: 180,
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
      field: "Payer",
      headerName: "PAGADOR",
      width: 180,
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
      field: "Subtotal",
      headerName: "SUBTOTAL",
      width: 100,
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
      field: "Total",
      headerName: "TOTAL",
      width: 100,
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
      field: "typeBill",
      headerName: "TIPO DE FACTURA",
      width: 130,
      renderCell: (params) => {
        return (
          <Typography
            fontSize="80%"
            width="100%"
            fontWeight="bold"
            color="white"
            backgroundColor="#488B8F"
            textTransform="uppercase"
            textAlign="center"
            padding="5.5% 8%"
            border="1.4px solid #B5D1C9"
            borderRadius="4px"
          >
            {params.value}
          </Typography>
        );
      },
      valueGetter: (params) => {
        return params.value !== null
          ? params.value === "a7c70741-8c1a-4485-8ed4-5297e54a978a"
            ? "FV-TV"
            : "FV"
          : null;
      },
    },
    {
      field: "DateBill",
      headerName: "FECHA CREACIÓN",
      width: 160,
      renderCell: (params) => {
        return <InputTitles>{params.value}</InputTitles>;
      },
    },
    {
      field: "DatePayment",
      headerName: "FECHA EXPIRACIÓN",
      width: 160,
      renderCell: (params) => {
        return <InputTitles>{params.value}</InputTitles>;
      },
    },

    //Iconos de acciones
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
              //Delete bill by id

              onClick={() => {
                setBill(bill.filter((item) => item.id !== params.row.id));
                DeleteBillById(params.row.id);
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
  } = useFetch({ service: GetBillList, init: true });

  const [bill, setBill] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (data) {
      let Bills = [];
      dataCount = data.count;
      data.data.map((bill) => {
        Bills.push({
          id: bill.id,
          Cufe: bill.cufe,
          Emitter: bill.emitterName,
          Payer: bill.payerName,
          Subtotal: bill.subTotal,
          Total: bill.total,
          typeBill: bill.typeBill,
          DateBill: <DateFormat date={bill.dateBill} />,
          DatePayment: <DateFormat date={bill.datePayment} />,
        });
      });
      setBill(Bills);
    }

    if (error) console.log(error);
  }, [data, loading, error]);

  const {
    fetch: fetch2,
    loading: loading2,
    error: error2,
    data: data2,
  } = useFetch({
    service: GetBillListByQuery,
    init: false,
  });

  useEffect(() => {
    if (data2) {
      let Bills = [];
      let pageSizeForPagination = data2.count;
      data2.results.map((bill) => {
        Bills.push({
          id: bill.id,
          Cufe: bill.cufe,
          Emitter: bill.emitterName,
          Payer: bill.payerName,
          Subtotal: bill.subTotal,
          Total: bill.total,
          typeBill: bill.typeBill,
          DateBill: <DateFormat date={bill.dateBill} />,
          DatePayment: <DateFormat date={bill.datePayment} />,
        });
      });
      setBill(Bills);
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
            marginBottom="0.7rem"
            color="#5EA3A3"
          >
            Consulta de Facturas
          </Typography>
          <Link href="/bills?=register" underline="none">
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
                fontWeight="bold"
                color="#63595C"
              >
                Registrar nueva factura
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
          <InputTitles>Buscar factura</InputTitles>
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
                fontWeight="600"
                color="#5EA3A3"
                textTransform="none"
              >
                Emisor
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
                fontWeight="600"
                color="#5EA3A3"
                textTransform="none"
              >
                Pagador
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
                fontWeight="600"
                color="#5EA3A3"
                textTransform="none"
              >
                Estatus
              </Typography>
            </Button>
            <MuiTextField
              id="searchBill"
              placeholder="Nombre de emisor"
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
            rows={bill}
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
