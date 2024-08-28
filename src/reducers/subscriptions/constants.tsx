import { SubscriptionsState } from "./types";

export const subscriptionsInitialState: SubscriptionsState = {
  role: 'M',
  tab: 'awaiting',
  pending: true,
  errorMessage: '',
  page: 1,
  total: 0,
  records: [],
};

export const PER_PAGE = 5
