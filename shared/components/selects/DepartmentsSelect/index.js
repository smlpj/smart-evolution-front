import { useEffect, useState } from "react";

import { Clear } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Autocomplete } from "@mui/material";

import { useFetch } from "@hooks/useFetch";

import BaseField from "@styles/fields/BaseField";

import { Departments } from "../queries";

const DepartmentsSelect = (props) => {
  const { value, onChange, fullWidth, error, helperText, ...rest } = props;

  const {
    loading: loading,
    error: fetchError,
    data: data,
  } = useFetch({ service: Departments, init: true });

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    if (fetchError) return console.log(fetchError);
    if (!data) return;

    const departments = data.data.map((department) => ({
      label: department.description,
      value: department.id,
    }));

    setDepartments(departments);
  }, [data, loading, fetchError]);

  return (
    <Autocomplete
      disablePortal
      getOptionLabel={(option) => option.label}
      value={value}
      onChange={onChange}
      options={departments}
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

export default DepartmentsSelect;
