import {
  Checkbox,
  IconButton,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import InputTitles from "../../styles/inputTitles";
import MuiTextField from "../../styles/fields";
import { ArrowForward, SearchOutlined } from "@mui/icons-material";
import CustomDataGrid from "../../styles/tables";
import { Link, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import Divider from "@mui/material/Divider";
import { useState, useRef } from "react";
import { ReadBills, ReadCreditNotes } from "./queries";
import { useFetch } from "../../shared/hooks/useFetch";
import { useEffect } from "react";
import CustomTooltip from "../../styles/customTooltip";
import { Fade } from "@material-ui/core";
import { format } from "date-fns";

export const BillsComponents = () => {
  const [rowsToModify, setRowsToModify] = useState([]);
  const [rowsToApplyRETIVA, setRowsToApplyRETIVA] = useState([]);
  const billFile = useRef();
  const creditNoteFile = useRef();
  const [creditNote, setCreditNote] = useState([]);
  const [filesBill, setFilesBill] = useState([]);
  const [bill, setBill] = useState([]);
  const [otherRet, setOtherRet] = useState([]);
  const [retICA, setRetICA] = useState(0);
  const [retFTE, setRetFTE] = useState(0);

  const {
    fetch: fetch,
    loading: loading,
    error: error,
    data: data,
  } = useFetch({ service: ReadBills, init: false });

  const {
    fetch: fetch2,
    loading: loading2,
    error: error2,
    data: data2,
  } = useFetch({ service: ReadCreditNotes, init: false });

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) => bill.find((row) => row.id === id));
    setRowsToModify(selectedRowsData);
  };

  useEffect(() => {
    if (filesBill !== []) {
      fetch(filesBill);
    }
  }, [filesBill]);

  useEffect(() => {
    if (creditNote !== []) {
      fetch2(creditNote);
    }
  }, [creditNote]);

  const sumOfAllCreditNotes = (data) => {
    let sum = 0;
    data.forEach((element) => {
      sum += element.value;
    });
    return sum;
  };

  useEffect(() => {
    if (data) {
      let Bills = [];
      data.data.map((bill) => {
        Bills.push({
          id: bill.billId,
          Status: bill.typeBill,
          EmitterName: bill.emitterName,
          EmmitterId: bill.emitterId,
          PayerID: bill.payerId,
          PayerName: bill.payerName,
          dateBill: format(new Date(bill.dateBill), "dd / MM / yyyy"),
          datePayment: format(new Date(bill.datePayment), "dd / MM / yyyy"),
          BillValue: bill.billValue,
          IVA: bill.iva,
          RetIVA: bill.iva * 0.15,
          CreditNote: data2
            ? data2.data.map((creditNote) =>
                creditNote.associatedInvoice === bill.billId
                  ? creditNote.creditNoteValue
                  : 0
              )
            : 0,
          RetICA: 0,
          RetFTE: 0,
          SubTotal: bill.subTotal,
          Total: bill.total,
        });
      });
      console.log(data);
      setBill(Bills);
    }
  }, [data]);

  const columns = [
    {
      field: "RetICA",
      headerName: "RET. ICA",
      width: 100,
      sortable: false,
      editable: true,
      renderCell: (params) => (
        <TextField
          id="ICA"
          placeholder="0,00%"
          value={params.value}
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
      ),
    },
    {
      field: "RetFTE",
      headerName: "RET. FTE",
      width: 100,
      sortable: false,
      editable: true,
      renderCell: (params) => (
        <TextField
          id="FTE"
          placeholder="0,00%"
          value={params.value}
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
      ),
    },
    {
      field: "Status",
      headerName: "TIPO DE FACTURA",
      width: 130,
      renderCell: (params) => {
        return (
          <Typography
            fontFamily="Montserrat"
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
            {params.value !== null
              ? params.value === "a7c70741-8c1a-4485-8ed4-5297e54a978a"
                ? "FV-TV"
                : "FV"
              : null}
          </Typography>
        );
      },
    },
    {
      field: "id",
      headerName: "ID",
      width: 70,
      renderCell: (params) => (
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
      ),
    },
    {
      headerName: "Aplicar RET. IVA",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" width="100%" justifyContent="center">
          <Switch
            sx={{
              "& .MuiSwitch-switchBase": {
                "&.Mui-checked": {
                  color: "#FFFFFF",
                },
                "&.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#488B8F",
                },

                "&.Mui-disabled": {
                  color: "#488B8F",
                },
                "&.Mui-disabled + .MuiSwitch-track": {
                  backgroundColor: "#B5D1C9",
                },
              },
            }}
            onChange={(e) => {
              e.target.checked
                ? setRowsToApplyRETIVA([...rowsToApplyRETIVA, params.row])
                : setRowsToApplyRETIVA(
                    rowsToApplyRETIVA.filter((row) => row.id !== params.row.id)
                  );
            }}
          />
        </Box>
      ),
    },
    {
      field: "RetIVA",
      headerName: "RET. IVA",
      width: 130,
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
          {rowsToApplyRETIVA.includes(params.row)
            ? Math.round(params.value)
            : 0}
        </Typography>
      ),
    },
    {
      field: "EmitterName",
      headerName: "NOMBRE EMISOR",
      width: 160,
      renderCell: (params) => (
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
          <InputTitles>
            {params.value.length > 17
              ? params.value.substring(0, 17) + "..."
              : params.value}
          </InputTitles>
        </CustomTooltip>
      ),
    },
    {
      field: "EmmitterId",
      headerName: "NIT EMISOR",
      width: 100,
      renderCell: (params) => (
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
      ),
    },
    {
      field: "PayerName",
      headerName: "NOMBRE PAGADOR",
      width: 160,
      renderCell: (params) => (
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
          <InputTitles>
            {params.value.length > 17
              ? params.value.substring(0, 17) + "..."
              : params.value}
          </InputTitles>
        </CustomTooltip>
      ),
    },
    {
      field: "PayerID",
      headerName: "NIT PAGADOR",
      width: 110,
      renderCell: (params) => (
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
      ),
    },
    {
      field: "dateBill",
      headerName: "FECHA EMISIÓN",
      width: 120,
      renderCell: (params) => {
        return <InputTitles>{params.value}</InputTitles>;
      },
    },
    {
      field: "datePayment",
      headerName: "FECHA VENCIMIENTO",
      width: 150,
      renderCell: (params) => {
        return <InputTitles>{params.value}</InputTitles>;
      },
    },
    {
      field: "BillValue",
      headerName: "VALOR FACTURA",
      width: 120,
      renderCell: (params) => {
        return <InputTitles>{params.value}</InputTitles>;
      },
    },
    {
      field: "IVA",
      headerName: "IVA",
      width: 60,
      renderCell: (params) => {
        return <InputTitles>{params.value}</InputTitles>;
      },
    },
    {
      field: "CreditNote",
      headerName: "NOTA CRÉDITO",
      width: 110,
      renderCell: (params) => {
        return <InputTitles>{params.value}</InputTitles>;
      },
    },
    {
      field: "SubTotal",
      headerName: "SUBTOTAL",
      width: 100,
      renderCell: (params) => {
        return <InputTitles>{params.value}</InputTitles>;
      },
    },
    {
      field: "Total",
      headerName: "TOTAL",
      width: 100,
      renderCell: (params) => {
        return <InputTitles>{params.value}</InputTitles>;
      },
    },
  ];

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
              height: "3rem",
            }}
            onClick={() => {
              billFile.current.click();
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
          <input
            ref={billFile}
            id="extractBill"
            type="file"
            multiple="multiple"
            style={{ display: "none" }}
            onChange={(e) => {
              const formData = new FormData();
              const files = Array.from(e.target.files);
              files.forEach((file) => {
                formData.append("bills", file);
              });
              setFilesBill(formData);
            }}
          />
          <Button
            variant="standard"
            startIcon={<UploadFileOutlinedIcon sx={{ color: "#488B8F" }} />}
            sx={{
              border: "2px solid #488B8F",
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: "#B5D1C9",
              },
              height: "3rem",
            }}
            onClick={() => {
              creditNoteFile.current.click();
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
          <input
            ref={creditNoteFile}
            id="extractCreditNotes"
            type="file"
            multiple="multiple"
            style={{ display: "none" }}
            onChange={(e) => {
              const formData = new FormData();
              const files = Array.from(e.target.files);
              files.forEach((file) => {
                formData.append("creditNotes", file);
              });
              setCreditNote(formData);
            }}
          />
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
                onChange={(e) => {
                  setRetICA(e.target.value);
                }}
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
                  const Bills = [...bill];
                  Bills.map((row) => {
                    if (rowsToModify.includes(row)) {
                      row.RetICA = parseFloat(retICA);
                    }
                  });
                  setBill(Bills);
                }}
              >
                <ArrowForward sx={{ color: "white" }} />
              </IconButton>
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography
                letterSpacing={0}
                fontSize="85%"
                fontFamily="Montserrat"
                fontWeight="bold"
                color={rowsToModify.length === 0 ? "#488B8F50" : "#488B8F"}
                textTransform="uppercase"
                marginLeft="0.7rem"
                marginRight="0.5rem"
              >
                Valor Ret. FTE
              </Typography>
              <TextField
                id="FTE"
                placeholder="0,00%"
                onChange={(e) => {
                  setRetFTE(e.target.value);
                }}
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
                  const Bills = [...bill];
                  Bills.map((row) => {
                    if (rowsToModify.includes(row)) {
                      row.RetFTE = parseFloat(retFTE);
                    }
                  });
                  setBill(Bills);
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
            rows={bill}
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
              NoRowsOverlay: () => (
                <Typography
                  fontFamily="Montserrat"
                  fontSize="0.9rem"
                  fontWeight="600"
                  color="#488B8F"
                  height="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  No hay datos para mostrar
                </Typography>
              ),
            }}
          />
        </Box>
      </Box>
    </>
  );
};
