import React, { useEffect } from "react";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

//types
import ErrorNumber from "../App";

const Redirector = ({ setErrorNumber }: { setErrorNumber: any }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  async function redirect() {
    try {
      await Axios.post("http://localhost:8080/redirect", {
        shortUrl: id,
      }).then((res) => {
        if (!res.data.found) {
          navigate("/");
          setErrorNumber(res.data.errorNumber);
          return;
        }
        window.location.replace(res.data.fullUrl);
      });
    } catch (e) {
      navigate("/");
      setErrorNumber(201);
    }
  }

  useEffect(() => {
    redirect();
  }, [id]);

  return <div id="RedirectorText">Redirecting to another page...</div>;
};

export default Redirector;
