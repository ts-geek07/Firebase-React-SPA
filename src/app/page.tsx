"use client";

import { Button } from "@/components/ui/button";
import { useSendNotification } from "@/hooks";
import Link from "next/link";

export default function Page() {
  const { handleTestNotification, notificationPermissionStatus, disabled } =
    useSendNotification();

  const handleClick = (number: number) => {
    const data = {
      title: `Test Notification ${number}`,
      message: `This is a test notification ${number}`,
    };

    handleTestNotification(data);
  };

  return (
    <main className="p-10">
      <h1 className="text-4xl mb-4 font-bold">Firebase Notification</h1>

      {notificationPermissionStatus === "granted" ? (
        <p>Permission to receive notifications has been granted.</p>
      ) : notificationPermissionStatus !== null ? (
        <p>
          You have not granted permission to receive notifications. Please
          enable notifications in your browser settings.
        </p>
      ) : null}

      <Button
        disabled={disabled}
        className="mt-5"
        onClick={() => handleClick(1)}
      >
        Send Test Notification 1
      </Button>
      <Button
        disabled={disabled}
        className="mt-5 ml-3"
        onClick={() => handleClick(2)}
      >
        Send Test Notification 2
      </Button>
      <Button
        disabled={disabled}
        className="mt-5 ml-3"
        onClick={() => handleClick(3)}
      >
        Send Test Notification 3
      </Button>
      <Link className="ml-3" href="/notifications">
        View all notifications
      </Link>
    </main>
  );
}
