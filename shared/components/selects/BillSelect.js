import { useEffect, useState } from "react";

import Clear from "@mui/icons-material/Clear";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Autocomplete, Box } from "@mui/material";

import { useFetch } from "@hooks/useFetch";

import MuiTextField from "@styles/fields";
import ValueFormat from "@formats/ValueFormat";
import InputTitles from "@styles/inputTitles";

import { Bills } from "./queries";

export default function BillSelect({
  formik,
  customer,
  marginLeft,
  marginTop,
  width,
}) {
  // Hooks
  const {
    fetch: fetch,
    loading: loading,
    error: error,
    data: data,
  } = useFetch({ service: Bills, init: false });

  const [values, setValues] = useState([]);

  const options1 = { style: 'currency', currency: 'COP' };
  const numberFormat1 = new Intl.NumberFormat('es-ES', options1);

  useEffect(() => {
    fetch(customer)
  }, [])

  useEffect(() => {
    if (data) {
      let bills = [];
      data.data.map((data) => {
        bills.push({
          label: `${data.billId}  - monto disponible ${numberFormat1.format(data.currentBalance)}`,
          value: data.id,
        });
      });
      setValues(bills);
    }

    if (error) console.log(error);
  }, [data, loading, error]);

  return (
    <Box
      width={ width ? width : "17vw" }
      sx={{
        marginLeft: marginLeft ? marginLeft : 0,
        marginTop: marginTop ? marginTop : 0,
      }}
    >
      <Box>
        <InputTitles marginBottom={2}>FACTURA</InputTitles>
        <Autocomplete
          id="bill"
          disablePortal
          options={values}
          getOptionLabel={(option) => option.label}
          onChange={(e, value) => {
            if (value !== null) {
              formik.setFieldValue("bill", value.value);
            } else {
              formik.setFieldValue("bill", null);
            }
          }}
          color="#5EA3A3"
          inputValue={values.id}
          value={values.label}
          popupIcon={<KeyboardArrowDownIcon sx={{ color: "#5EA3A3" }} />}
          clearIcon={<Clear sx={{ color: "#5EA3A3" }} />}
          renderInput={(params) => (
            <MuiTextField
              variant="standard"
              {...params}
              name="bill"
              placeholder={'Factura'}
              value={formik.values.bill}
              error={formik.touched.bill && Boolean(formik.errors.bill)}
              sx={
                formik.touched.bill && Boolean(formik.errors.bill)
                  ? { border: "1.4px solid #E6643180" }
                  : null
              }
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,
                sx: {
                  marginTop: "-7px",
                },
              }}
            />
          )}
        />
      </Box>
    </Box>
  );
}
