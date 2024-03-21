import useApi from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useNavigateHook } from "@/hooks/useNavigationHook";
import api from "@/lib/apiUtil";
import { AxiosInstance } from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

interface User {
  id: string;
  fullname: string;
  username: string;
  profile_img: string;
}

interface AuthContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }: { children?: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const { navigateTo } = useNavigateHook();
  const [user, setUser] = useLocalStorage<User | null>("user", null);
  const { makeRequest } = useApi();

  function configureInterceptors(instance: AxiosInstance) {
    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          setUser(null);
          navigateTo("/", { replace: true });
        }
        return Promise.reject(error);
      }
    );
  }

  configureInterceptors(api);

  useEffect(() => {
    validateUser();
  }, []);

  const validateUser = async () => {
    if (
      user &&
      user.id &&
      typeof user.id === "string" &&
      user.id.length === 24
    ) {
      const response = await makeRequest("GET", `/auth/validate/${user.id}`);
      if (response) {
        toast.success("Welcome back!");
        setUser(response.result.user);
      }
    } else {
      logout();
    }
  };

  const logout = async () => {
    if (user) {
      const response = await makeRequest("GET", "/auth/logout");
      if (response) {
        toast.success("Logged out successfully");
        setUser(null);
        navigateTo("/", { replace: true });
      }
    }
  };

  const value = useMemo(
    () => ({ user, setUser, loading, setLoading, logout }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
