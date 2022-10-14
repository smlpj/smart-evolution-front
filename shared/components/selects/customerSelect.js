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
    <Box width="17vw">
      <Box>
        <InputTitles marginBottom={2}>Nombre Inversionista</InputTitles>
        <Autocomplete
          id="client"
          disablePortal
          options={client}
          getOptionLabel={(option) => option.label}
          onChange={(e, value) => {
            if (value !== null) {
              formik.setFieldValue("client", value.value);
            } else {
              formik.setFieldValue("client", null);
            }
          }}
          color="#5EA3A3"
          inputValue={
            client.filter((option) => option.value === formik.values.client)[0]
              ?.label
          }
          value={
            client.filter(
              (option) => option.value === formik.values.client
            )[0] || null
          }
          popupIcon={<KeyboardArrowDownIcon sx={{ color: "#5EA3A3" }} />}
          clearIcon={<Clear sx={{ color: "#5EA3A3" }} />}
          renderInput={(params) => (
            <MuiTextField
              variant="standard"
              {...params}
              name="client"
              placeholder="Inversionista"
              value={formik.values.client}
              error={formik.touched.client && Boolean(formik.errors.client)}
              sx={
                formik.touched.client && Boolean(formik.errors.client)
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
          {formik.touched.client && formik.errors.client}
        </HelperText>
      </Box>
    </Box>
  );
}
