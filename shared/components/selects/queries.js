import Axios from "axios";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY1OTg3ODA4LCJpYXQiOjE2NjMzNTk4MDgsImp0aSI6IjEyZmNkMmI5M2VjZjQwYWY5YmNkMzU1NjJmMzZhZjJlIiwidXNlcl9pZCI6ImYyYzcxMWQ5LTA3MmMtNDE1Mi05MGFlLTUwZmU2OWYxMTA1MSIsIm5hbWUiOiJzdXBlciB1c2VyIiwicm9sZXMiOlsic3VwZXJ1c2VyIl0sInBlcm1pc3Npb25zIjpbXSwiaXNfc3VwZXJ1c2VyIjp0cnVlfQ.9i_yR0-1e57yIdEmuA0yz6HieDFSs2cXzGbBYiCNi_A";
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
    "https://smart-evolution-api.herokuapp.com/api/citizenship",
    {
      headers: {
        authorization: "Bearer " + token,
      },
    }
  );
  return res.data;
};
