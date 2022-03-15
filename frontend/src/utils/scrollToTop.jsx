import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const ScrollToTop = ({ children, smooth }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, ...(smooth && { behavior: 'smooth' }) });
  }, [location]);

  return <>{children}</>
};

export default ScrollToTop;