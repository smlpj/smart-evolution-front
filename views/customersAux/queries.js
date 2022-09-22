import Axios from "axios";
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY2NTA3NjcwLCJpYXQiOjE2NjM4Nzk2NzAsImp0aSI6ImExMjczZDI1ZDE0MjQyOThiNWMwMzA2NTlkYzE1ZDVhIiwidXNlcl9pZCI6ImIxNTU0ZDdhLThlMzAtNGQ5ZC1hMTEwLTk2YTZkMTc5Zjc2NiIsIm5hbWUiOiJhbmRlcnNvbiBzYW5jaGV6Iiwicm9sZXMiOlsic3VwZXJ1c2VyIl0sInBlcm1pc3Npb25zIjpbXSwiaXNfc3VwZXJ1c2VyIjp0cnVlfQ.Ghu9LjggbHBlFn4QdNOIkckxikaYwV8_U1q0oaOroQc";

export const RegisterClientQuery = async (data) => {
  const res = await Axios.post(
    "https://smart-evolution-api.herokuapp.com/api/client/",
    data,
    {
      headers: {
        authorization: "Bearer " + token,
      },
    }
  );
  return res.data;
};
