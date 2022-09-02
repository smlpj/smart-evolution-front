import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const NavbarButton = styled(Button)({
  borderRadius: "4px",
  border: "0.5px solid #488B8F",
  backgroundColor: "#EBEBEB",
  color: "#488B8F",
  fontSize: "0.75rem",

  "&:hover": {
    backgroundColor: "#5EA3A333",
  },

  "&:disabled": {
    color: "#AAC5C6",
    borderColor: "#AAC5C6",
  },

  fontFamily: "Montserrat",
  fontWeight: "bold",
});

export default NavbarButton;
