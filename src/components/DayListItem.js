import React from "react";

import classnames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {

  const dayClass = classnames(
    "day-list__item",
    {
      "day-list__item--selected": props.selected,
      "day-list__item--full": props.spots === 0
    }
  )

  function formatSpots() {
    return props.spots === 0 ? 'no spots remaining' : `${props.spots} spot${props.spots === 1 ? '' : 's'} remaining`
  }

  return (
    <li data-testid="day" className={dayClass} onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}



