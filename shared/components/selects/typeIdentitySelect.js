import { IdentityType } from "./queries";
import { useFetch } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import InputTitles from "../../../styles/inputTitles";
import { Autocomplete } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Clear from "@mui/icons-material/Clear";
import MuiTextField from "../../../styles/fields";

export default function TypeIDSelect({ formik }) {
  // Hooks
  const {
    fetch: fetch,
    loading: loading,
    error: error,
    data: data,
  } = useFetch({ service: IdentityType, init: true });

  const [typeID, setTypeID] = useState([]);

  useEffect(() => {
    if (data) {
      var typesID = [];
      data.data.map((typeID) => {
        typesID.push({ label: typeID.description, value: typeID.id });
      });

      setTypeID(typesID);
    }

    if (error) console.log(error);
  }, [data, loading, error]);

  return (
    <Box mb={4}>
      <Box width="18vw">
        <InputTitles marginBottom={2}>Tipo de identificación</InputTitles>
        <Autocomplete
          disablePortal
          id="type_identity"
          options={typeID}
          getOptionLabel={(option) => option.label}
          onChange={(e, value) => {
            if (value !== null) {
              formik.setFieldValue("type_identity", value.value);
            } else {
              formik.setFieldValue("type_identity", null);
            }
          }}
          color="#5EA3A3"
          popupIcon={<KeyboardArrowDownIcon sx={{ color: "#5EA3A3" }} />}
          clearIcon={<Clear sx={{ color: "#5EA3A3" }} />}
          renderInput={(params) => (
            <MuiTextField
              variant="standard"
              {...params}
              placeholder="Tipo de identificación"
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,
                sx: {
                  marginTop: "-2px",
                },
              }}
            />
          )}
        />
      </Box>
    </Box>
  );
}
