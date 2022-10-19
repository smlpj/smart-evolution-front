import { Banks } from "./queries";
import { useFetch } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import InputTitles from "../../../styles/inputTitles";
import { Autocomplete } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Clear from "@mui/icons-material/Clear";
import MuiTextField from "../../../styles/fields";
import HelperText from "../../../styles/helperText";

export default function BankSelect({ formik }) {
  // Hooks
  const {
    fetch: fetch,
    loading: loading,
    error: error,
    data: data,
  } = useFetch({ service: Banks, init: true });

  const [bank, setBank] = useState([]);

  useEffect(() => {
    if (data) {
      var banks = [];
      data.data.map((bank) => {
        banks.push({
          label: `${bank.description}`,
          value: bank.id,
        });
      });
      setBank(banks);
    }

    if (error) console.log(error);
  }, [data, loading, error]);

  useEffect(() => {
    fetch();
  }, [formik.values.client]);

  return (
    <Box width="17vw">
      <Box>
        <InputTitles marginBottom={2}>Banco</InputTitles>
        <Autocomplete
          id="bank"
          disablePortal
          options={bank}
          getOptionLabel={(option) => option.label}
          onChange={(e, value) => {
            if (value !== null) {
              formik.setFieldValue("bank", value.value);
            } else {
              formik.setFieldValue("bank", null);
            }
          }}
          color="#5EA3A3"
          inputValue={
            bank.filter((option) => option.value === formik.values.bank)[0]
              ?.label
          }
          value={
            bank.filter((option) => option.value === formik.values.bank)[0] ||
            null
          }
          popupIcon={<KeyboardArrowDownIcon sx={{ color: "#5EA3A3" }} />}
          clearIcon={<Clear sx={{ color: "#5EA3A3" }} />}
          renderInput={(params) => (
            <MuiTextField
              variant="standard"
              {...params}
              name="bank"
              placeholder="Banco"
              value={formik.values.bank}
              error={formik.touched.bank && Boolean(formik.errors.bank)}
              sx={
                formik.touched.bank && Boolean(formik.errors.bank)
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
          {formik.touched.bank && formik.errors.bank}
        </HelperText>
      </Box>
    </Box>
  );
}
