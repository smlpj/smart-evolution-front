import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const NavbarButton = styled(Button)({
    borderRadius: "4px",
    border: "0.5px solid #488B8F",
    backgroundColor: "#EBEBEB",
    color: "#488B8F",
    padding: "1.5vh 2vh 1.5vh 2vh",
    fontSize: "14px",

    "&:hover": {
        backgroundColor: "#5EA3A333",
    },
    fontFamily: "Montserrat",
    fontWeight: "bold",
});

export default NavbarButton;