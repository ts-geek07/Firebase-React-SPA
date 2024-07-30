"use client";

import { NotificationsTable } from "@/components/notification";
import { useNotifications } from "@/hooks";

function Notifications() {
  const { notifications, handleRead } = useNotifications();

  return (
    <NotificationsTable
      notifications={notifications!}
      handleRead={handleRead}
    />
  );
}

export default Notifications;
