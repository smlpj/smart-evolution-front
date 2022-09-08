import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const smartField = styled(TextField)({
  backgroundColor: "white",
  border: "1px solid #ACCFCF",
  borderRadius: "5px",
  padding: "10px",

  "& .MuiInputBase-input": {
    padding: "2px",
    fontFamily: "Montserrat",

    "&::placeholder": {
      color: "#",
    },
  },
  "&:hover": {
    border: "1px solid #ACCFCF",
    backgroundColor: "#EBFAF6",
  },
});

export default smartField;
