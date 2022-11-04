import { NumericFormat, PatternFormat } from "react-number-format";

import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

import responsiveFontSize from "@lib/responsiveFontSize";

const DefaultTextField = (props) => <TextField variant="standard" {...props} />;

const StandardTextField = (props) => {
  const { isMasked, isPatterned, onChangeMasked, ...rest } = props;

  if (isPatterned)
    return (
      <PatternFormat
        {...rest}
        customInput={DefaultTextField}
        onValueChange={(values) => {
          onChangeMasked(values);
        }}
      />
    );

  if (isMasked)
    return (
      <NumericFormat
        {...rest}
        customInput={DefaultTextField}
        onValueChange={(values) => {
          onChangeMasked(values);
        }}
      />
    );

  return <DefaultTextField {...props} />;
};

const BaseField = styled(StandardTextField)(({ theme }) => ({
  "& .MuiInput-root:hover::before": {
    borderBottom: "1px solid #707070",
  },
  "& .MuiInput-root::before": {
    borderBottom: "1px solid #707070",
  },
  "& .MuiInput-root::after": {
    border: "1px solid #333333",
  },
  "& .MuiInput-input": {
    fontWeight: 500,
    fontSize: responsiveFontSize(16, 0.8205, 2),
  },
}));

export default BaseField;
