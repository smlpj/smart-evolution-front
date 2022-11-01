import { useEffect, useState } from "react";

import { Clear } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Autocomplete } from "@mui/material";

import { useFetch } from "@hooks/useFetch";

import BaseField from "@styles/fields/BaseField";

import { Cities } from "../queries";

const CitiesSelect = (props) => {
  const {
    value,
    onChange,
    fullWidth,
    error,
    helperText,
    departmentdId,
    ...rest
  } = props;

  const {
    loading: loading,
    error: fetchError,
    data: data,
    fetch: fetch,
  } = useFetch({ service: Cities, init: false });

  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (!departmentdId) return;

    fetch({ department: departmentdId });
  }, [departmentdId]);

  useEffect(() => {
    if (fetchError) return console.log(fetchError);
    if (!data) return;

    const cities = data.data.map((city) => ({
      label: city.description,
      value: city.id,
    }));

    setCities(cities);
  }, [data, loading, fetchError]);

  return (
    <Autocomplete
      disablePortal
      getOptionLabel={(option) => option.label}
      value={value}
      onChange={onChange}
      options={cities}
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

export default CitiesSelect;
