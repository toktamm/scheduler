export function getAppointmentsForDay(state, day) {

  const specificDay = state.days.find(item => item.name === day);

  if (!specificDay) {
    return [];
  }

  const appointmentsData = specificDay.appointments.map(item => state.appointments[item]);

  return appointmentsData;

}



export function getInterview(state, interview) {
  // recieving an object with interview id
  // add interview object to replace interviewer id
  // interview.interviewer gives the id
  if(!interview) {
    return null;
  }
  // const obj = { ...interview, interviewer: state.interviewers[interview.interviewer] };
  // console.log(obj);
  return { ...interview, interviewer: state.interviewers[interview.interviewer] };
} 



/* alternate:

export function getInterview(state, interview) {
  // if an interview exists, we should return the interview object with the interviewer value updated (value as object instead of id)
  if (interview) {
    const newInterview = { ...interview };

    newInterview.interviewer = state.interviewers[newInterview.interviewer]

    return newInterview;
  }

  // if no interview was set, just return null
  return null;

} 



*/