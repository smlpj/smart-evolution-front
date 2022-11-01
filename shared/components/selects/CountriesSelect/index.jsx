import { useEffect, useState } from "react";

import { Clear } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Autocomplete } from "@mui/material";

import { useFetch } from "@hooks/useFetch";

import BaseField from "@styles/fields/BaseField";

import { Citizenship } from "../queries";

const CountriesSelect = (props) => {
  const { value, onChange, fullWidth, error, helperText, ...rest } = props;

  const {
    loading: loading,
    error: fetchError,
    data: data,
  } = useFetch({ service: Citizenship, init: true });

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (fetchError) return console.log(fetchError);
    if (!data) return;

    const countries = data.data.map((country) => ({
      label: country.name_es,
      value: country.id,
    }));

    setCountries(countries);
  }, [data, loading, fetchError]);

  return (
    <Autocomplete
      disablePortal
      getOptionLabel={(option) => option.label}
      value={value}
      onChange={onChange}
      options={countries}
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

export default CountriesSelect;
