import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";

export default function useAuthCheck() {
  const [authCheck, setAuthCheck] = useState(false);
  const dispatch = useDispatch();

  const checkUser = useCallback(() => {
    const response = localStorage.getItem("auth");

    if (response) {
      const data = JSON.parse(response);
      if (data?.accessToken && data?.user) {
        dispatch(
          login({
            accessToken: data?.accessToken,
            user: data?.user,
          })
        );
      }
    }
    setAuthCheck(true);

    return () => {
      setAuthCheck(false);
    };
  }, [dispatch]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return authCheck;
}
