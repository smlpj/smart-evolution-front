import { Divider, Typography } from "@mui/material";

export default function Footer() {
  return (
    <>
      <Divider sx={{ borderBottomWidth: 4 }} />
      <Typography fontFamily="Montserrat" fontSize="0.8rem" align="left">
        Copyright © 2022 Infinity. Desarrollado por Infinity Todos los Derechos
        Reservados
      </Typography>
    </>
  );
}
