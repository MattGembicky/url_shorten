import React from 'react';


const Button = ({text, click}: {text: string, click?: () => void}) => {
  return(
    <button id="Button"
      onClick={() => {if(click !== undefined){click()}}}>
      {text}
    </button>
  );
}

export default Button;
