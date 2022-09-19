import { Cities } from "./queries";
import { useFetch } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import InputTitles from "../../../styles/inputTitles";
import { Autocomplete } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Clear from "@mui/icons-material/Clear";
import MuiTextField from "../../../styles/fields";

export default function CitySelect({ formik }) {
  // Hooks
  const {
    fetch: fetch,
    loading: loading,
    error: error,
    data: data,
  } = useFetch({ service: Cities, init: false });

  const [city, setCity] = useState([]);

  useEffect(() => {
    if (data) {
      var cities = [];
      data.data.map((city) => {
        cities.push({
          label: city.description,
          value: city.id,
        });
      });

      setCity(cities);
    }

    if (error) console.log(error);
  }, [data, loading, error]);

  useEffect(() => {
    console.log(formik.values.department);
    if (
      formik.values.department !== undefined &&
      formik.values.department !== null
    ) {
      fetch({ department: formik.values.department });
    } else {
      setCity([]);
    }
  }, [formik.values.department]);

  return (
    <Box mb={4} ml={5} width="18vw">
      <Box>
        <InputTitles marginBottom={2}>Ciudad</InputTitles>
        <Autocomplete
          id="city"
          disablePortal
          options={city}
          getOptionLabel={(option) => option.label}
          onChange={(e, value) => {
            if (value !== null) {
              formik.setFieldValue("city", value.value);
            } else {
              formik.setFieldValue("city", null);
            }
          }}
          color="#5EA3A3"
          popupIcon={<KeyboardArrowDownIcon sx={{ color: "#5EA3A3" }} />}
          clearIcon={<Clear sx={{ color: "#5EA3A3" }} />}
          renderInput={(params) => (
            <MuiTextField
              variant="standard"
              {...params}
              name="city"
              placeholder="Ciudad"
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
