import { authenticate, logout, setUser } from "@/features/auth/authSlice";
import { useGetMe } from "@/hooks/api/auth";
import { useAppDispatch } from "@/hooks/redux";
import React from "react";
import Cookies from "universal-cookie";

interface IAuthPersist {
  children: React.ReactNode;
}

const AuthPersist: React.FC<IAuthPersist> = ({ children }) => {
  const dispatch = useAppDispatch();
  const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
  const cookies = new Cookies();
  const access_token = cookies.get("access_token");
  const refresh_token = cookies.get("refresh_token");
  useGetMe({
    refetchOnReconnect: false,
    retry: false,
    staleTime: twentyFourHoursInMs,
    queryKey: "my_profile",
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      dispatch(
        authenticate({
          access_token,
          refresh_token,
          authenticated: false,
          set_cookie: false,
        })
      );
      dispatch(setUser({ user: data.data, authenticate: true }));
    },
    onError: () => {
      dispatch(logout());
    },
  });
  return <>{children}</>;
};

export default AuthPersist;
