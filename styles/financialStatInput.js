export const FinancialStatInput = {
  backgroundColor: "white",
  border: "1.4px solid #5EA3A380",
  borderRadius: "4px",
  padding: "10px",
  textAlign: "right",
  alignContent: "center",

  "input::-webkit-outer-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
  "input::-webkit-inner-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
  "& .MuiInputBase-input": {
    padding: "2px",
    color: "#4A4546",
    fontSize: "0.9vw",
    fontWeight: "500",
    textAlign: "left",

    "&::placeholder": {
      color: "#57575780",
      fontSize: "0.9vw",
      fontWeight: "500",
      textAlign: "left",
      opacity: 1,
    },
  },
};
