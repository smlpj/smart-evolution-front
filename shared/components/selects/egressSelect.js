import { Egresses } from "./queries";
import { useFetch } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import InputTitles from "../../../styles/inputTitles";
import { Autocomplete } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Clear from "@mui/icons-material/Clear";
import MuiTextField from "../../../styles/fields";
import HelperText from "../../../styles/helperText";

export default function EgressSelect({ formik }) {
  // Hooks
  const {
    fetch: fetch,
    loading: loading,
    error: error,
    data: data,
  } = useFetch({ service: Egresses, init: true });

  const [egress, setEgress] = useState([]);

  useEffect(() => {
    if (data) {
      var egresss = [];
      data.data.map((egress) => {
        egresss.push({
          label: `${egress.description}`,
          value: egress.id,
        });
      });
      setEgress(egresss);
    }

    if (error) console.log(error);
  }, [data, loading, error]);

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Box width="17vw">
      <Box>
        <InputTitles marginBottom={2}>Tipo de Egreso</InputTitles>
        <Autocomplete
          id="egress"
          disablePortal
          options={egress}
          getOptionLabel={(option) => option.label}
          onChange={(e, value) => {
            if (value !== null) {
              formik.setFieldValue("egressType", value.value);
            } else {
              formik.setFieldValue("egressType", null);
            }
          }}
          color="#5EA3A3"
          inputValue={
            egress.filter(
              (option) => option.value === formik.values.egressType
            )[0]?.label
          }
          value={
            egress.filter(
              (option) => option.value === formik.values.egressType
            )[0] || null
          }
          popupIcon={<KeyboardArrowDownIcon sx={{ color: "#5EA3A3" }} />}
          clearIcon={<Clear sx={{ color: "#5EA3A3" }} />}
          renderInput={(params) => (
            <MuiTextField
              variant="standard"
              {...params}
              name="egress"
              placeholder="Tipo de Egreso"
              value={formik.values.egressType}
              error={
                formik.touched.egressType && Boolean(formik.errors.egressType)
              }
              sx={
                formik.touched.egressType && Boolean(formik.errors.egressType)
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
          {formik.touched.egressType && formik.errors.egressType}
        </HelperText>
      </Box>
    </Box>
  );
}
