import { useFormik } from "formik";
import * as yup from "yup";
import MuiTextField from "../../styles/fields";
import HelperText from "../../styles/helperText";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

export default function GlobalInput() {
  return (
    <MuiTextField
      variant="standard"
      margin="normal"
      fullWidth
      InputProps={{
        disableUnderline: true,
      }}
    />
  );
}
