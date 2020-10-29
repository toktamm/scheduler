import React from "react";

import "components/InterviewerListItem.scss";

import classnames from "classnames";

export default function InterviewerListItem (props) {

  const interviewListItemClass = classnames(
    "interviewers__item",
    // "interviewers__item-image",
    {
      "interviewers__item--selected": props.selected
    }
  )

  return <li className={interviewListItemClass} onClick={props.setInterviewer}>
            <img
              className="interviewers__item-image"
              src={props.avatar}
              alt={props.name}
            />
            {props.selected && props.name}
          </li>  

}
