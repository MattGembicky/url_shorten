import React, { Fragment, useState } from "react";
import Axios from "axios";

//components
import UrlInput from "./UrlInput";
import Button from "./Button";
import ClearButton from "./ClearButton";

//types
import ErrorNumber from "../App";

const Wrapper = ({ setErrorNumber }: { setErrorNumber: any }) => {
  const [url, setUrl] = useState("");
  const [isFetched, setIsFetched] = useState(false);
  Axios.defaults.withCredentials = true;

  function clearHandle() {
    setUrl("");
    setIsFetched(false);
  }

  async function shortenHandle() {
    try {
      await Axios.post("http://localhost:8080/shorten", {
        fullUrl: url,
      }).then((res) => {
        if (!res.data.valid) {
          setErrorNumber(res.data.errorNumber);
          return;
        }
        setUrl(window.location.href + res.data.short);
        setIsFetched(true);
      });
    } catch (e) {
      setErrorNumber(200);
    }
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
