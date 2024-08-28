import { layoutInitialState } from "./constants";
import { useDispatch, useSelector } from "react-redux";
import { LayoutAction, LayoutState } from "./types";
import { Dispatch } from "redux";

type UseLayoutReducerState = {
  layoutState: LayoutState
  handleOpen: () => void
  handleClose: () => void
  handleSwitch: () => void
}

export const useLayoutReducer = (): UseLayoutReducerState => {
  const layoutState: LayoutState = useSelector((state) => {
    if (state && typeof state === "object" && "layout" in state) {
      return state?.layout as LayoutState;
    }
    return layoutInitialState;
  });
  const dispatch = useDispatch();

  const handleOpen = () => dispatch({ type: 'OPEN_SIDEBAR' });
  const handleClose = () => dispatch({ type: 'CLOSE_SIDEBAR' });
  const handleSwitch = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' })
  };

  return { layoutState, handleClose, handleSwitch, handleOpen };
};
