export function getAppointmentsForDay(state, day) {
  //  get object for a particular day
  const specificDay = state.days.find(item => item.name === day)

  if (!specificDay) {
    return [];
  }
  // get appointments array
  //  match appointment ids and return appointments data array
  const appointmentsData = specificDay.appointments.map(item => state.appointments[item])

  return appointmentsData;
  
}


/* alternative solution

export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(elem => elem.name === day)[0]
  const appointments = filteredDay ? filteredDay.appointments.map(elem => state.appointments[elem]) : [];
  return appointments;
}

*/

