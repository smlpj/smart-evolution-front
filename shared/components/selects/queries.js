import Axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3Nzg4MDg5LCJpYXQiOjE2NjUxNjAwODksImp0aSI6IjE5N2E1MDVjYWU0MDQyNGNiOTlhY2YyYWFkOTliYWI4IiwidXNlcl9pZCI6IjFiNzZkNTEwLTBjODgtNDY4Yi05YzE1LWNiMTdhMjZlODM0MSIsIm5hbWUiOiJwcm9kdWN0aW9uIHVzZXIiLCJyb2xlcyI6WyJzdXBlcnVzZXIiXSwiaXNfc3VwZXJ1c2VyIjp0cnVlfQ.7e1R6qx1nRcVbrYgxPPnlTpYx35nvN-fP_5GOgu2DtU";

const readToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxOTgyOTM5Mzg0LCJpYXQiOjE2Njc1NzkzODQsImp0aSI6ImU0MGM1ZjZiNDdiMzRmODk4NGE4MjExMDc2MWMxZjZkIiwidXNlcl9pZCI6IjdmMzU3ZGNkLWQ2Y2UtNDkzNS1iZmFiLWVlZTZkNzdmOWMzZCIsIm5hbWUiOiJyZWFkIG9ubHkiLCJyb2xlcyI6WyJjbGllbnQiXSwiaXNfc3VwZXJ1c2VyIjpmYWxzZX0.fgtLoeOeoa53hqRbH3I9ZHALqmb3mbbuDRQCcG1w0IM";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const Departments = async (data) => {
  const res = await Axios.get(`${API_URL}/department`, {
    headers: {
      authorization: `Bearer ${readToken}`,
    },
  });
  return res.data;
};

export const Cities = async (data) => {
  const res = await Axios.get(`${API_URL}/city/${data.department}`, {
    headers: {
      authorization: `Bearer ${readToken}`,
    },
  });
  return res.data;
};

export const IdentityType = async (data) => {
  const res = await Axios.get(`${API_URL}/type_identity/`, {
    headers: {
      authorization: `Bearer ${readToken}`,
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
      authorization: `Bearer ${readToken}`,
    },
  });
  return res.data;
};
export const CIIU = async (data) => {
  const res = await Axios.get(`${API_URL}/ciiu/`, {
    headers: {
      authorization: `Bearer ${readToken}`,
    },
  });
  return res.data;
};

export const Citizenship = async (data) => {
  const res = await Axios.get(`${API_URL}/country/`, {
    headers: {
      authorization: `Bearer ${readToken}`,
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
      authorization: `Bearer ${readToken}`,
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
