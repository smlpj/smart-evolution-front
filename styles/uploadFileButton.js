import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const FileUploadButton = styled(Button)({
  backgroundColor: "white",
  border: "1px solid #ACCFCF",
  borderRadius: "5px",
  padding: "10px",
  height: "2.5rem",
  "&.MuiButton-root": {
    padding: "2px",
    fontFamily: "Montserrat",
    color: "#57575780",
  },
  "&:hover": {
    border: "1px solid #ACCFCF",
    backgroundColor: "#EBFAF6",
  },
});

export default FileUploadButton;
