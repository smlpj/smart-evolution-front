import { Cities } from "./queries";
import { useFetch } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import InputTitles from "../../../styles/inputTitles";
import { Autocomplete } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Clear from "@mui/icons-material/Clear";
import MuiTextField from "../../../styles/fields";

export default function CitySelect(formik) {
  // Hooks
  const {
    fetch: fetch,
    loading: loading,
    error: error,
    data: data,
  } = useFetch({ service: Cities, init: true });

  const [city, setCity] = useState([]);

  useEffect(() => {
    if (data) console.log(data);

    if (error) console.log(error);
  }, [data, loading, error]);

  return (
    <Box mb={4}>
      <Box width="18vw">
        <InputTitles marginBottom={2}>Tipo de identificación</InputTitles>
        <Autocomplete
          disablePortal
          options={[]}
          color="#5EA3A3"
          popupIcon={<KeyboardArrowDownIcon sx={{ color: "#5EA3A3" }} />}
          clearIcon={<Clear sx={{ color: "#5EA3A3" }} />}
          renderInput={(params) => (
            <MuiTextField
              variant="standard"
              {...params}
              id="type_identity"
              onChange={formik.handleChange}
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
