import React, { useState, useEffect } from "react";

import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from 'components/Appointment';
import { getAppointmentsForDay } from "../helpers/selectors";

import axios from 'axios';



// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Bruce Wayne",
//       interviewer: {
//         id: 3,
//         name: "Mildred Nazir",
//         avatar: "https://i.imgur.com/T2WwVfS.png"
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "3pm",
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Clark Kent",
//       interviewer: {
//         id: 3,
//         name: "Mildred Nazir",
//         avatar: "https://i.imgur.com/T2WwVfS.png"
//       }
//     }
//   },
// ];


// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

export default function Application(props) {

  // const [day, setDay] = useState("Monday");

  // const [days, setDays] = useState([]);

  // you may not have the appointments state, its ok if you dont
  // const [appointments, setAppointments] = useState({})


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });


  const dailyAppointments = [];

  // setDay function can remain because we are only using it to update our DayList component
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));





  useEffect(() => {
    // axios
    //   .get('/api/days')
    //   .then(res => {
    //     setDays([...res.data]);
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments')
    ]).then((all) => {
      // console.log('days: ', all[0].data);
      // console.log('appointments: ', all[1].data);
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data }))
    })
  }, []);



  dailyAppointments = getAppointmentsForDay(state, state.day);



  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map(appointment => {
          return <Appointment key={appointment.id} {...appointment} />
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}


