import { useContext } from "react";

import { Box, Button, Typography } from "@mui/material";

import { FormContext } from "../Context";
import { titleStartSx } from "../styles";

const EmailStep = () => {
  const { pagination } = useContext(FormContext);

  return (
    <Box>
      <Typography>
        Buen día, esperamos se encuentre estupendo. ¿Quiere empezar a
        diligenciar el formulario en este momento?
      </Typography>
      <Typography>Current: {pagination.step}</Typography>
      <Button variant="outlined" onClick={pagination.nextStep}>
        Increase
      </Button>
      <Button variant="outlined" onClick={pagination.prevStep}>
        Decrease
      </Button>
    </Box>
  );
};

export default EmailStep;
