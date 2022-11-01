import { useEffect, useState } from "react";

import { Clear } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Autocomplete } from "@mui/material";

import { useFetch } from "@hooks/useFetch";

import BaseField from "@styles/fields/BaseField";

import { CIIU } from "../queries";

const CIIUsSelect = (props) => {
  const { value, onChange, fullWidth, error, helperText, ...rest } = props;

  const {
    loading: loading,
    error: fetchError,
    data: data,
  } = useFetch({ service: CIIU, init: true });

  const [ciius, setCiius] = useState([]);

  useEffect(() => {
    if (fetchError) return console.log(fetchError);
    if (!data) return;

    const ciius = data.data.map((ciiu) => ({
      label: `${ciiu.code} - ${ciiu.activity.description}`,
      value: ciiu.id,
    }));

    setCiius(ciius);
  }, [data, loading, fetchError]);

  return (
    <Autocomplete
      disablePortal
      getOptionLabel={(option) => option.label}
      value={value}
      onChange={onChange}
      options={ciius}
      noOptionsText="Sin resultados"
      popupIcon={<KeyboardArrowDownIcon sx={{ color: "#5EA3A3" }} />}
      clearIcon={<Clear sx={{ color: "#5EA3A3" }} />}
      renderInput={(params) => (
        <BaseField
          {...params}
          fullWidth={fullWidth}
          error={error}
          helperText={helperText}
        />
      )}
      sx={{ ".MuiAutocomplete-popupIndicator": { margin: 0 } }}
    />
  );
};

export default CIIUsSelect;
