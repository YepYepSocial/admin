import axios from 'axios';
import {apiUrl} from "./apiUrl";

export const postTimetable = (className, weekday, timetable) => {
  return axios.post(`${apiUrl}/api/timetable`, {
    className,
    weekday,
    timetable
  })
}
