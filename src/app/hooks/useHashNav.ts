import { useLocation, useNavigate } from "react-router-dom";

export function useHashNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateToHash = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    // Some targets (#contact lives in the global footer) exist on every route,
    // so scroll in place when the target is on this page and only route home
    // when it genuinely isn't.
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (location.pathname !== "/") {
      navigate(`/${hash}`);
    }
  };

  return { navigateToHash };
}
