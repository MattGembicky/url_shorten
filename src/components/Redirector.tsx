import React, { useEffect } from "react";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

//types
import ErrorNumber from "../App";

const Redirector = ({ setErrorNumber }: { setErrorNumber: any }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    Axios.post("http://localhost:8080/redirect", {
      shortUrl: id,
    }).then((res) => {
      if (!res.data.found) {
        navigate("/");
        setErrorNumber(res.data.errorNumber);
        return;
      }
      window.location.replace(res.data.fullUrl);
    });
  }, [id]);
  return <div id="RedirectorText">Redirecting...</div>;
};

export default Redirector;
