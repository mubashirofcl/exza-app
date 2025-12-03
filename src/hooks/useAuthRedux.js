import { useSelector } from "react-redux";

export const useAuthRedux = () => {
  const { isAuthenticated, user, loading } = useSelector((s) => s.auth);
  return { isAuthenticated, user, loading };
};
