import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Thực hiện cuộn lên đầu ngay lập tức
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Dùng instant để tránh bị giật hình khi trang đang load
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
