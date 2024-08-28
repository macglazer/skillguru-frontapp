import {
  FetchSimilarMentorsOutput,
  FetchSimilarMentorsInput,
} from "./fetchSimilarMentors.types";
import axios from "axios";

// export const fetchSimilarMentors = async (
//   props: FetchSimilarMentorsInput
// ): Promise<FetchSimilarMentorsOutput> => {
//   const res = await fetch('/similar-mentors.json')
//   const data = await res.json()
//
//   return {
//     mentors: data.slice(0, props.take),
//   };
// };


export const fetchSimilarMentors = async (props: FetchSimilarMentorsInput): Promise<FetchSimilarMentorsOutput> => {
  try {
    const response = await axios.get('/mentor/home/mentors/similar');
    const data = response.data;

    return {
      mentors: data ? data.slice(0, props.take) : [],
    };
  } catch (error) {
    console.error('Error fetching similar mentors:', error);
    return {
      mentors: []
    }
  }
};
