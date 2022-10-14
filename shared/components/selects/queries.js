import Axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3Nzg4MDg5LCJpYXQiOjE2NjUxNjAwODksImp0aSI6IjE5N2E1MDVjYWU0MDQyNGNiOTlhY2YyYWFkOTliYWI4IiwidXNlcl9pZCI6IjFiNzZkNTEwLTBjODgtNDY4Yi05YzE1LWNiMTdhMjZlODM0MSIsIm5hbWUiOiJwcm9kdWN0aW9uIHVzZXIiLCJyb2xlcyI6WyJzdXBlcnVzZXIiXSwiaXNfc3VwZXJ1c2VyIjp0cnVlfQ.7e1R6qx1nRcVbrYgxPPnlTpYx35nvN-fP_5GOgu2DtU";

export const Departments = async (data) => {
  const res = await Axios.get(
    "https://smart-evolution-api2.herokuapp.com/api/department",
    {
      headers: {
        authorization: "Bearer " + token,
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
        authorization: "Bearer " + token,
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
        authorization: "Bearer " + token,
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
        authorization: "Bearer " + token,
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
        authorization: "Bearer " + token,
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
        authorization: "Bearer " + token,
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
        authorization: "Bearer " + token,
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
        authorization: "Bearer " + token,
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
        authorization: "Bearer " + token,
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
        authorization: "Bearer " + token,
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
        authorization: "Bearer " + token,
      },
    }
  );
  return res.data;
}
;

export const Egresses = async (data) => {
  const res = await Axios.get(
    "https://smart-evolution-api2.herokuapp.com/api/bank/",
    {
      headers: {
        authorization: "Bearer " + token,
      },
    }
  );
  return res.data;
};
