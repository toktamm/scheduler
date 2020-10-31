import React, { useState, useEffect } from "react";

import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from 'components/Appointment';
import { getAppointmentsForDay, getInterview } from "../helpers/selectors";

import axios from 'axios';




export default function Application(props) {

  // const [day, setDay] = useState("Monday");

  // const [days, setDays] = useState([]);

  // you may not have the appointments state, its ok if you dont
  // const [appointments, setAppointments] = useState({})


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


  let dailyAppointments = [];

  dailyAppointments = getAppointmentsForDay(state, state.day);



  // setDay function can remain because we are only using it to update our DayList component
  const setDay = day => setState({ ...state, day });



  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    })
  }, []);




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
          const interview = getInterview(state, appointment.interview);
          return (
            <Appointment
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
            />
          );
        })
        }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}


