import Axios from "axios";



const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const Departments = async (data) => {
  const res = await Axios.get(`${API_URL}/department`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("access-token"),
    },
  });
  return res.data;
};

export const Cities = async (data) => {
  const res = await Axios.get(`${API_URL}/city/${data.department}`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("access-token"),
    },
  });
  return res.data;
};

export const IdentityType = async (data) => {
  const res = await Axios.get(`${API_URL}/type_identity/`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("access-token"),
    },
  });
  return res.data;
};

export const Broker = async (data) => {
  const res = await Axios.get(`${API_URL}/broker/`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("access-token"),
    },
  });
  return res.data;
};

export const ClientType = async (data) => {
  const res = await Axios.get(`${API_URL}/type_client/`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("access-token"),
    },
  });
  return res.data;
};
export const CIIU = async (data) => {
  const res = await Axios.get(`${API_URL}/ciiu/`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("access-token"),
    },
  });
  return res.data;
};

export const Citizenship = async (data) => {
  const res = await Axios.get(`${API_URL}/country/`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("access-token"),
    },
  });
  return res.data;
};

export const Clients = async (data) => {
  const res = await Axios.get(`${API_URL}/client/all`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("access-token"),
    },
  });
  return res.data;
};

export const AccountsFromClient = async (data) => {
  const res = await Axios.get(`${API_URL}/account/client/${data.client}`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("access-token"),
    },
  });
  return res.data;
};
export const AccountTypes = async (data) => {
  const res = await Axios.get(`${API_URL}/account_type/`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("access-token"),
    },
  });
  return res.data;
};

export const Banks = async (data) => {
  const res = await Axios.get(`${API_URL}/bank/`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("access-token"),
    },
  });
  return res.data;
};

export const Egresses = async (data) => {
  const res = await Axios.get(`${API_URL}/type_expenditure/`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("access-token"),
    },
  });
  return res.data;
};

export const AccountingAccounts = async (data) => {
  const res = await Axios.get(
    "https://smart-evolution-api2.herokuapp.com/api/accounting_account/all",
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    }
  );
  return res.data;
};