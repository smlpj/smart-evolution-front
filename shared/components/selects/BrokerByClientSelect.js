import { useEffect, useState } from "react";

import Clear from "@mui/icons-material/Clear";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Autocomplete, Box } from "@mui/material";

import { useFetch } from "@hooks/useFetch";

import MuiTextField from "@styles/fields";
import HelperText from "@styles/helperText";
import InputTitles from "@styles/inputTitles";

import { BrokerByClient } from "./queries";

export default function BrokerByClientSelect({
  formik,
  isEmitter,
  marginLeft,
  marginTop,
  width,
}) {
  const [broker, setBroker] = useState([]);

  const {
    fetch: fetch,
    loading: loading,
    error: error,
    data: data,
  } = useFetch({ service: BrokerByClient, init: false });

  useEffect(() => {
    if (isEmitter) {
      fetch(formik.values.emitter);
    }
  }, [formik.values.emitter]);

  useEffect(() => {
    if (!isEmitter) {
      fetch(formik.values.investor);
    }
  }, [formik.values.investor]);

  useEffect(() => {
    if (data) {
      let brokers = [];
      brokers.push({
        label: `${data.data.first_name} ${data.data.last_name}`,
        value: data.data.id,
      });
      setBroker(brokers);
    }

  }, [data, loading, error]);

  return (
    <>
      <Box width="17vw" sx={{
        marginLeft: marginLeft ? marginLeft : "0",
      }}>
        {isEmitter ? (
          <>
            <InputTitles marginBottom={2}>Corredor Emisor</InputTitles>
            <Autocomplete
              id="emitterBroker"
              disablePortal
              options={broker}
              getOptionLabel={(option) => option.label}
              onChange={(e, value) => {
                if (value !== null) {
                  formik.setFieldValue("emitterBroker", value.value);
                } else {
                  formik.setFieldValue("emitterBroker", null);
                }
              }}
              color="#5EA3A3"
              inputValue={broker.label}
              value={broker.id}
              popupIcon={<KeyboardArrowDownIcon sx={{ color: "#5EA3A3" }} />}
              clearIcon={<Clear sx={{ color: "#5EA3A3" }} />}
              renderInput={(params) => (
                <MuiTextField
                  variant="standard"
                  {...params}
                  placeholder="Corredor Emisor"
                  name="emitterBroker"
                  value={formik.values.emitterBroker}
                  error={
                    formik.touched.emitterBroker &&
                    Boolean(formik.errors.emitterBroker)
                  }
                  sx={
                    formik.touched.emitterBroker &&
                    Boolean(formik.errors.emitterBroker)
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
          </>
        ) : (
          <>
            <InputTitles marginBottom={2}>Corredor Inversionista</InputTitles>
            <Autocomplete
              id="investorBroker"
              disablePortal
              options={broker}
              getOptionLabel={(option) => option.label}
              onChange={(e, value) => {
                if (value !== null) {
                  formik.setFieldValue("investorBroker", value.value);
                } else {
                  formik.setFieldValue("investorBroker", null);
                }
              }}
              color="#5EA3A3"
              inputValue={broker.label}
              value={broker.id}
              popupIcon={<KeyboardArrowDownIcon sx={{ color: "#5EA3A3" }} />}
              clearIcon={<Clear sx={{ color: "#5EA3A3" }} />}
              renderInput={(params) => (
                <MuiTextField
                  variant="standard"
                  {...params}
                  placeholder="Corredor Emisor"
                  name="investorBroker"
                  value={formik.values.investorBroker}
                  error={
                    formik.touched.investorBroker &&
                    Boolean(formik.errors.investorBroker)
                  }
                  sx={
                    formik.touched.investorBroker &&
                    Boolean(formik.errors.investorBroker)
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
          </>
        )}
      </Box>
    </>
  );
}
