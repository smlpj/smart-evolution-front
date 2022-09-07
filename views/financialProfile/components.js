import { Box } from "@mui/system";
import { Typography } from "@mui/material";

export default function FinancialProfile() {
  return (
    <>
      <Box
        height="73vh"
        display="flex"
        flexDirection="column"
        sx={{
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            position: "absolute",
            width: "9px",
            webkitAppearance: "none",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#CFDDDD",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#5EA3A3",
            backgroundClip: "content-box",
            borderColor: "transparent",
            borderStyle: "solid",
            borderWidth: "1px 2px",
            borderRadius: "10px",
          },
        }}
      >
        <Box>
          <Typography
            letterSpacing={0}
            fontSize="12rem"
            fontFamily="Montserrat"
            marginBottom="0.7rem"
          >
            {" "}
            Atrás{" "}
          </Typography>
          <Typography
            letterSpacing={0}
            fontSize="12rem"
            fontFamily="Montserrat"
            marginBottom="0.7rem"
          >
            {" "}
            Atrás{" "}
          </Typography>
          <Typography
            letterSpacing={0}
            fontSize="12rem"
            fontFamily="Montserrat"
            marginBottom="0.7rem"
          >
            {" "}
            Atrás{" "}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
