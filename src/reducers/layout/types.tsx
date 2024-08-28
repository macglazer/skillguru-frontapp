export type ActionType =
  | "OPEN_SIDEBAR"
  | "CLOSE_SIDEBAR"
  | "TOGGLE_SIDEBAR"

export type LayoutState = {
  isSidebarOpen: boolean;
  isInitialized: boolean;
};

export type LayoutAction = 
{ type: 'OPEN_SIDEBAR' } |
{ type: 'CLOSE_SIDEBAR' } |
{ type: 'TOGGLE_SIDEBAR' } 
