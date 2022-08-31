import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import globalStyles from "../../styles/global.module.css";
import MuiButton from "../../styles/button";
import MuiTextField from "../../styles/fields";
import HelperText from "../../styles/helperText";
import LoginIcon from "@mui/icons-material/Login";

export const InputAdornments = ({
  formik,
  values,
  handleClickShowPassword,
  handleMouseDownPassword,
}) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box display="flex" flexDirection="column" sx={{ marginTop: "50px" }}>
        <Box display="flex" flexDirection="column">
          <h1 className={globalStyles.subtitulo}>Email</h1>
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <MuiTextField
              id="email"
              placeholder="Ingresa tu email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              variant="standard"
              margin="normal"
              fullWidth
              error={formik.touched.email && Boolean(formik.errors.email)}
              InputProps={{
                disableUnderline: true,
              }}
              sx={
                formik.touched.email && Boolean(formik.errors.email)
                  ? { border: "2px solid #E6643180" }
                  : null
              }
            />
            <HelperText>
              {formik.touched.email && formik.errors.email}
            </HelperText>
          </FormControl>
          <h1 className={globalStyles.subtitulo}>Contraseña</h1>
          <FormControl fullWidth>
            <MuiTextField
              id="password"
              placeholder="Ingresa tu contraseña"
              name="password"
              type={values.showPassword ? "text" : "password"}
              onChange={formik.handleChange}
              value={formik.values.password}
              variant="standard"
              margin="normal"
              fullWidth
              error={formik.touched.password && Boolean(formik.errors.password)}
              sx={
                formik.touched.password && Boolean(formik.errors.password)
                  ? { border: "2px solid #E6643180" }
                  : null
              }
              InputProps={{
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    ></IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <HelperText>
            {formik.touched.password && formik.errors.password}
          </HelperText>
        </Box>

        <Box display="flex" justifyContent="center">
          <MuiButton
            variant="contained"
            color="primary"
            type="submit"
            startIcon={<LoginIcon />}
          >
            Iniciar la plataforma
          </MuiButton>
        </Box>
      </Box>
    </form>
  );
};
