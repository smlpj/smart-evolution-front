import { Box, CircularProgress, Grid, Typography } from "@mui/material";

import InputTitles from "styles/inputTitles";
import DashboardButton from "styles/button_3";
import scrollSx from "styles/scroll";

import ValueFormat from "@formats/ValueFormat";

import responsiveFontSize from "@lib/responsiveFontSize";

const half = {
  boxSizing: "border-box",
  width: "50%",
  py: 4,
  px: 5,
};

const leftHalf = {
  /* backgroundColor: "red", */
  display: "flex",
  flexDirection: "column",
};

const rightHalf = {
  backgroundColor: "#488B8F",
  pr: 8,
};

const quarter = {
  height: "50%",
  position: "relative",
  ...scrollSx,
};

const separator = {
  width: "100%",

  position: "absolute",
  bottom: 20,
  left: 0,

  borderBottom: "1px solid #57575780",
};

const upperQuarter = {
  /* backgroundColor: "teal", */
  boxSizing: "border-box",
  pb: 2.5,
};

const upperQuarterWrapper = {
  height: "calc(100% - 2.5px)",
  overflowY: "auto",
  ...scrollSx,
};

const upperLeftQuarterGrid = {
  mt: 1.75,
};

const lowerQuarter = {
  /*   backgroundColor: "pink", */
};

const lowerLeftQuarterGrid = {
  mt: 5,
};

const lowerRightQuarterGrid = {};

const circularProgressWrapper = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const distributionLegend = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const conventionWrapper = {
  my: "auto",

  position: "relative",
  top: -24,

  display: "flex",
  alignItems: "center",
  gap: 1,

  fontWeight: 500,
};

const conventionDot = {
  display: "inline-block",
  aspectRatio: "1",
  width: 16,
  backgroundColor: "#488b8f",
  borderRadius: "50%",
};

const title = {
  color: "#488B8F",
  fontFamily: "Montserrat",
  fontSize: responsiveFontSize(31.25, 2, 4),
};

const subtitle = {
  color: "#333333",
  fontFamily: "Montserrat",
  fontSize: responsiveFontSize(25, 1.2, 5),
  fontWeight: 500,
};

const valueStatBold = {
  fontSize: responsiveFontSize(25, 1.5, 4.5),
  fontWeight: 600,
  lineHeight: "1em",
};

const rightAlignedLabel = {
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
};

const totalDisplay = {
  mt: 1,
  position: "relative",
};

const display = {
  border: "1px solid #C7C7C780",
  borderRadius: 1,

  backgroundColor: "#FFFFFF1A",

  width: "calc(100% - 44px)",
  height: 35,

  position: "absolute",
  top: 25,
  left: 36,
};

const DetailEntry = (props) => {
  const { title, value, wrapperSx, titleSx, valueSx, ...rest } = props;

  return (
    <Box sx={{ m: 0, p: 0, ...wrapperSx }}>
      <InputTitles sx={{ mb: 1.25, ...titleSx }}>{title}</InputTitles>
      <Typography
        sx={{
          color: "#333333",
          fontFamily: "Montserrat",
          fontSize: responsiveFontSize(16, 0.9, 5),
          fontWeight: 500,
          ...valueSx,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

const LabelStats = (props) => {
  const { children, wrapperSx, valueSx, ...rest } = props;

  return (
    <Box sx={{ ...wrapperSx }}>
      <Typography
        sx={{
          color: "#EBEBEB",
          fontSize: responsiveFontSize(16, 0.9, 5),
          fontWeight: 400,
          fontFamily: "Montserrat",
          ...valueSx,
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

const ValueStats = (props) => {
  const { children, wrapperSx, valueSx, ...rest } = props;

  return (
    <Box sx={{ ...wrapperSx }}>
      <Typography
        sx={{
          color: "#EBEBEB",
          fontSize: responsiveFontSize(31.25, 1.4, 10),
          fontFamily: "Montserrat",
          ...valueSx,
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

const OperationDetail = () => {
  const emitterName = "Benfor S.A.S";
  const emitterNit = "123.456.789-2";
  const legalRepresentativeName = "Juan Pablo Hernandez";
  const emitterEmail = "gerencia@benfor.com.co";

  const availablePlusFutureTitles = 247848979;
  const futureTitles = 231744164;
  const investmentRate = 0.144;

  const initialAvailable = 1719844;
  const titleCollection = 89384532;
  const titleBuy = 14700757;
  const orders = 0;
  const refunds = 60000000;

  const available = 16104816;

  return (
    <Box sx={{ display: "flex", height: "76vh" }}>
      <Box sx={{ ...half, ...leftHalf }}>
        <Box sx={{ ...quarter, ...upperQuarter }}>
          <Box sx={{ ...upperQuarterWrapper }}>
            <Typography sx={{ ...title }}>Detalle de Operación</Typography>
            <Grid container spacing={3} sx={{ ...upperLeftQuarterGrid }}>
              <Grid item md={12}>
                <DetailEntry title="Emisor" value={emitterName} />
              </Grid>
              <Grid item md={12} lg={6}>
                <DetailEntry title="NIT DEL EMISOR" value={emitterNit} />
              </Grid>
              <Grid item md={12} lg={6}>
                <DetailEntry
                  title="REPRESENTANTE LEGAL"
                  value={legalRepresentativeName}
                />
              </Grid>
              <Grid item md={12}>
                <DetailEntry title="CORREO ELECTRÓNICO" value={emitterEmail} />
              </Grid>
            </Grid>
          </Box>
          <Box component="span" sx={{ ...separator }} />
        </Box>

        <Box sx={{ ...quarter, ...lowerQuarter }}>
          <Typography sx={{ ...subtitle, mt: 2.5 }}>
            Distribución de Cartera por Pagador
          </Typography>
          <Grid container sx={{ ...lowerLeftQuarterGrid }}>
            <Grid item xs={6}>
              <Box sx={{ ...circularProgressWrapper }}>
                <CircularProgress
                  variant="determinate"
                  value={82}
                  size="20vh"
                  style={{
                    backgroundColor: "white",
                    color: "#488B8F",
                    borderRadius: "50%",
                    maxWidth: "210px",
                  }}
                  thickness={4.5}
                />
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ ...distributionLegend }}>
              <DashboardButton
                endIcon={<Typography fontFamily="icomoon"></Typography>}
              >
                Ver detalle de distribución
              </DashboardButton>

              <Box component={Typography} sx={{ ...conventionWrapper }}>
                <Box component="span" sx={{ ...conventionDot }} /> Nombre
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box sx={{ ...half, ...rightHalf }}>
        <Box sx={{ ...quarter, ...upperQuarter }}>
          <Box sx={{ ...upperQuarterWrapper }}>
            <Grid container>
              <Grid item sm={6}>
                <Typography sx={{ ...subtitle, color: "white" }}>
                  Resumen general
                </Typography>
              </Grid>
              <Grid
                item
                sm={6}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <DashboardButton
                  startIcon={<i className="fa-brands fa-whatsapp" />}
                  sx={{ color: "white", borderColor: "white" }}
                >
                  Enviar a whatsapp
                </DashboardButton>
              </Grid>
            </Grid>

            <Grid container spacing={2.75} sx={{ ...upperLeftQuarterGrid }}>
              <Grid
                item
                md={12}
                lg={6}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <LabelStats>
                  Disponible + Valor futuro de <br />
                  Títulos por cobrar
                </LabelStats>
              </Grid>
              <Grid item md={12} lg={6}>
                <ValueStats valueSx={{ textAlign: "right" }}>
                  <ValueFormat prefix="$ " value={availablePlusFutureTitles} />
                </ValueStats>
              </Grid>

              <Grid
                item
                md={12}
                lg={6}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <LabelStats>
                  Valor futuro de <br />
                  Títulos por cobrar
                </LabelStats>
              </Grid>
              <Grid item md={12} lg={6}>
                <ValueStats valueSx={{ textAlign: "right" }}>
                  <ValueFormat prefix="$ " value={futureTitles} />
                </ValueStats>
              </Grid>

              <Grid
                item
                md={12}
                lg={6}
                mt={2}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <LabelStats>Tasa promedio de Inversión</LabelStats>
              </Grid>
              <Grid item md={12} lg={6} mt={2}>
                <ValueStats valueSx={{ textAlign: "right", fontWeight: 700 }}>
                  <ValueFormat suffix="%" value={investmentRate * 100} />
                </ValueStats>
              </Grid>
            </Grid>
          </Box>
          <Box component="span" sx={{ ...separator, borderColor: "white" }} />
        </Box>

        <Box sx={{ ...quarter, ...lowerQuarter }}>
          <Box sx={{ ...upperQuarterWrapper }}>
            <Grid container spacing={2} sx={{ ...lowerRightQuarterGrid }}>
              <Grid item md={12} lg={6} sx={rightAlignedLabel}>
                <LabelStats>Disponible inicial</LabelStats>
              </Grid>
              <Grid item md={12} lg={6}>
                <ValueStats valueSx={valueStatBold}>
                  <ValueFormat prefix="$ " value={initialAvailable} />
                </ValueStats>
              </Grid>

              <Grid item md={12} lg={6} sx={rightAlignedLabel}>
                <LabelStats>Recaudo de Títulos</LabelStats>
              </Grid>
              <Grid item md={12} lg={6}>
                <ValueStats valueSx={valueStatBold}>
                  <ValueFormat prefix="$ " value={titleCollection} />
                </ValueStats>
              </Grid>

              <Grid item md={12} lg={6} sx={rightAlignedLabel}>
                <LabelStats>Compra de Títulos</LabelStats>
              </Grid>
              <Grid item md={12} lg={6}>
                <ValueStats valueSx={valueStatBold}>
                  <ValueFormat prefix="$ " value={titleBuy} />
                </ValueStats>
              </Grid>

              <Grid item md={12} lg={6} sx={rightAlignedLabel}>
                <LabelStats>Giros</LabelStats>
              </Grid>
              <Grid item md={12} lg={6}>
                <ValueStats valueSx={valueStatBold}>
                  <ValueFormat prefix="$ " value={orders} />
                </ValueStats>
              </Grid>

              <Grid item md={12} lg={6} sx={rightAlignedLabel}>
                <LabelStats>Reintegros</LabelStats>
              </Grid>
              <Grid item md={12} lg={6}>
                <ValueStats valueSx={valueStatBold}>
                  <ValueFormat prefix="- $ " value={refunds} />
                </ValueStats>
              </Grid>

              <Grid container item spacing={2} sx={{ ...totalDisplay }}>
                <Box sx={{ ...display }} />
                <Grid item md={12} lg={6} sx={{ ...rightAlignedLabel }}>
                  <LabelStats valueSx={{ fontWeight: 600 }}>
                    Disponible a la Fecha
                  </LabelStats>
                </Grid>
                <Grid item md={12} lg={6}>
                  <ValueStats valueSx={valueStatBold}>
                    <ValueFormat prefix="$ " value={available} />
                  </ValueStats>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OperationDetail;
