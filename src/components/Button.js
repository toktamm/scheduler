import React from "react";

import "components/Button.scss"; // styling

// props.disabled = true, props.onClick = function, props.children = Disabled
function Button(props) {
   let buttonClass = "button";

   if (props.confirm) {
      buttonClass += " button--confirm";
   }

   if (props.danger) {
      buttonClass += " button--danger";
   }

   return (
      // <button className={buttonClass} >{props.children}</button>
      // <p>TEST
      <button className={buttonClass} onClick={props.onClick} disabled={props.disabled}>
        {props.children}
      </button>
      // </p>
    );
}

export default Button;

