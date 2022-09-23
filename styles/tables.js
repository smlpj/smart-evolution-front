import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";

const CustomDataGrid = styled(DataGrid)({
  "& .MuiDataGrid-virtualScroller": {
    scrollBehavior: "smooth",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      position: "absolute",
      width: "9px",
      webkitAppearance: "none",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#CFDDDD",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#5EA3A3",
      backgroundClip: "content-box",
      borderColor: "transparent",
      borderStyle: "solid",
      borderWidth: "1px 2px",
      borderRadius: "10px",
    },
  },

  "& .MuiDataGrid-row": {
    backgroundColor: "transparent",
    color: "#000000",
    fontFamily: "Montserrat",
    fontSize: "0.8rem",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#F5F5F5",
    },
  },
  "& .MuiDataGrid-cell": {
    border: "0px",
  },
  "& .MuiDataGrid-columnsContainer": {
    backgroundColor: "#F5F5F5",
    color: "#000000",
    fontFamily: "Montserrat",
    fontSize: "0.8rem",
    fontWeight: "bold",
  },
  "& .MuiDataGrid-columnsContainerSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-columnHeader": {
    border: "0",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: "0.7rem",
    color: "#8C7E82",
    letterSpacing: "0px",
  },
  "& .MuiDataGrid-columnHeaderTitleContainer": {
    justifyContent: "left",
    hover: "none",
  },
  "& .MuiDataGrid-columnHeaderCheckbox": {
    justifyContent: "center",
  },
  "& .MuiDataGrid-columnHeaderSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-columnSeparator": {
    display: "none",
  },

  "& .MuiDataGrid-sortIcon": {
    color: "#8C7E82",
    display: "static",
  },

  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },

  "& .MuiDataGrid-menuIcon": {
    display: "none",
  },
});

export default CustomDataGrid;
