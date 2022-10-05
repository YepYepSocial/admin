import {apiUrl} from "./apiUrl";
import axios from "axios";

export const getGrades = async () => {
  return (await axios.get(`${apiUrl}/api/grades`)).data
}
