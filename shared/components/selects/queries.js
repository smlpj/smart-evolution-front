import Axios from "axios";



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

export const AccountingAccounts = async (data) => {
  const res = await Axios.get(`${API_URL}/accounting_account/all`,
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    }
  );
  return res.data;
};

export const TypeOperation = async (data) => {
  const res = await Axios.get(`${API_URL}/type_operation`,
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    }
  );
  return res.data;
};

export const Bills = async (data) => {
    const res = await Axios.get(`${API_URL}/bill/${data}`,
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    }
  );
  return res.data;
}