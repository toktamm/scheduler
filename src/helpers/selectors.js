export function getAppointmentsForDay(state, day) {
  //  get object for a particular day
  const specificDay = state.days.find(item => item.name === day)
  // console.log("specificDay: ", specificDay);
  // console.log("appointments: ", state.appointments);

  if(!specificDay) {
    return [];
  }
  // get appointments array
  //  match appointment ids and return appointments data array
  const appointmentsData = specificDay.appointments.map(item => {
    // console.log("item: ", item);
    return state.appointments[item];
  })
  // console.log("appointmentsData: ", appointmentsData);
  return appointmentsData;
}

