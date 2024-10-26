import { useAppSelector } from "../redux";

const useSession = () => {
  const session = useAppSelector((state) => state.auth);
  return session;
};

export default useSession;
