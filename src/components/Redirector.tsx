import React, { useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";

const Redirector = () => {
  const { id } = useParams();

  useEffect(() => {
    Axios.post("http://localhost:8080/redirect", {
      shortUrl: id,
    }).then((res) => {
      if (!res.data.fullUrl) {
        return undefined;
      }
      window.location.replace(res.data.fullUrl);
    });
  }, [id]);
  return <div>You are beeing redirected...</div>;
};

export default Redirector;
