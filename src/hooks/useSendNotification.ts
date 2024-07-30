import { toast } from "sonner";
import useFcmToken from "./useFcmToken";
import { useRouter } from "next/navigation";

interface NotificationData {
  title: string;
  message: string;
}

const useSendNotification = () => {
  const { token, notificationPermissionStatus } = useFcmToken();
  const router = useRouter();

  const handleTestNotification = (data: NotificationData) => {
    if (!token) throw new Error("Token is required");

    fetch("/send-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, token }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error sending notification: ${response.status}`);
        }
      })
      .then(() => {
        toast.info("You have a new notification!!!", {
          action: {
            label: "view",
            onClick: () => {
              router.push("/notifications");
            },
          },
        });
      })
      .catch((error) => {
        toast.error("Error ", error);
      });
  };

  return {
    handleTestNotification,
    notificationPermissionStatus,
    disabled: !token,
  };
};

export default useSendNotification;
