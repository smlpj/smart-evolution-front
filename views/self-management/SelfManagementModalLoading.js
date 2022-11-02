import { useRouter } from "next/router";

import { Box, Typography } from "@mui/material";

import Modal from "@components/modals/modal";

import responsiveFontSize from "@lib/responsiveFontSize";

import GreenButtonModal from "@styles/buttons/yesButtonModal";

import { footerTextSx, questionDescriptionSx } from "./styles";

const SelfManagementModalLoading = (props) => {
  const { loading, error, open, handleClose, ...rest } = props;

  const router = useRouter();

  const handleClick = () => {
    if (!loading && !error) router.replace("/auth/login");
    handleClose?.();
  };

  return (
    <Modal open={open} handleClose={handleClose}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
        width="100%"
      >
        {loading && (
          <>
            <Box sx={{ color: "#333333", fontSize: 64 }}>
              <i className="far fa-loader" />
            </Box>
            <Typography sx={{ ...questionDescriptionSx, my: 2 }}>
              Tus datos se están registrando en nuestra plataforma
            </Typography>
          </>
        )}

        {error && !loading && (
          <>
            <Box sx={{ color: "#b67b7b", fontSize: 64 }}>
              <i className="far fa-xmark" />
            </Box>
            <Typography sx={{ ...questionDescriptionSx, my: 2 }}>
              Hubo un error, inténtalo nuevamente.
            </Typography>
          </>
        )}

        {!loading && !error && (
          <>
            <Box sx={{ color: "#4cc1ae", fontSize: 64 }}>
              <i className="far fa-badge-check" />
            </Box>
            <Typography sx={{ ...questionDescriptionSx, my: 2 }}>
              Tus datos se registraron exitosamente
            </Typography>
          </>
        )}

        <GreenButtonModal
          onClick={handleClick}
          sx={{ fontSize: footerTextSx.fontSize }}
        >
          Aceptar
        </GreenButtonModal>
      </Box>
    </Modal>
  );
};

export default SelfManagementModalLoading;
