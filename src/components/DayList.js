import React from 'react';

import DayListItem from 'components/DayListItem';

export default function DayList(props) {

  return (
    <ul>
      <DayListItem
        name={"Monday"}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
      <DayListItem
        name={"Tuesday"}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />

      ...

    </ul>
  )
}




