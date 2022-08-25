import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      root: {
        borderRadius: "20px",
        marginBottom: "10px",
      },
    },
  },
});

export default theme;
