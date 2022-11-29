/* eslint-disable react-hooks/exhaustive-deps */
import { AccountingAccounts } from "./queries";
import { useFetch } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import InputTitles from "../../../styles/inputTitles";
import { Autocomplete } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Clear from "@mui/icons-material/Clear";
import MuiTextField from "../../../styles/fields";
import HelperText from "../../../styles/helperText";

export default function AccountingAccountSelect({ formik }) {
  // Hooks
  const {
    fetch: fetch,
    loading: loading,
    error: error,
    data: data,
  } = useFetch({ service: AccountingAccounts, init: true });

  const [account, setAccount] = useState([]);

  useEffect(() => {
    if (data) {
      var accounts = [];
      data.data.map((account) => {
        accounts.push({
          label: `${account.accountNumber}`,
          value: account.id,
        });
      });
      setAccount(accounts);
    }

  }, [data, loading, error]);

  useEffect(() => {
    if (formik.values.client !== undefined && formik.values.client !== null) {
      fetch({ client: formik.values.client });
    } else {
      setAccount([]);
    }
  }, [formik.values.client]);

  return (
    <Box width="17vw">
      <Box>
        <InputTitles marginBottom={2}>Cuenta</InputTitles>
        <Autocomplete
          id="account"
          disablePortal
          options={account}
          getOptionLabel={(option) => option.label}
          onChange={(e, value) => {
            if (value !== null) {
              formik.setFieldValue("account", value.value);
            } else {
              formik.setFieldValue("account", null);
            }
          }}
          color="#5EA3A3"
          inputValue={
            account.filter(
              (option) => option.value === formik.values.account
            )[0]?.label
          }
          value={
            account.filter(
              (option) => option.value === formik.values.account
            )[0] || null
          }
          popupIcon={<KeyboardArrowDownIcon sx={{ color: "#5EA3A3" }} />}
          clearIcon={<Clear sx={{ color: "#5EA3A3" }} />}
          renderInput={(params) => (
            <MuiTextField
              variant="standard"
              {...params}
              name="account"
              placeholder="Cuenta"
              value={formik.values.account}
              error={formik.touched.account && Boolean(formik.errors.account)}
              sx={
                formik.touched.account && Boolean(formik.errors.account)
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
          {formik.touched.account && formik.errors.account}
        </HelperText>
      </Box>
    </Box>
  );
}
