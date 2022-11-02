import { useEffect, useState } from "react";

import Clear from "@mui/icons-material/Clear";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Autocomplete, Box } from "@mui/material";

import { useFetch } from "@hooks/useFetch";

import MuiTextField from "@styles/fields";
import HelperText from "@styles/helperText";
import InputTitles from "@styles/inputTitles";

import { Citizenship } from "./queries";

export default function CitizenshipSelect({ formik }) {
  // Hooks
  const {
    fetch: fetch,
    loading: loading,
    error: error,
    data: data,
  } = useFetch({ service: Citizenship, init: true });

  const [citizenship, setCitizenship] = useState([]);

  useEffect(() => {
    if (data) {
      var Citizenships = [];
      data.data.map((citizenship) => {
        Citizenships.push({
          label: citizenship.name_es,
          value: citizenship.id,
        });
      });
      setCitizenship(Citizenships);
    }

    if (error) console.log(error);
  }, [data, loading, error]);

  return (
    <Box ml={5} width="17vw">
      <Box>
        <InputTitles marginBottom={2}>Nacionalidad</InputTitles>
        <Autocomplete
          id="citizenship"
          disablePortal
          options={citizenship}
          getOptionLabel={(option) => option.label}
          onChange={(e, value) => {
            if (value !== null) {
              formik.setFieldValue("citizenship", value.value);
            } else {
              formik.setFieldValue("citizenship", null);
            }
          }}
          color="#5EA3A3"
          inputValue={
            citizenship.filter(
              (option) => option.value === formik.values.citizenship
            )[0]?.label
          }
          value={
            citizenship.filter(
              (option) => option.value === formik.values.citizenship
            )[0] || null
          }
          popupIcon={<KeyboardArrowDownIcon sx={{ color: "#5EA3A3" }} />}
          clearIcon={<Clear sx={{ color: "#5EA3A3" }} />}
          renderInput={(params) => (
            <MuiTextField
              variant="standard"
              {...params}
              name="citizenship"
              placeholder="Corredor"
              value={formik.values.citizenship}
              error={
                formik.touched.citizenship && Boolean(formik.errors.citizenship)
              }
              sx={
                formik.touched.citizenship && Boolean(formik.errors.citizenship)
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
          {formik.touched.citizenship && formik.errors.citizenship}
        </HelperText>
      </Box>
    </Box>
  );
}
