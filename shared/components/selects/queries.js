import Axios from "axios";



export const Departments = async (data) => {
  const res = await Axios.get(
    "https://smart-evolution-api2.herokuapp.com/api/department",
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    }
  );
  return res.data;
};

export const Cities = async (data) => {
  const res = await Axios.get(
    `https://smart-evolution-api2.herokuapp.com/api/city/${data.department}`,
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    }
  );
  return res.data;
};

export const IdentityType = async (data) => {
  const res = await Axios.get(
    "https://smart-evolution-api2.herokuapp.com/api/type_identity/",
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    }
  );
  return res.data;
};

export const Broker = async (data) => {
  const res = await Axios.get(
    "https://smart-evolution-api2.herokuapp.com/api/broker/",
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    }
  );
  return res.data;
};

export const ClientType = async (data) => {
  const res = await Axios.get(
    "https://smart-evolution-api2.herokuapp.com/api/type_client/",
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    }
  );
  return res.data;
};
export const CIIU = async (data) => {
  const res = await Axios.get(
    "https://smart-evolution-api2.herokuapp.com/api/ciiu/",
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    }
  );
  return res.data;
};

export const Citizenship = async (data) => {
  const res = await Axios.get(
    "https://smart-evolution-api2.herokuapp.com/api/country/",
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    }
  );
  return res.data;
};

export const Clients = async (data) => {
  const res = await Axios.get(
    "https://smart-evolution-api2.herokuapp.com/api/client/all",
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    }
  );
  return res.data;
};

export const AccountsFromClient = async (data) => {
  const res = await Axios.get(
    "https://smart-evolution-api2.herokuapp.com/api/account/client/" +
      data.client,
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    }
  );
  return res.data;
};
export const AccountTypes = async (data) => {
  const res = await Axios.get(
    "https://smart-evolution-api2.herokuapp.com/api/account_type/",
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    }
  );
  return res.data;
};

export const Banks = async (data) => {
  const res = await Axios.get(
    "https://smart-evolution-api2.herokuapp.com/api/bank/",
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    }
  );
  return res.data;
};

export const Egresses = async (data) => {
  const res = await Axios.get(
    "https://smart-evolution-api2.herokuapp.com/api/type_expenditure/",
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    }
  );
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