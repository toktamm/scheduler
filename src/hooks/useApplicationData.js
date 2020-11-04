import React, { useState, useEffect } from "react";
import axios from 'axios';

import { getAppointmentsForDay } from '../helpers/selectors'



export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


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


  // to calculate how many spots are left, we need to check how many interviews are set to null
  // for each day and return a new days array
  const availableSpots = state => {
    const newState = { ...state }
    const days = newState.days.map(day => {
      const spots = getAppointmentsForDay(newState, day.name).filter(appointment => appointment.interview === null).length;
      return { ...day, spots }
    })
    return days;
  }

  

  function bookInterview(id, interview) {

    // copying appointment object at particular id
    // replacing interview null to interview with data
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    // copying appointmentS object and updating with new appointment data
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState(prev => ({ ...prev, appointments }))
        setState(prev => ({ ...prev, days: availableSpots(prev) }))
      })
  }


  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        setState(prev => ({ ...prev, appointments }))
        setState(prev => ({ ...prev, days: availableSpots(prev) }))
      })
  }


  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}