import { Departments } from "./queries";
import { useFetch } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import InputTitles from "../../../styles/inputTitles";
import { Autocomplete } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Clear from "@mui/icons-material/Clear";
import MuiTextField from "../../../styles/fields";

export default function DepartmentSelect({ formik }) {
  // Hooks
  const {
    fetch: fetch,
    loading: loading,
    error: error,
    data: data,
  } = useFetch({ service: Departments, init: true });

  const [department, setDepartment] = useState([]);

  useEffect(() => {
    if (data) {
      var departments = [];
      data.data.map((department) => {
        departments.push({
          label: department.description,
          value: department.id,
        });
      });

      setDepartment(departments);
    }

    if (error) console.log(error);
  }, [data, loading, error]);

  return (
    <Box width="17vw">
      <Box>
        <InputTitles marginBottom={2}>Departamento</InputTitles>
        <Autocomplete
          id="department"
          disablePortal
          options={department}
          getOptionLabel={(option) => option.label}
          onChange={(e, value) => {
            if (value !== null) {
              formik.setFieldValue("department", value.value);
            } else {
              formik.setFieldValue("department", null);
              formik.setFieldValue("city", null);
            }
          }}
          color="#5EA3A3"
          popupIcon={<KeyboardArrowDownIcon sx={{ color: "#5EA3A3" }} />}
          clearIcon={<Clear sx={{ color: "#5EA3A3" }} />}
          renderInput={(params) => (
            <MuiTextField
              variant="standard"
              {...params}
              name="department"
              placeholder="Departamento"
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
      </Box>
    </Box>
  );
}