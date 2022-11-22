import { Box, Button, Typography } from "@mui/material";
// Styles
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import BillSelect from "@components/selects/BillSelect";
// Selects
import EmitterSelect from "@components/selects/EmitterSelect";
import InvestorSelect from "@components/selects/InvestorSelect";
import PayerSelect from "@components/selects/PayerSelect";
import AccountSelect from "@components/selects/accountSelect";
import TypeOperationSelect from "@components/selects/typeOperationSelect";

import BackButton from "@styles/buttons/BackButton";
import MuiTextField from "@styles/fields";
import InputTitles from "@styles/inputTitles";

export const ManageOperationC = ({ formik }) => {
  return (
    <>
      <Box
        height="78vh"
        display="flex"
        flexDirection="column"
        marginLeft="2%"
        width="67.6%"
        position="fixed"
      >
        <Box display="flex" flexDirection="row" alignItems="center">
          <BackButton path="/dashboard" buttonSx={{}} />
        </Box>
        <Box>
          <Typography
            letterSpacing={0}
            fontSize="1.6rem"
            fontWeight="medium"
            marginBottom="0.7rem"
            color="#5EA3A3"
            marginLeft={1.5}
          >
            Registro De Operaciones
          </Typography>
        </Box>

        <Box
          display="flex"
          flexDirection="row"
          alignItems="space-around"
          sx={{
            marginTop: "1rem",
            marginLeft: "1rem",
          }}
        >
          <TypeOperationSelect formik={formik} />
          <Box
            sx={{
              marginLeft: "3rem",
            }}
          >
            <InputTitles marginBottom={2}>Fecha de operacion</InputTitles>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Date desktop"
                value={formik.values.opDate}
                onChange={formik.handleChange}
                renderInput={(params) => (
                  <MuiTextField
                    id="opDate"
                    placeholder="Ingresa la fecha"
                    name="opDate"
                    type="date"
                    variant="standard"
                    margin="normal"
                    value={formik.values.opDate}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        marginTop: "-5px",
                      },
                    }}
                    onChange={formik.handleChange}
                    error={formik.touched.date && Boolean(formik.errors.opDate)}
                    sx={
                      formik.touched.date && Boolean(formik.errors.opDate)
                        ? { border: "1.4px solid #E6643180", marginTop: "0px" }
                        : {
                            border: "1.4px solid #5EA3A3",
                            marginTop: "0px",
                          }
                    }
                  />
                )}
                components={{
                  OpenPickerIcon: () => (
                    <Box color="#5EA3A3" width={24} height={24}>
                      <i className="far fa-xs fa-calendar-range" />
                    </Box>
                  ),
                }}
              />
            </LocalizationProvider>
          </Box>
          <Box
            sx={{
              marginLeft: "2rem",
            }}
          >
            <InputTitles marginBottom={2}># de operacion</InputTitles>
            <MuiTextField
              id="opId"
              placeholder=""
              name="opId"
              type="number"
              variant="standard"
              margin="normal"
              disabled
              value={formik.values.opId}
              InputProps={{
                disableUnderline: true,
                sx: {
                  marginTop: "-5px",
                },
              }}
              onChange={formik.handleChange}
              error={formik.touched.opId && Boolean(formik.errors.opId)}
              sx={
                formik.touched.opId && Boolean(formik.errors.opId)
                  ? { border: "1.4px solid #E6643180", marginTop: "0px" }
                  : {
                      border: "1.4px solid #5EA3A3",
                      marginTop: "0px",
                    }
              }
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="space-around"
          sx={{
            marginTop: "2rem",
            marginLeft: "1rem",
          }}
        >
          <EmitterSelect formik={formik} customer={"emisor"} />
          <PayerSelect
            formik={formik}
            customer={"pagador"}
            marginLeft={"3rem"}
          />
        </Box>

        <Box
          display="flex"
          flexDirection="row"
          alignItems="space-around"
          sx={{
            marginTop: "2rem",
            marginLeft: "1rem",
          }}
        >
          <InvestorSelect formik={formik} customer={"inversionista"} />

          <AccountSelect formik={formik} marginLeft={"3rem"} />
        </Box>

        <Box>
          <BillSelect
            formik={formik}
            customer={formik.values.emitter}
            width={"37.5vw"}
            marginLeft={"1rem"}
            marginTop={"2rem"}
          />
        </Box>
      </Box>
    </>
  );
};
