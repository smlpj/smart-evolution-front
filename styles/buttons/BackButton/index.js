import React from "react";

import Link from "next/link";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button } from "@mui/material";

const BackButton = (props) => {
  const { path, text = "Atrás", wrapperSx, buttonSx, ...rest } = props;

  return (
    <Box component={Link} href={path} sx={{ ...wrapperSx }}>
      <Button
        variant="standard"
        justifyContent="flex-start"
        alignItems="center"
        startIcon={<ArrowBackIcon sx={{ color: "#5EA3A3" }} />}
        sx={{
          width: "min-content",
          py: "4px",
          borderRadius: "4px",
          color: "#5EA3A3",
          fontSize: "70%",
          fontWeight: "bold",
          letterSpacing: "0",
          textTransform: "uppercase",
          ...buttonSx,
        }}
      >
        {text}
      </Button>
    </Box>
  );
};

export default BackButton;
