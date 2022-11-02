import { Box, Typography } from "@mui/material";

import downloadFile from "@lib/downloadFile";
import fileToBase64 from "@lib/fileToBase64";

import DashboardButton from "@styles/buttons/button_3";

const FileField = (props) => {
  const {
    hideDownload,
    downloadFileURL,
    downloadFileFileName,
    downloadFileText = "Descargar archivo",
    uploadFileText = "Adjuntar archivo",
    multiple,
    onChange,
    error,
    helperText,
    ...rest
  } = props;

  const onFileUpload = async (evt) => {
    const files = evt.target.files;

    let b64Files = [];
    for (const file of files) {
      const b64File = await fileToBase64(file);
      b64Files.push(b64File);
    }

    onChange?.(evt, multiple ? b64Files : b64Files[0]);
  };

  return (
    <Box
      sx={{
        position: "relative",

        display: "flex",
        justifyContent: "space-between",

        width: "100%",
        pb: 0.5,

        ":after": {
          content: "''",
          width: "100%",
          position: "absolute",
          bottom: 0,
          left: 0,

          borderBottom: "1px solid #707070",
        },

        "&:hover::after": {
          borderBottom: "2px solid #333333",
        },
      }}
    >
      {!hideDownload && (
        <DashboardButton
          size="small"
          onClick={() => {
            downloadFile(downloadFileURL, downloadFileFileName);
          }}
          sx={{
            color: "#5EA3A3",
            borderColor: "#5EA3A3",
            textTransform: "none",
          }}
          endIcon={<i className="far fa-down" />}
        >
          {downloadFileText}
        </DashboardButton>
      )}

      <Box
        component="label"
        sx={{
          cursor: "pointer",
          border: "1px solid #5EA3A3",
          borderRadius: 1,
          backgroundColor: "#FAFAFA",

          color: "#5EA3A3",
          textTransform: "none",

          display: "flex",
          gap: 1,
          justifyContent: "space-around",
          alignItems: "center",

          padding: "2px 4px",

          ":hover": {
            backgroundColor: "#CDCDCD",
          },
        }}
      >
        <Typography sx={{ fontSize: "0.7rem", fontWeight: 700 }}>
          {uploadFileText}
        </Typography>
        <i className="far fa-upload" />

        <input type="file" hidden multiple={multiple} onChange={onFileUpload} />
      </Box>

      {error && (
        <Box sx={{ position: "absolute", bottom: -20, left: 0 }}>
          <Typography sx={{ color: "#d32f2f", fontSize: 12 }}>
            {helperText}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default FileField;
