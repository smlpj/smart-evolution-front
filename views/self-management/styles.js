import responsiveFontSize from "@lib/responsiveFontSize";

/* General styles */
export const mainSx = {
  height: "100vh",
};

export const leftContainerSx = {
  backgroundColor: "#76B4A3",
};

export const rightContainerSx = {
  px: 10,

  ["@media (max-width: 900px)"]: {
    px: 5,
  },
};

export const headerGridSx = {};

export const headerContainerSx = {
  height: "100%",

  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
};

export const imageHeaderContainer = {};

export const footFerGridSx = {
  backgroundColor: "blue",
};

export const defaultStepContainerSx = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

/* Text styles */
export const headerTitleSx = {
  color: "#488B8F",
  fontSize: responsiveFontSize(20, 1.1, 4),
  fontWeight: 600,
};

export const titleStartSx = {
  color: "#488B8F",
  fontSize: responsiveFontSize(39, 2, 13),
  fontWeight: 500,
};

export const questionParagraphSx = {
  color: "#333333",
  fontSize: responsiveFontSize(25, 1.28, 8),
  fontWeight: 500,
};

export const questionDescriptionSx = {
  color: "#333333",
  fontSize: responsiveFontSize(16, 0.9, 3),
  fontWeight: 500,
};

export const footerTextSx = {
  color: "#63595C",
  fontSize: responsiveFontSize(14, 0.79, 3),
  fontWeight: 700,
};

export const titleSx = {};
