import { useAuth } from "@/context/AuthContext";
import { isNullOrUndefined } from "@/lib/utils";
import { Navigate } from "react-router-dom";

const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  return !isNullOrUndefined(user) ? (
    children
  ) : (
    <Navigate to="/auth/login" replace={true} />
  );
};

export default AuthRedirect;
