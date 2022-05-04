import React from 'react';


const UrlInput = ({setUrl,value}: {setUrl: (value: string) => void,value?:string}) => {

  return(
    <input id="UrlInput" type="url" placeholder="Enter a URL to shorter" value={value} onChange={(event) => setUrl(event.target.value)}/>
  );
}

export default UrlInput;
