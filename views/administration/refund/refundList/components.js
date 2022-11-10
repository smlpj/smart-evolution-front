export const RefundListC = ({ data }) => {
  const columns = [
    { field: "client", headerName: "Cliente", width: 90 },
    { field: "account", headerName: "Cuenta", width: 90 },
    { field: "date", headerName: "Fecha", width: 90 },
    { field: "applyGM", headerName: "Aplica GM", width: 90 },
    { field: "amount", headerName: "Monto", width: 90 },
    { field: "gmAmount", headerName: "Monto GM", width: 90 },
    { field: "beneficiary", headerName: "Beneficiario", width: 90 },
    { field: "bank", headerName: "Banco", width: 90 },
    { field: "accountType", headerName: "Tipo de Cuenta", width: 90 },
    { field: "accountNumber", headerName: "Cuenta Bancaria", width: 90 },
    { field: "observations", headerName: "Observaciones", width: 90 },
  ];

  return (
    <>
    <h1>Refund List</h1>
    {console.log(data)}
    </>
  )
};
