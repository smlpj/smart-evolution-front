import { useEffect, useState } from "react";

import { Clear } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Autocomplete } from "@mui/material";

import { useFetch } from "@hooks/useFetch";

import BaseField from "@styles/fields/BaseField";

import { IdentityType } from "../queries";

const DocumentTypesSelect = (props) => {
  const { value, onChange, fullWidth, error, helperText, ...rest } = props;

  const {
    loading: loading,
    error: fetchError,
    data: data,
  } = useFetch({ service: IdentityType, init: true });

  const [documentTypes, setDocumentTypes] = useState([]);

  useEffect(() => {
    if (fetchError) return console.log(fetchError);
    if (!data) return;

    const documentTypes = data.data.map((documentType) => ({
      label: documentType.description,
      value: documentType.id,
    }));

    setDocumentTypes(documentTypes);
  }, [data, loading, fetchError]);

  return (
    <Autocomplete
      disablePortal
      getOptionLabel={(option) => option.label}
      value={value}
      onChange={onChange}
      options={documentTypes}
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

export default DocumentTypesSelect;
