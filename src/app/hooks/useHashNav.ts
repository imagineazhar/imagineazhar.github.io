import { useLocation, useNavigate } from "react-router-dom";

export function useHashNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateToHash = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate(`/${hash}`);
      return;
    }
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return { navigateToHash };
}
