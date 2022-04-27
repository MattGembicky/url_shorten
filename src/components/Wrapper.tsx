import React, { useState } from 'react';

//components
import TextInput from './TextInput';
import Button from './Button';
import ClearButton from './ClearButton';

const Wrapper = () => {
  const [shortUrl, setShortUrl] = useState("");

  function clearHandle() {
    setShortUrl("");
  }

  function shortenHandle(){

  }

  function copyHandle(){
    navigator.clipboard.writeText(shortUrl);
  }

  return (
    <div id="Wrapper">
      <TextInput />
      <ClearButton click={clearHandle} />
      {shortUrl.length === 0 ?
      <Button text="Shorten" click={shortenHandle} />
      : <Button text="Copy" click={copyHandle} />
      }
    </div>
  );
}

export default Wrapper;
