import { useEffect, useState } from "react";

import Clear from "@mui/icons-material/Clear";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Autocomplete, Box } from "@mui/material";

import { useFetch } from "@hooks/useFetch";

import MuiTextField from "@styles/fields";
import HelperText from "@styles/helperText";
import InputTitles from "@styles/inputTitles";

import { Clients } from "./queries";

export default function ClientSelect({ formik, customer, marginLeft, marginTop }) {
  // Hooks
  const {
    fetch: fetch,
    loading: loading,
    error: error,
    data: data,
  } = useFetch({ service: Clients, init: true });

  const [client, setClient] = useState([]);

  useEffect(() => {
    if (data) {
      var Clients = [];
      data.data.map((client) => {
        Clients.push({
          label: client.first_name
            ? client.first_name + " " + client.last_name
            : client.social_reason,
          value: client.id,
        });
      });
      setClient(Clients);
    }

    if (error) console.log(error);
  }, [data, loading, error]);

  return (
    <Box width="17vw" sx={{
        marginLeft: marginLeft ? marginLeft : 0, 
        marginTop: marginTop ? marginTop : 0
    }}>
      <Box>
        <InputTitles marginBottom={2}>
          Nombre {customer ? customer : "Inversionista"}
        </InputTitles>
        <Autocomplete
          id="payer"
          disablePortal
          options={client}
          getOptionLabel={(option) => option.label}
          onChange={(e, value) => {
            if (value !== null) {
              formik.setFieldValue("payer", value.value);
            } else {
              formik.setFieldValue("payer", null);
            }
          }}
          color="#5EA3A3"
          inputValue={
            client.filter((option) => option.value === formik.values.payer)[0]
              ?.label
          }
          value={
            client.filter(
              (option) => option.value === formik.values.payer
            )[0] || null
          }
          popupIcon={<KeyboardArrowDownIcon sx={{ color: "#5EA3A3" }} />}
          clearIcon={<Clear sx={{ color: "#5EA3A3" }} />}
          renderInput={(params) => (
            <MuiTextField
              variant="standard"
              {...params}
              name="payer"
              placeholder={customer ? customer : "Inversionista"}
              value={formik.values.payer}
              error={formik.touched.payer && Boolean(formik.errors.payer)}
              sx={
                formik.touched.payer && Boolean(formik.errors.payer)
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
          {formik.touched.payer && formik.errors.payer}
        </HelperText>
      </Box>
    </Box>
  );
}
