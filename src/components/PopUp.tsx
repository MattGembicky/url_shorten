import React from "react";

const PopUp = ({
  popUpText,
  click,
}: {
  popUpText: string;
  click: () => void;
}) => {
  return (
    <div className="PopUpBox">
      <div className="PopUpText">{popUpText}</div>
      <div>
        <button className="PopUpButton" onClick={() => click()}>
          OK
        </button>
      </div>
    </div>
  );
};

export default PopUp;
