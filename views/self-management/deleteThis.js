import { useContext } from "react";

import { Box, Button, Typography } from "@mui/material";

import { FormContext } from "./Context";

const Pagination = () => {
  const { pagination } = useContext(FormContext);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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

export default Pagination;
