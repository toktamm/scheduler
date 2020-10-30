export function getAppointmentsForDay(state, day) {

  const specificDay = state.days.find(item => item.name === day);

  if (!specificDay) {
    return [];
  }

  const appointmentsData = specificDay.appointments.map(item => state.appointments[item]);

  return appointmentsData;

}



