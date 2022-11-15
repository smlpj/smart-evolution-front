import Link from "next/link";

import { SearchOutlined } from "@mui/icons-material";
import { Button, Fade, Typography } from "@mui/material";
import { Box } from "@mui/system";

import DateFormat from "@formats/DateFormat";
import ValueFormat from "@formats/ValueFormat";

import CustomTooltip from "@styles/customTooltip";
import MuiTextField from "@styles/fields";
import InputTitles from "@styles/inputTitles";
import CustomDataGrid from "@styles/tables";

export const RefundListC = ({
  data,
  getRefundData,
  loading,
}) => {
  const columns = [
    {
      field: "client",
      headerName: "Cliente",
      width: 155,
      renderCell: (params) => (
        <CustomTooltip
          title={params.value}
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
      ),
    },
    {
      field: "account",
      headerName: "Cuenta",
      width: 120,
      renderCell: (params) => (
        <CustomTooltip
          title={params.value}
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
      ),
    },
    {
      field: "date",
      headerName: "Fecha",
      width: 120,
      renderCell: (params) => (
        <CustomTooltip
          title={params.value}
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
          <InputTitles>{<DateFormat date={params.value} />}</InputTitles>
        </CustomTooltip>
      ),
    },
    {
      field: "applyGM",
      headerName: "Aplica GM",
      width: 120,
      renderCell: (params) => (
        <CustomTooltip
          title={params.value}
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
          <InputTitles>{params.value ? "Aplica" : "No Aplica"}</InputTitles>
        </CustomTooltip>
      ),
    },
    {
      field: "amount",
      headerName: "Monto",
      width: 120,
      renderCell: (params) => (
        <CustomTooltip
          title={params.value}
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
          <InputTitles>
            <ValueFormat prefix="$ " value={params.value} />
          </InputTitles>
        </CustomTooltip>
      ),
    },
    {
      field: "gmAmount",
      headerName: "Monto GM",
      width: 120,
      renderCell: (params) => (
        <CustomTooltip
          title={params.value}
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
          <InputTitles>
            <ValueFormat prefix="$ " value={params.value} />
          </InputTitles>
        </CustomTooltip>
      ),
    },
    {
      field: "beneficiary",
      headerName: "Beneficiario",
      width: 160,
      renderCell: (params) => (
        <CustomTooltip
          title={params.value}
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
      ),
    },
    {
      field: "bank",
      headerName: "Banco",
      width: 150,
      renderCell: (params) => (
        <CustomTooltip
          title={params.value}
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
      ),
    },
    {
      field: "accountType",
      headerName: "Tipo de Cuenta",
      width: 150,
      renderCell: (params) => (
        <CustomTooltip
          title={params.value}
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
      ),
    },
    {
      field: "accountNumber",
      headerName: "Cuenta Bancaria",
      width: 120,
      renderCell: (params) => (
        <CustomTooltip
          title={params.value}
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
      ),
    },
    {
      field: "observations",
      headerName: "Observaciones",
      width: 150,
      renderCell: (params) => (
        <CustomTooltip
          title={params.value}
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
      ),
    },
    {
      field: "Editar cliente",
      headerName: "",
      width: 50,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <Link href={`/administration/refund?id=${params.row.id}`}>
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
              }}
            >
              &#xe901;
            </Typography>
          </CustomTooltip>
        );
      },
    },

  ];

  return (
    <>
      <Box
        height="78vh"
        display="flex"
        flexDirection="column"
        width="70%"
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
            Consulta de Reintegros
          </Typography>
          <Link href="/administration/refund" underline="none">
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
                Registrar nuevo Reintegro
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
          <InputTitles>Buscar reintegro</InputTitles>
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
                Reintegro
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
                Nº ID Reintegro
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
            rows={data}
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
                    {/*page * 15 - 14} - {page * 15} de {dataCount}{" "}*/}
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
                        getRefundData("previous");
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
                        getRefundData("next");
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
