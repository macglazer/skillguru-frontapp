import { MentorsState } from "./types";

export const mentorsInitialState: MentorsState = {
  mentors: [],
  total: 0,
  page: 1,
  filters: {
    priceMin: 0,
    priceMax: 299,
    categories: [],
    skills: [],
    services: [],
    topics:[],
    phrase: "",
    sort: "rateDESC",
  },
  pending: true,
  error: "",
};
