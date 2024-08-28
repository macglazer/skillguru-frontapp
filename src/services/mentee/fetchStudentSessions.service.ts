import {
  FetchStudentSessionsInput,
  FetchStudentSessionsOutput,
} from "./fetchStudentSessions.types";
import {FetchStudentMentorsInput, FetchStudentMentorsOutput} from "@services/mentee/fetchStudentMentors.types";
import axios from "axios";

// export const fetchStudentSessions = async (
//   props: FetchStudentSessionsInput
// ): Promise<FetchStudentSessionsOutput> => {
//   const res = await fetch('/mentee/home/meeting/history')
//   const data = await res.json()
//
//   return {
//     total: data.length,
//     mentors: data.slice(props.skip, props.skip + props.take),
//   };
// };


export const fetchStudentSessions = async (
    props: FetchStudentSessionsInput
): Promise<FetchStudentSessionsOutput> => {

  const response = await axios.get('/mentee/home/meeting/history');
  const data = response.data;
  return {
    mentors: data.slice(0, props.take),
    total: data.length,
  };
};