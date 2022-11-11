import { useContext, useMemo } from "react";

import { Box, Typography } from "@mui/material";

import { FormContext } from "../Context";
import sections from "../sections";
import { footerTextSx } from "../styles";

const Dot = (props) => {
  const { active, ...rest } = props;

  return (
    <Box
      sx={{
        aspectRatio: 1,
        width: footerTextSx.fontSize,
        height: footerTextSx.fontSize,

        borderRadius: "50%",
        backgroundColor: active ? "#63595C" : "#C7C7C7",
      }}
    />
  );
};

const SectionProgress = (props) => {
  const { sectionId, sectionsCount, ...rest } = props;

  const dotsArray = useMemo(() => [...Array(sectionsCount)], [sectionsCount]);

  return (
    <Box sx={{ display: "flex", gap: 1.3 }}>
      {dotsArray.map((_, i) => (
        <Dot key={`dot-${i}`} active={sectionId - 1 >= i} />
      ))}
    </Box>
  );
};

const LayoutFooter = (props) => {
  const { sectionId, ...rest } = props;

  const { pagination } = useContext(FormContext);

  const sectionsCount = useMemo(
    () => Object.entries(sections).length,
    [sections]
  );

  const currentStepSection = `PASO ${sectionId} - ${sections[sectionId]}`;

  return (
    <Box sx={{ display: pagination.step === 0 && "none" }}>
      <Typography sx={{ ...footerTextSx, mb: 1 }}>
        {currentStepSection}
      </Typography>
      <SectionProgress sectionId={sectionId} sectionsCount={sectionsCount} />
    </Box>
  );
};

export default LayoutFooter;
