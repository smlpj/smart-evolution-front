import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";

import { ArrowForward, SaveOutlined } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import {
  Box,
  Button,
  Divider,
  Fade,
  IconButton,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarExport,
  gridRowIdsSelector,
  useGridApiContext,
} from "@mui/x-data-grid";

import { Toast } from "@components/toast";

import DateFormat from "@formats/DateFormat";
import ValueFormat from "@formats/ValueFormat";

import { useFetch } from "@hooks/useFetch";
import useToatsStatus from "@hooks/useToatsStatus";

import BackButton from "@styles/buttons/BackButton";
import CustomTooltip from "@styles/customTooltip";
import InputTitles from "@styles/inputTitles";
import CustomDataGrid from "@styles/tables";

import { ReadBills, ReadCreditNotes, SaveBills } from "./queries";

export const BillsComponents = () => {
  const [rowsToModify, setRowsToModify] = useState([]);
  const [rowsToApplyRETIVA, setRowsToApplyRETIVA] = useState([]);
  const [creditNote, setCreditNote] = useState(null);
  const [filesBill, setFilesBill] = useState(null);
  const [bill, setBill] = useState([]);
  const [otherRet, setOtherRet] = useState({});
  const [retIVA, setRetIVA] = useState({});
  const [retICA, setRetICA] = useState({});
  const [retFTE, setRetFTE] = useState({});

  const billFile = useRef();
  const creditNoteFile = useRef();

  const {
    fetch: fetchReadBills,
    loading: loadingReadBills,
    error: errorReadBills,
    data: dataReadBills,
  } = useFetch({ service: ReadBills, init: false });

  useEffect(() => {
    if (filesBill && filesBill.getAll("bills").length > 0) {
      fetchReadBills(filesBill);
    }
  }, [filesBill]);

  useToatsStatus(
    loadingReadBills,
    dataReadBills,
    errorReadBills,
    (loading, data, error) => data?.bills.length > 0,
    "Facturas cargadas",
    errorReadBills?.message
  );

  const onChangeFilesExtractBill = (e) => {
    const formData = new FormData();
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      formData.append("bills", file);
    });
    setFilesBill(formData);
  };

  const {
    fetch: fetchReadCreditNotes,
    loading: loadingReadCreditNotes,
    error: errorReadCreditNotes,
    data: dataReadCreditNotes,
  } = useFetch({ service: ReadCreditNotes, init: false });

  useEffect(() => {
    if (creditNote && creditNote.getAll("creditNotes").length > 0) {
      fetchReadCreditNotes(creditNote);
    }
  }, [creditNote]);

  useToatsStatus(
    loadingReadCreditNotes,
    dataReadCreditNotes,
    errorReadCreditNotes,
    (loading, data, error) => data?.data.length >= 0,
    "Notas de cr??dito cargadas",
    errorReadCreditNotes?.message
  );

  const {
    fetch: fetchSaveBills,
    loading: loadingSaveBills,
    error: errorSaveBills,
    data: dataSaveBills,
  } = useFetch({ service: SaveBills, init: false });

  useToatsStatus(
    loadingSaveBills,
    dataSaveBills,
    errorSaveBills,
    (loading, data, error) => error,
    "Facturas guardadas",
    errorSaveBills?.message
  );

  const onChangeFilesCreditNote = (e) => {
    const formData = new FormData();
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      formData.append("creditNotes", file);
    });
    setCreditNote(formData);
  };

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) => bill.find((row) => row.id === id));
    setRowsToModify(selectedRowsData);
  };

  const sumOfAllCreditNotes = (array, id) => {
    let sum = 0;
    array.map((creditNote) => {
      creditNote.associatedInvoice === id ? (sum += creditNote.total) : 0;
    });
    return sum;
  };

  const getLastEvent = (array) => {
    let lastEvent = null;
    array.map((event) => {
      if (lastEvent === null) {
        lastEvent = event;
      } else {
        if (new Date(event.date) > new Date(lastEvent.date)) {
          lastEvent = event;
        }
      }
    });
    return lastEvent;
  };

  const getAllRows = ({ apiRef }) => gridRowIdsSelector(apiRef);

  function CustomToolbar() {
    const apiRef = useGridApiContext();
    const handleExport = (options) => apiRef.current.exportDataAsCsv(options);

    return (
      <GridToolbarContainer
        sx={{
          justifyContent: "right",
        }}
      >
        <Button
          variant="standard"
          disabled={bill.length === 0}
          onClick={() => handleExport({ getRowsToExport: getAllRows })}
          sx={{
            backgroundColor: bill.length === 0 ? "#CECECE" : "#488B8F",
            borderRadius: "4px",
            color: "#FFFFFF",
            height: "3rem",
            fontSize: "0.7rem",
            fontFamily: "Montserrat",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#5EA3A3",
            },
            marginRight: "1rem",
          }}
          aria-label="add"
        >
          EXPORTAR CSV
          <i
            class="fa-regular fa-download"
            style={{ marginLeft: 4, fontSize: "medium" }}
          ></i>
        </Button>
        <Button
          variant="standard"
          onClick={() => {
            const bills = {
              bills: bill,
            };
            fetchSaveBills(bills);
          }}
          sx={{
            backgroundColor: "#488B8F",
            borderRadius: "4px",
            color: "#FFFFFF",
            height: "3rem",
            fontSize: "0.7rem",
            fontFamily: "Montserrat",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#5EA3A3",
            },
          }}
          aria-label="add"
        >
          GUARDAR MODIFICACIONES
          <SaveOutlined sx={{ ml: 1, fontSize: "medium" }} />
        </Button>
      </GridToolbarContainer>
    );
  }

  useEffect(() => {
    if (dataReadBills) {
      let Bills = [];
      dataReadBills.bills.map((bill) => {
        Bills.push({
          id: bill.billId,
          billId: bill.billId,
          typeBill: bill.typeBill,
          emitterName: bill.emitterName,
          emitterId: bill.emitterId,
          payerId: bill.payerId,
          payerName: bill.payerName,
          dateBill: bill.dateBill,
          datePayment: bill.datePayment,
          expirationDate: bill.datePayment,
          billValue: bill.billValue,
          iva: bill.iva,
          cufe: bill.cufe,
          events: bill.events ? bill.events : [],
          n_events: bill.events ? bill.events.length : 0,
          lastEventDate: bill.events ? getLastEvent(bill.events).date : null,
          lastEventDescription: bill.events
            ? getLastEvent(bill.events).description
            : null,
          ret_iva: retIVA[bill.billId] ? retIVA[bill.billId] : 0,
          creditNotes:
            dataReadCreditNotes !== null &&
            dataReadCreditNotes !== undefined &&
            dataReadCreditNotes !== []
              ? dataReadCreditNotes.data?.filter(
                  (creditNote) => creditNote.associatedInvoice === bill.billId
                )
              : [],
          creditNotesValue:
            dataReadCreditNotes !== null &&
            dataReadCreditNotes !== undefined &&
            dataReadCreditNotes !== []
              ? sumOfAllCreditNotes(dataReadCreditNotes.data, bill.billId)
              : 0,

          other_retentions:
            otherRet[bill.billId] && otherRet[bill.billId] !== ""
              ? parseFloat(otherRet[bill.billId])
              : 0,
          ret_ica:
            retICA[bill.billId] && retICA[bill.billId] !== ""
              ? (retICA[bill.billId] / 100) * bill.subTotal
              : 0,
          ret_fte:
            retFTE[bill.billId] && retFTE[bill.billId] !== ""
              ? (retFTE[bill.billId] / 100) * bill.subTotal
              : 0,
          subTotal:
            dataReadCreditNotes !== null &&
            dataReadCreditNotes !== undefined &&
            dataReadCreditNotes !== []
              ? bill.subTotal -
                sumOfAllCreditNotes(dataReadCreditNotes.data, bill.billId)
              : bill.subTotal,
          total:
            dataReadCreditNotes !== null &&
            dataReadCreditNotes !== undefined &&
            dataReadCreditNotes !== []
              ? bill.subTotal -
                (retICA[bill.billId] && retICA[bill.billId] !== ""
                  ? (retICA[bill.billId] / 100) * bill.subTotal
                  : 0) -
                (retFTE[bill.billId] && retFTE[bill.billId] !== ""
                  ? (retFTE[bill.billId] / 100) * bill.subTotal
                  : 0) -
                (otherRet[bill.billId] && otherRet[bill.billId] !== ""
                  ? parseFloat(otherRet[bill.billId])
                  : 0) -
                (retIVA[bill.billId] ? retIVA[bill.billId] : 0) -
                sumOfAllCreditNotes(dataReadCreditNotes.data, bill.billId)
              : bill.subTotal -
                (retICA[bill.billId] && retICA[bill.billId] !== ""
                  ? (retICA[bill.billId] / 100) * bill.subTotal
                  : 0) -
                (retFTE[bill.billId] && retFTE[bill.billId] !== ""
                  ? (retFTE[bill.billId] / 100) * bill.subTotal
                  : 0) -
                (otherRet[bill.billId] && otherRet[bill.billId] !== ""
                  ? parseFloat(otherRet[bill.billId])
                  : 0) -
                (retIVA[bill.billId] ? retIVA[bill.billId] : 0),
        });
      });

      setBill(Bills);
    }
  }, [dataReadBills, dataReadCreditNotes, retIVA, retICA, retFTE, otherRet]);

  const columns = [
    {
      field: "ret_ica",
      headerName: "RET. ICA",
      width: 120,
      sortable: false,
      renderCell: (params) => {
        return (
          <InputTitles>
            <ValueFormat prefix="$ " value={params.value} />
          </InputTitles>
        );
      },

      valueGetter: (params) => {
        return Math.round(params.value);
      },
    },
    {
      field: "ret_fte",
      headerName: "RET. FTE",
      width: 120,
      sortable: false,
      renderCell: (params) => {
        return (
          <InputTitles>
            <ValueFormat prefix="$ " value={params.value} />
          </InputTitles>
        );
      },
      valueGetter: (params) => {
        return Math.round(params.value);
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
      field: "billId",
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
      disableExport: true,
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
              if (e.target.checked) {
                setRowsToApplyRETIVA([...rowsToApplyRETIVA, params.row]);
                setRetIVA({
                  ...retIVA,
                  [params.row.billId]: params.row.iva * 0.15,
                });
              } else {
                setRowsToApplyRETIVA(
                  rowsToApplyRETIVA.filter(
                    (row) => row.billId !== params.row.billId
                  )
                );
                setRetIVA({
                  ...retIVA,
                  [params.row.billId]: 0,
                });
              }
            }}
          />
        </Box>
      ),
    },
    {
      field: "ret_iva",
      headerName: "RET. IVA",
      width: 120,
      sortable: false,
      renderCell: (params) => {
        return (
          <InputTitles>
            <ValueFormat prefix="$ " value={params.value} />
          </InputTitles>
        );
      },

      valueGetter: (params) => {
        return Math.round(params.value);
      },
      valueSetter: (params) => {
        return Math.round(params.value);
      },
    },
    {
      field: "emitterName",
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
      field: "emitterId",
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
      field: "payerName",
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
      field: "payerId",
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
      headerName: "FECHA EMISI??N",
      width: 120,
      renderCell: (params) => {
        return (
          <InputTitles>
            <DateFormat date={params.value} />
          </InputTitles>
        );
      },
    },
    {
      field: "datePayment",
      headerName: "FECHA VENCIMIENTO",
      width: 150,
      renderCell: (params) => {
        return (
          <InputTitles>
            <DateFormat date={params.value} />
          </InputTitles>
        );
      },
    },
    {
      field: "cufe",
      headerName: "CUFE",
      width: 120,
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
            {params.value.length > 10
              ? params.value.substring(0, 10) + "..."
              : params.value}
          </InputTitles>
        </CustomTooltip>
      ),
    },
    {
      field: "n_events",
      headerName: "CANT. EVENTOS",
      width: 90,
      renderCell: (params) => {
        return <InputTitles>{params.value}</InputTitles>;
      },
    },
    {
      field: "lastEventDate",
      headerName: "FECHA ULT. EVENTO",
      width: 150,
      renderCell: (params) => {
        return (
          <InputTitles>
            <DateFormat date={params.value} />
          </InputTitles>
        );
      },
    },
    {
      field: "lastEventDescription",
      headerName: "DESC ULT. EVENTO",
      width: 150,
      renderCell: (params) => {
        return params.row.events.length > 0 ? (
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
              {params.value.length > 10
                ? params.value.substring(0, 10) + "..."
                : params.value}
            </InputTitles>
          </CustomTooltip>
        ) : (
          <InputTitles>Sin eventos</InputTitles>
        );
      },
    },
    {
      field: "billValue",
      headerName: "VALOR FACTURA",
      width: 120,
      renderCell: (params) => {
        return (
          <InputTitles>
            <ValueFormat prefix="$ " value={params.value} />
          </InputTitles>
        );
      },
    },
    {
      field: "iva",
      headerName: "IVA",
      width: 100,
      renderCell: (params) => {
        return (
          <InputTitles>
            <ValueFormat prefix="$ " value={params.value} />
          </InputTitles>
        );
      },
    },
    {
      field: "creditNotes",
      headerName: "NOTA CR??DITO",
      width: 110,
      renderCell: (params) => {
        return (
          <InputTitles>
            <ValueFormat prefix="$ " value={params.value} />
          </InputTitles>
        );
      },
      valueGetter: (params) => {
        if (params.value) {
          if (params.value.length === 0) {
            return 0;
          } else {
            let sum = 0;
            params?.value?.map((creditNote) => {
              sum += creditNote.total;
            });
            return sum;
          }
        } else {
          return 0;
        }
      },
    },
    {
      field: "other_retentions",
      headerName: "OTRAS RET.",
      width: 110,
      editable: true,
      renderCell: (params) => {
        return (
          <InputTitles>
            {otherRet[params.row.id] ? (
              <ValueFormat prefix="$ " value={otherRet[params.row.id]} />
            ) : (
              <ValueFormat prefix="$ " value={0} />
            )}
          </InputTitles>
        );
      },
      valueSetter: (params) => {
        setOtherRet({
          ...otherRet,
          [params.row.billId]: params.value,
        });
        return { ...params.row, other_retentions: params.value };
      },
    },
    {
      field: "subTotal",
      headerName: "SUBTOTAL",
      width: 100,
      renderCell: (params) => {
        return (
          <InputTitles>
            <ValueFormat prefix="$ " value={params.value} />
          </InputTitles>
        );
      },
    },
    {
      field: "total",
      headerName: "TOTAL",
      width: 100,
      renderCell: (params) => {
        return (
          <InputTitles>
            <ValueFormat prefix="$ " value={params.value} />
          </InputTitles>
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
        marginLeft="5%"
        width="67.6%"
        position="fixed"
      >
        <Box display="flex" flexDirection="row" alignItems="center">
          <BackButton path="/dashboard" buttonSx={{}} />

          <Typography
            letterSpacing={0}
            fontSize="1.6rem"
            fontWeight="medium"
            marginBottom="0.7rem"
            color="#5EA3A3"
            margin={0}
            marginLeft={1}
          >
            Control de Factura Electr??nica
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
            onChange={onChangeFilesExtractBill}
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
              marginLeft: "0.8rem",
            }}
            onClick={() => {
              creditNoteFile.current.click();
            }}
          >
            <Typography
              letterSpacing={0}
              fontSize="90%"
              fontWeight="bold"
              color="#488B8F"
            >
              Extraer Notas de Cr??dito
            </Typography>
          </Button>
          <input
            ref={creditNoteFile}
            id="extractCreditNotes"
            type="file"
            multiple="multiple"
            style={{ display: "none" }}
            onChange={onChangeFilesCreditNote}
          />
        </Box>

        <Box display="flex" flexDirection="column" marginTop="1.5rem">
          <Typography
            letterSpacing={0}
            fontSize="95%"
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
                fontWeight="bold"
                color={rowsToModify.length === 0 ? "#488B8F50" : "#488B8F"}
                textTransform="uppercase"
                marginRight="0.5rem"
              >
                Valor Ret. ICA
              </Typography>
              <TextField
                id="ICA"
                placeholder="0,00"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value > 100 || value < 0) {
                    Toast("El valor debe estar entre 0 y 100", "error");
                    e.target.value = "";
                    const billsWithRetICA = rowsToModify.reduce(
                      (acc, curr) => ((acc[curr.billId] = 0), acc),
                      {}
                    );
                    setRetICA(billsWithRetICA);
                  } else {
                    const billsWithRetICA = rowsToModify.reduce(
                      (acc, curr) => ((acc[curr.billId] = value), acc),
                      {}
                    );
                    setRetICA(billsWithRetICA);
                  }
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
                  endAdornment: (
                    <i
                      style={{
                        color: "#5EA3A3",
                      }}
                      className="fa-light fa-percent"
                    ></i>
                  ),
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
                }}
              >
                <ArrowForward sx={{ color: "white" }} />
              </IconButton>
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography
                letterSpacing={0}
                fontSize="85%"
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
                placeholder="0,00"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value > 100 || value < 0) {
                    Toast("El valor debe estar entre 0 y 100", "error");
                    e.target.value = "";
                    const billsWithRetFTE = rowsToModify.reduce(
                      (acc, curr) => ((acc[curr.billId] = 0), acc),
                      {}
                    );
                    setRetFTE(billsWithRetFTE);
                  } else {
                    const billsWithRetFTE = rowsToModify.reduce(
                      (acc, curr) => ((acc[curr.billId] = value), acc),
                      {}
                    );
                    setRetFTE(billsWithRetFTE);
                  }
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
                  endAdornment: (
                    <i
                      style={{
                        color: "#5EA3A3",
                      }}
                      class="fa-light fa-percent"
                    ></i>
                  ),
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
              Toolbar: CustomToolbar,
            }}
          />
        </Box>
      </Box>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};
