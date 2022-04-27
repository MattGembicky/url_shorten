import React from 'react';
import {XIcon} from "@heroicons/react/solid";

const ClearButton = ({click}: {click: () => void}) => {
  return(
    <button id="ClearButton"
      onClick={() => {click()}}>
      <div id="ClearButtonIcon">
        <XIcon className="icon"/>
      </div>
    </button>
  );
}

export default ClearButton;
