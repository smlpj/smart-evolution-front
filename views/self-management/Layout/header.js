import Image from "next/image";

import { Box, Typography } from "@mui/material";

import smartLogo from "../../../public/assets/Logo Smart - Lite.svg";
import {
  headerContainerSx,
  headerTitleSx,
  imageHeaderContainer,
} from "../styles";

const LayoutHeader = (props) => {
  const { showTitle, ...rest } = props;

  return (
    <Box sx={headerContainerSx}>
      <Box>
        {showTitle && (
          <Typography sx={headerTitleSx}>
            Formato de vinculación online
            <br />
            para nuevos clientes
          </Typography>
        )}
      </Box>

      <Box sx={imageHeaderContainer}>
        <Image src={smartLogo} width={200} height={58.78} alt="" />
      </Box>
    </Box>
  );
};

export default LayoutHeader;
