import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const smartField = styled(TextField)({
  backgroundColor: "white",
  border: "1px solid #ACCFCF",
  borderRadius: "5px",
  padding: "10px",
  height: "1.5rem",
  "& .MuiInputBase-input": {
    padding: "2px",
    fontFamily: "Montserrat",

    "&::placeholder": {
      color: "#57575780",
      fontSize: "0.9rem",
    },
  },
  "&:hover": {
    border: "1px solid #ACCFCF",
    backgroundColor: "#EBFAF6",
  },
});

export default smartField;
