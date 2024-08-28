import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "src/helpers/login";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => logout(dispatch, navigate), [
    dispatch,
    navigate,
  ]);

  return handleLogout;
};
