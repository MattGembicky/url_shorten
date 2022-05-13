import React, { useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Redirector = ({ setErrorNumber }: { setErrorNumber: any }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  function redirect() {
    axios
      .post("/api/redirect", {
        shortUrl: id,
      })
      .then((res: AxiosResponse) => {
        if (!res.data.found) {
          navigate("/");
          setErrorNumber(res.data.errorNumber);
        } else {
          window.location.replace(res.data.fullUrl);
        }
      })
      .catch((error: AxiosError) => {
        if (error.response!.status === 404) {
          setErrorNumber(201);
        } else {
          setErrorNumber(-1);
        }
        navigate("/");
      });
  }

  useEffect(() => {
    redirect();
  }, [id]);

  return <div id="RedirectorText">Redirecting to another page...</div>;
};

export default Redirector;
