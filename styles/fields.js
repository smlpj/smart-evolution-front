import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const error = "1px solid #E6643180";
const success = "1px solid #ACCFCF";

const smartField = styled(TextField)({
  width: "370px",
  height: "50px",
  marginBottom: "10px",
  backgroundColor: "white",
  border: success,
  borderRadius: "5px",
  padding: "10px",
  "& .MuiInputBase-input": {
    padding: "2px",
    fontFamily: "Montserrat",
  },
  "& .Mui-error": {
    border: error,
    
  },
});

export default smartField;
