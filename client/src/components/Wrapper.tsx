import React, { Fragment, useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";

//components
import UrlInput from "./UrlInput";
import Button from "./Button";
import ClearButton from "./ClearButton";

const Wrapper = ({ setErrorNumber }: { setErrorNumber: any }) => {
  const [url, setUrl] = useState("");
  const [isFetched, setIsFetched] = useState(false);
  axios.defaults.withCredentials = true;

  function clearHandle() {
    setUrl("");
    setIsFetched(false);
  }

  function shortenHandle() {
    axios
      .post("/api/shorten", {
        fullUrl: url,
      })
      .then((res: AxiosResponse) => {
        if (!res.data.valid) {
          setErrorNumber(res.data.errorNumber);
          return;
        }
        setUrl(window.location.href + res.data.short);
        setIsFetched(true);
      })
      .catch((error: AxiosError) => {
        if (error.response!.status === 400) {
          setErrorNumber(200);
        } else {
          setErrorNumber(-1);
        }
      });
  }

  function copyHandle() {
    navigator.clipboard.writeText(url);
  }

  return (
    <div id="Wrapper">
      <UrlInput setUrl={setUrl} value={url} />
      {!isFetched ? (
        <Button text="Shorten" click={shortenHandle} />
      ) : (
        <Fragment>
          <ClearButton click={clearHandle} />
          <Button text="Copy" click={copyHandle} />
        </Fragment>
      )}
    </div>
  );
};

export default Wrapper;
