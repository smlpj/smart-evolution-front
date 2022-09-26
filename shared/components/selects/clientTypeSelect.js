import { ClientType } from "./queries";
import { useFetch } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import InputTitles from "../../../styles/inputTitles";
import { Autocomplete } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Clear from "@mui/icons-material/Clear";
import MuiTextField from "../../../styles/fields";
import HelperText from "../../../styles/helperText";

export default function ClientTypeSelect({ formik }) {
  // Hooks
  const {
    fetch: fetch,
    loading: loading,
    error: error,
    data: data,
  } = useFetch({ service: ClientType, init: true });

  const [type_client, setTypeClient] = useState([]);

  useEffect(() => {
    if (data) {
      var ClientTypes = [];
      data.data.map((type_client) => {
        if (type_client.description !== "gobierno") {
          ClientTypes.push({
            label:
              type_client.description === "jurídico"
                ? `Persona ${type_client.description.replace(/.$/, "a")}`
                : `Persona ${type_client.description}`,
            value: type_client.id,
          });
        }
      });

      setTypeClient(ClientTypes);
    }

    if (error) console.log(error);
  }, [data, loading, error]);

  return (
    <Box mb={6} width="100%">
      <Box>
        <InputTitles marginBottom={2}>Tipo de cliente</InputTitles>
        <Autocomplete
          id="type_client"
          disablePortal
          options={type_client}
          getOptionLabel={(option) => option.label}
          onChange={(e, value) => {
            if (value !== null) {
              formik.setFieldValue("type_client", value.value);
            } else {
              formik.setFieldValue("type_client", null);
            }
            console.log(formik.values.type_client);
          }}
          color="#5EA3A3"
          popupIcon={<KeyboardArrowDownIcon sx={{ color: "#5EA3A3" }} />}
          clearIcon={<Clear sx={{ color: "#5EA3A3" }} />}
          renderInput={(params) => (
            <MuiTextField
              variant="standard"
              {...params}
              name="type_client"
              placeholder="Tipo de cliente"
              value={formik.values.type_client}
              error={
                formik.touched.type_client && Boolean(formik.errors.type_client)
              }
              sx={
                formik.touched.type_client && Boolean(formik.errors.type_client)
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
          {formik.touched.type_client && formik.errors.type_client}
        </HelperText>
      </Box>
    </Box>
  );
}