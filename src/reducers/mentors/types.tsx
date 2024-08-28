import { FiltersSelected, Mentor } from "@customTypes/mentor";

export type ActionType =
  | "UPDATE_FILTERS"
  | "UPDATE_RESULTS"
  | "UPDATE_REQUEST_STATE"
  | "UPDATE_PAGE"
  | "ADD_RESULTS"


export type MentorsState<F = FiltersSelected> = {
  mentors: Mentor[];
  total: number;
  page: number;
  filters: F;
  pending: boolean;
  error: string;
};

export type MentorsAction = {
  type: ActionType,
  payload: Partial<MentorsState<Partial<FiltersSelected>>>,
}
