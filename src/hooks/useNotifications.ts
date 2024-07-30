import { useEffect, useState } from "react";

const useNotifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  const fetchNotifications = async () => {
    const response = await fetch("/send-notification", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    setNotifications(data.notifications);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleRead = (id: string) => {
    fetch("/send-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    }).then(() => {
      fetchNotifications();
    });
  };

  return { notifications, handleRead };
};

export default useNotifications;
