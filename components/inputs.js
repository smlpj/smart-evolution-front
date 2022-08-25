import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as yup from "yup";
import globalStyles from "../styles/global.module.css";

export default function InputAdornments() {
  const validationSchema = yup.object({
    email: yup
      .string("Ingresa un email")
      .matches(
        /^[^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$]+$/,
        "Ingresa un email válido"
      )
      .required("El email es requerido"),
    password: yup
      .string("Ingresa una contraseña")
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .required("La contraseña es requerida"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="column">
          <h1 className={globalStyles.subtitulo}>Email</h1>
          <FormControl fullWidth>
            <TextField
              id="email"
              placeholder="Ingresa tu email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              variant="outlined"
              margin="normal"
              fullWidth
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </FormControl>
          <h1 className={globalStyles.subtitulo}>Contraseña</h1>
          <FormControl fullWidth>
            <TextField
              id="password"
              placeholder="Ingresa tu contraseña"
              name="password"
              type={values.showPassword ? "text" : "password"}
              onChange={formik.handleChange}
              value={formik.values.password}
              variant="outlined"
              margin="normal"
              fullWidth
              error={formik.errors.password ? true : false}
              helperText={
                formik.errors.password ? formik.errors.password : null
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary" type="submit">
            Enviar
          </Button>
        </Box>
      </Box>
    </form>
  );
}
