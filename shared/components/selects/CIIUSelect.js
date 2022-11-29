import { useEffect, useState } from "react";

import Clear from "@mui/icons-material/Clear";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Autocomplete, Box } from "@mui/material";

import { useFetch } from "@hooks/useFetch";

import MuiTextField from "@styles/fields";
import HelperText from "@styles/helperText";
import InputTitles from "@styles/inputTitles";

import { CIIU } from "./queries";

export default function CIIUSelect({ formik }) {
  // Hooks
  const {
    fetch: fetch,
    loading: loading,
    error: error,
    data: data,
  } = useFetch({ service: CIIU, init: true });

  const [ciiu, setCIIU] = useState([]);

  useEffect(() => {
    if (data) {
      var CIIUs = [];
      data.data.map((ciiu) => {
        CIIUs.push({
          label: `${ciiu.code} - ${ciiu.activity.description}`,
          value: ciiu.id,
        });
      });

      CIIUs.sort((a, b) => {
        if (a.label < b.label) {
          return -1;
        }
        if (a.label > b.label) {
          return 1;
        }
        return 0;
      });

      setCIIU(CIIUs);
    }

  }, [data, loading, error]);

  return (
    <Box width="100%">
      <Box>
        <InputTitles marginBottom={2}>CIIU</InputTitles>
        <Autocomplete
          id="ciiu"
          disablePortal
          options={ciiu}
          getOptionLabel={(option) => option.label}
          onChange={(e, value) => {
            if (value !== null) {
              formik.setFieldValue("ciiu", value.value);
            } else {
              formik.setFieldValue("ciiu", null);
            }
          }}
          color="#5EA3A3"
          inputValue={
            ciiu.filter((option) => option.value === formik.values.ciiu)[0]
              ?.label
          }
          value={
            ciiu.filter((option) => option.value === formik.values.ciiu)[0] ||
            null
          }
          popupIcon={<KeyboardArrowDownIcon sx={{ color: "#5EA3A3" }} />}
          clearIcon={<Clear sx={{ color: "#5EA3A3" }} />}
          renderInput={(params) => (
            <MuiTextField
              variant="standard"
              {...params}
              name="ciiu"
              placeholder="Seleccione su CIIU"
              value={formik.values.ciiu}
              error={formik.touched.ciiu && Boolean(formik.errors.ciiu)}
              sx={
                formik.touched.ciiu && Boolean(formik.errors.ciiu)
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
          {formik.touched.ciiu && formik.errors.ciiu}
        </HelperText>
      </Box>
    </Box>
  );
}
