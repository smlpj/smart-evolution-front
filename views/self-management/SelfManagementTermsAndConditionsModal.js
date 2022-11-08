import { Box, Typography } from "@mui/material";

import Modal from "@components/modals/modal";

import scrollSx from "@styles/scroll";

import { footerTextSx, questionDescriptionSx } from "./styles";

const titleSx = { ...questionDescriptionSx, fontWeight: 700 };
const bodySx = {
  ...footerTextSx,
  fontSize: questionDescriptionSx.fontSize,
  color: "#333333",
  fontWeight: 500,
};

const SelfManagementTermsAndConditionsModal = (props) => {
  const { open, handleClose, ...rest } = props;

  const handleModalClose = () => {
    handleClose?.();
  };

  return (
    <Modal
      open={open}
      handleClose={handleModalClose}
      containerSx={{ width: "80vw", height: "80vh", ...scrollSx }}
    >
      <Box>
        <Typography sx={{ ...titleSx, my: 2 }}>
          Autorización de Visita, Verificación de Información, Consulta y
          Reporte
        </Typography>
        <Typography sx={bodySx}>
          Autorizo a SMART EVOLUTION S.A.S. o a la entidad que ella designe, a
          realizar la visita correspondiente, con el fin de verificar los datos
          que entrego en este documento y sus anexos, así mismo autorizo a
          verificar por cualquier medio la información que ha sido aportada.
          Para estos efectos, autorizo a SMART EVOLUTION S.A.S. a realizar
          consultas en las fuentes de información que estime necesarias. De
          igual forma, autorizo de manera irrevocable a SMART EVOLUTION S.A.S a
          realizar las consultas que estime conveniente para conocer los
          antecedentes disciplinarios, penales, contractuales, fiscales,
          comerciales, financieros y de cualquier otra naturaleza, incluida la
          consulta a las centrales de riesgo o a cualquier otra entidad pública
          o privada que maneje o administre bases de datos de cualquier índole o
          a las listas nacionales o internacionales que estime pertinente.
        </Typography>

        <Typography sx={{ ...titleSx, my: 2, mt: 3 }}>
          Obrando en nombre propio, declaro bajo la gravedad del juramento:
        </Typography>
        <Box component="ul">
          <Box component="li">
            <Typography sx={{ ...bodySx, mb: 1 }}>
              Que los recursos que serán comprometidos en la operación, no
              provendrán de ninguna actividad ilícita, ni los recursos que
              resulten de esta, serán destinados para actividades delictivas.
            </Typography>
          </Box>

          <Box component="li">
            <Typography sx={{ ...bodySx, mb: 1 }}>
              Que no me encuentro reportado en las listas internacionales
              vinculantes para Colombia, de conformidad con el derecho
              internacional (listas de las Naciones Unidas) o en las listas de
              la OFAC y otras listas de control, estando SMART EVOLUTION S.A.S.
              facultada para efectuar las verificaciones y consultas a las
              listas que considere pertinentes y para dar por terminada
              cualquier relación comercial o jurídica si verifica que figuro en
              dichas listas.
            </Typography>
          </Box>

          <Box component="li">
            <Typography sx={{ ...bodySx, mb: 1 }}>
              Que no existen contra mí, investigaciones o procesos penales por
              delitos dolosos, estando SMART EVOLUTION S.A.S. facultada para
              efectuar las verificaciones que considere pertinentes en bases de
              datos y centrales de riesgo informaciones públicas nacionales o
              internacionales y para dar por terminada cualquier relación
              comercial o jurídica, si verifica que existen investigaciones o
              procesos o existen informaciones en dichas bases de datos públicas
              que puedan colocar a SMART EVOLUTION S.A.S. frente a un riesgo
              legal o reputacional.
            </Typography>
          </Box>

          <Box component="li">
            <Typography sx={{ ...bodySx, mb: 1 }}>
              Que en el evento en que suceda alguna de las circunstancias
              descritas en los párrafos anteriores, me comprometo a comunicarlo
              de inmediato a la SMART EVOLUTION S.A.S
            </Typography>
          </Box>

          <Box component="li">
            <Typography sx={{ ...bodySx, mb: 1 }}>
              Que autorizo a SMART EVOLUTION S.A.S. a comunicar o reportar a las
              autoridades nacionales, cualquiera de las situaciones acá
              descritas, en caso de presentarse, así como a suministrar a dichas
              autoridades las informaciones que ellas requieran, exonerando a
              SMART EVOLUTION S.A.S. de toda responsabilidad por tal hecho.
            </Typography>
          </Box>

          <Box component="li">
            <Typography sx={{ ...bodySx, mb: 1 }}>
              Que ninguna otra persona natural o jurídica, tiene interés no
              legítimo en el contrato o relación jurídica de la entidad que
              represento con SMART EVOLUTION S.A.S.
            </Typography>
          </Box>

          <Box component="li">
            <Typography sx={{ ...bodySx, mb: 1 }}>
              Que conozco que SMART EVOLUTION S.A.S. está en la obligación legal
              de solicitar las aclaraciones que estime pertinentes, en el evento
              en que pueda tener dudas razonables sobre mis operaciones o sobre
              el origen de mis activos, evento en el cual me comprometo a
              suministrar las respectivas aclaraciones. Si estas no son
              satisfactorias, autorizo a SMART EVOLUTION S.A.S., o quien esta
              designe, para dar por terminada cualquier relación jurídica.
            </Typography>
          </Box>

          <Box component="li">
            <Typography sx={{ ...bodySx, mb: 1 }}>
              Que la información contenida en el presente documento, goza de
              plena validez a la luz del artículo 5 de la ley 527 de 1999, por
              medio del cual se reconoce jurídicamente los efectos de los
              mensajes de datos y autorizo a SMART EVOLUTION S.A.S haga uso de
              este mecanismo.
            </Typography>
          </Box>

          <Box component="li">
            <Typography sx={bodySx}>
              Que reconozco el uso de firmas electronicas como mecanismo técnico
              que permite verificar la identidad, y que verifican tanto
              autenticidad como integridad y, como titulares de datos sensibles,
              autorizo a SMART EVOLUTION S.A.S, a su tratamiento para
              finalidades de autenticacion y firma del presente documento
              electronico.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default SelfManagementTermsAndConditionsModal;
