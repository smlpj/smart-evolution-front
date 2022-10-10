import { Clients } from "./queries";
import { useFetch } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import InputTitles from "../../../styles/inputTitles";
import { Autocomplete } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Clear from "@mui/icons-material/Clear";
import MuiTextField from "../../../styles/fields";
import HelperText from "../../../styles/helperText";

export default function ClientSelect({ formik }) {
  // Hooks
  const {
    fetch: fetch,
    loading: loading,
    error: error,
    data: data,
  } = useFetch({ service: Clients, init: true });

  const [customer, setClient] = useState([]);

  useEffect(() => {
    if (data) {
      var Clients = [];
      data.data.map((customer) => {
        Clients.push({
          label: `${customer.first_name} ${customer.last_name}`,
          value: customer.id,
        });
      });
      setClient(Clients);
    }

    if (error) console.log(error);
  }, [data, loading, error]);

  return (
    <Box width="17vw">
      <Box>
        <InputTitles marginBottom={2}>Nombre Inversionista</InputTitles>
        <Autocomplete
          id="customer"
          disablePortal
          options={customer}
          getOptionLabel={(option) => option.label}
          onChange={(e, value) => {
            if (value !== null) {
              formik.setFieldValue("customer", value.value);
            } else {
              formik.setFieldValue("customer", null);
            }
          }}
          color="#5EA3A3"
          inputValue={
            customer.filter((option) => option.value === formik.values.customer)[0]
              ?.label
          }
          value={
            customer.filter(
              (option) => option.value === formik.values.customer
            )[0] || null
          }
          popupIcon={<KeyboardArrowDownIcon sx={{ color: "#5EA3A3" }} />}
          clearIcon={<Clear sx={{ color: "#5EA3A3" }} />}
          renderInput={(params) => (
            <MuiTextField
              variant="standard"
              {...params}
              name="customer"
              placeholder="Corredor"
              value={formik.values.customer}
              error={formik.touched.customer && Boolean(formik.errors.customer)}
              sx={
                formik.touched.customer && Boolean(formik.errors.customer)
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
        <HelperText position="fixed">
          {formik.touched.customer && formik.errors.customer}
        </HelperText>
      </Box>
    </Box>
  );
}
