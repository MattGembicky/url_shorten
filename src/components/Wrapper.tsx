import React, { useState } from "react";
import Axios from "axios";

//components
import UrlInput from "./UrlInput";
import Button from "./Button";
import ClearButton from "./ClearButton";

async function checkUrl(url: string) {
  const result = await fetch(url, { method: "GET", headers: {} });
  console.log(result);
}

const Wrapper = () => {
  const [url, setUrl] = useState("");
  const [isFetched, setIsFetched] = useState(false);
  Axios.defaults.withCredentials = true;

  function clearHandle() {
    setUrl("");
    setIsFetched(false);
  }

  function shortenHandle() {
    Axios.post("http://localhost:8080/shorten", {
      fullUrl: url,
    }).then((res) => {
      if (!res.data.short) {
        setUrl("Invalid url");
        return;
      }
      setUrl(window.location.href + res.data.short);
      setIsFetched(true);
    });
  }

  function copyHandle() {
    navigator.clipboard.writeText(url);
  }

  return (
    <div id="Wrapper">
      <UrlInput setUrl={setUrl} value={url} />
      <ClearButton click={clearHandle} />
      {!isFetched ? (
        <Button text="Shorten" click={shortenHandle} />
      ) : (
        <Button text="Copy" click={copyHandle} />
      )}
    </div>
  );
};

export default Wrapper;
