import axios from 'axios';
import {apiUrl} from "./apiUrl";

export const postTimetable = (gradeId, weekday, timetable) => {
  return axios.post(`${apiUrl}/api/timetable`, {
    gradeId,
    weekday,
    timetable
  })
}
