import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const smartField = styled(TextField)({
  width: "100%",
  marginBottom: "10px",
  backgroundColor: "white",
  border: "1px solid #ACCFCF",
  borderRadius: "10px",
  padding: "10px",
  "& .MuiInputBase-input": {
    padding: "10px",
  },
});

export default smartField;
