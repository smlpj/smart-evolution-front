import Axios from "axios";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3MTA4MTkxLCJpYXQiOjE2NjQ0ODAxOTEsImp0aSI6IjA0NzAxNjMyYWFkNzRiNDBhZGUwZWUzYzA4MzQ2OTg0IiwidXNlcl9pZCI6ImQxM2QwZGQ1LTcxZmItNDM4ZC05OTIwLWYyYjVmNTEzNzE4ZSIsIm5hbWUiOiJwcm9kdWN0aW9uIHVzZXIiLCJyb2xlcyI6WyJzdXBlcnVzZXIiXSwiaXNfc3VwZXJ1c2VyIjp0cnVlfQ.8DGchR4wdf3Y7c3TH_xaEzCwcZBQ22mMjIeYrC0as9s";

export const RegisterClientQuery = async (data) => {
  const res = await Axios.post(
    "https://smart-evolution-api2.herokuapp.com/api/client/",
    data,
    {
      headers: {
        authorization: "Bearer " + token,
      },
    }
  );
  return res.data;
};
