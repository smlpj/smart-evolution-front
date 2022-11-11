import DateFormat from "@formats/DateFormat";
import ValueFormat from "@formats/ValueFormat";
import { Fade, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CustomTooltip from "@styles/customTooltip";
import InputTitles from "@styles/inputTitles";
import CustomDataGrid from "@styles/tables";

export const RefundListC = ({
  data,
  nextPage,
  previousPage,
  getRefundData,
  loading
}) => {
  const columns = [
    { field: "client", headerName: "Cliente", width: 155,
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
    ), },
    { field: "account", headerName: "Cuenta", width: 120, renderCell: (params) => (
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
    ) },
    { field: "date", headerName: "Fecha", width: 120 , renderCell: (params) => (
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
    )},
    { field: "applyGM", headerName: "Aplica GM", width: 120, renderCell: (params) => (
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
        <InputTitles>{params.value ? "Aplica" : "No Aplica" }</InputTitles>
      </CustomTooltip>
    ) },
    { field: "amount", headerName: "Monto", width: 120, renderCell: (params) => (
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
    ) },
    { field: "gmAmount", headerName: "Monto GM", width: 120, renderCell: (params) => (
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
    ) },
    { field: "beneficiary", headerName: "Beneficiario", width: 160, renderCell: (params) => (
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
    ) },
    { field: "bank", headerName: "Banco", width: 150, renderCell: (params) => (
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
    ) },
    { field: "accountType", headerName: "Tipo de Cuenta", width: 150, renderCell: (params) => (
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
    ) },
    { field: "accountNumber", headerName: "Cuenta Bancaria", width: 120, renderCell: (params) => (
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
    ) },
    { field: "observations", headerName: "Observaciones", width: 150, renderCell: (params) => (
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
    ) },
  ];

  return (
    <>
      {/* <div>
      <button onClick={() => getRefundData(previousPage, 'previous') }>Previous</button>
      <button onClick={() => getRefundData(nextPage, 'next') }>Next</button>
    </div> */}

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

              NoRowsOverlay: () => (
                <Typography
                  fontSize="0.9rem"
                  fontWeight="600"
                  color="#488B8F"
                  height="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  No hay giros de inversionistas registrados
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
                    {/*page * 15 - 14} - {page * 15} de {dataCount}{" "}]*/}
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
    </>
  );
};
