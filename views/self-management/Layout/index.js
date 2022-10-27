import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";

import Pagination from "../deleteThis";
import {
  footerGridSx,
  headerGridSx,
  leftContainerSx,
  mainSx,
  rightContainerSx,
} from "../styles";
import LayoutFooter from "./footer";
import LayoutHeader from "./header";

const FormLayout = (props) => {
  const { showHeaderTitle, sectionId, children, ...rest } = props;

  const theme = useTheme();

  const hideLeftContainer = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Box component="main" sx={mainSx}>
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={0} lg={5} sx={leftContainerSx}>
          {!hideLeftContainer && <Pagination />}
        </Grid>

        <Grid container direction="column" item xs sx={rightContainerSx}>
          <Grid item xs={2} sx={headerGridSx}>
            <LayoutHeader showTitle={showHeaderTitle} />
          </Grid>

          <Grid item xs>
            {children}
          </Grid>

          <Grid item xs={2} sx={footerGridSx}>
            <LayoutFooter sectionId={sectionId} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormLayout;
