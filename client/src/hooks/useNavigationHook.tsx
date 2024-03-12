import { useNavigate } from "react-router-dom";

export const useNavigateHook = () => {
  const navigate = useNavigate();

  const navigateTo = (path: string, options: object = {}) => {
    navigate(path, options);
  };

  const goBack = () => {
    navigate("-1", { replace: true });
  };

  return { navigateTo, goBack };
};
