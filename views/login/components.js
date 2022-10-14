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
import { Typography } from "@mui/material";

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
              InputProps={{
                disableUnderline: true,
                sx: {
                  marginTop: "-5px",
                },
              }}
              error={formik.touched.email && Boolean(formik.errors.email)}
              sx={
                formik.touched.email && Boolean(formik.errors.email)
                  ? { border: "1.4px solid #E6643180" }
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
                  ? { border: "1.4px solid #E6643180" }
                  : null
              }
              InputProps={{
                disableUnderline: true,
                sx: {
                  marginTop: "-5px",
                },
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
            variant="standard"
            color="primary"
            type="submit"
            startIcon={<LoginIcon />}
          >
            <Typography
              sx={{
                fontFamily: "Montserrat",
                fontStyle: "normal",
                fontWeight: "bold",
                fontSize: "0.8rem",
              }}
            >
              Iniciar la plataforma
            </Typography>
          </MuiButton>
        </Box>
      </Box>
    </form>
  );
};
