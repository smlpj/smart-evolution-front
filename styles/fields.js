import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";



const smartField = styled(TextField)({
  width: "100%",
  height: "100%",
  marginBottom: "10px",
  backgroundColor: "white",
  border: "1px solid #ACCFCF",
  borderRadius: "5px",
  padding: "10px",
  "& .MuiInputBase-input": {
    padding: "2px",
    fontFamily: "Montserrat",
  },

});

export default smartField;
