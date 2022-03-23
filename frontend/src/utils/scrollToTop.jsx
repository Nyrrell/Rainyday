import { useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";

const ScrollToTop = ({ children }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    const smooth = location['state']?.['from']?.['pathname'].split('/')[1] === 'product';
    window.scrollTo({ top: 0, left: 0, ...(smooth && { behavior: 'smooth' }) });
  }, [location]);

  return children
};

export default ScrollToTop;