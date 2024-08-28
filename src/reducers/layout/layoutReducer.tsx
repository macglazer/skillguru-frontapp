import { layoutInitialState } from "./constants";
import { type LayoutAction, type LayoutState } from "./types";

export const layoutReducer = (
  state = layoutInitialState,
  action: LayoutAction
): LayoutState => {
  switch (action.type) {
    case 'OPEN_SIDEBAR':
      return { ...state, isSidebarOpen: true };
    case 'CLOSE_SIDEBAR':
      return { ...state, isSidebarOpen: false };
    case 'TOGGLE_SIDEBAR':
      return { ...state, isSidebarOpen: !state.isSidebarOpen };
    default:
      return state;
  }
};
