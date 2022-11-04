import MUIRadio from "@mui/material/Radio";
import { styled } from "@mui/material/styles";

const StandardRadio = (props) => {
  return <MUIRadio size="small" {...props} />;
};

const Radio = styled(StandardRadio)(({ theme }) => ({
  color: "#5EA3A3",

  "&.Mui-checked": {
    color: "#5EA3A3",
  },
}));

export default Radio;
