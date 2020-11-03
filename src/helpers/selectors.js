export function getAppointmentsForDay(state, day) {

  const specificDay = state.days.find(item => item.name === day);

  if (!specificDay) {
    return [];
  }

  const appointmentsData = specificDay.appointments.map(item => state.appointments[item]);

  return appointmentsData;

}


export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.find(elem => elem.name === day)
  const interviewers = filteredDay ? filteredDay.interviewers.map(elem => state.interviewers[elem]) : [];
  return interviewers;
}


export function getInterview(state, interview) {
  // recieving an object with interview id
  // add interview object to replace interviewer id
  // interview.interviewer gives the id
  if (!interview) {
    return null;
  }

  return { ...interview, interviewer: state.interviewers[interview.interviewer] };
}



