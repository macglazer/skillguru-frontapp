import {FetchStudentMentorsInput, FetchStudentMentorsOutput,} from "./fetchStudentMentors.types";
import axios from "axios";

export const fetchYoursStudentMentors = async (
    props: FetchStudentMentorsInput
): Promise<FetchStudentMentorsOutput> => {
  // const res = await fetch('/sessions-mocked.json')
  // const response = await axios.get('/mentor/home/meeting/history');
  const response = await fetch('/student-mentors.json')
  // const data = response.data;
  const data = await response.json();

  console.log('tutaj testuje: ',data)

    return {
        mentors: data.slice(0, props.take),
        total: data.length,
    };
};