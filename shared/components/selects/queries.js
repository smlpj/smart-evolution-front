import Axios from "axios";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY2NTA3NjcwLCJpYXQiOjE2NjM4Nzk2NzAsImp0aSI6ImExMjczZDI1ZDE0MjQyOThiNWMwMzA2NTlkYzE1ZDVhIiwidXNlcl9pZCI6ImIxNTU0ZDdhLThlMzAtNGQ5ZC1hMTEwLTk2YTZkMTc5Zjc2NiIsIm5hbWUiOiJhbmRlcnNvbiBzYW5jaGV6Iiwicm9sZXMiOlsic3VwZXJ1c2VyIl0sInBlcm1pc3Npb25zIjpbXSwiaXNfc3VwZXJ1c2VyIjp0cnVlfQ.Ghu9LjggbHBlFn4QdNOIkckxikaYwV8_U1q0oaOroQc";
export const Departments = async (data) => {
  const res = await Axios.get(
    "https://smart-evolution-api.herokuapp.com/api/department",
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
    `https://smart-evolution-api.herokuapp.com/api/city/${data.department}`,
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
    "https://smart-evolution-api.herokuapp.com/api/type_identity",
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
    "https://smart-evolution-api.herokuapp.com/api/broker",
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
    "https://smart-evolution-api.herokuapp.com/api/type_client",
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
    "https://smart-evolution-api.herokuapp.com/api/ciiu",
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
    "https://smart-evolution-api.herokuapp.com/api/country",
    {
      headers: {
        authorization: "Bearer " + token,
      },
    }
  );
  return res.data;
};
