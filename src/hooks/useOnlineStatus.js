import { useState, useEffect } from "react";

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isFirst, setIsFirst] = useState(true);

  useEffect(() => {
    const handleOnline = () => {
      !isFirst && setIsOnline(true);
      isFirst && setIsFirst(false);
      refreshPage();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const refreshPage = () => {
    const currentUrl = window.location.href;
    window.location.href = currentUrl;
  };

  return isOnline;
}
