import React from "react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type Props = {
  notifications: any[];
  handleRead: any;
};

const NotificationsTable: React.FC<Props> = ({ notifications, handleRead }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-start text-4xl font-semibold my-3">Notifications</p>
      <Table className="text-center">
        <TableHeader>
          <TableRow>
            <TableHead className="w-40 text-center">Title</TableHead>
            <TableHead className="w-40 text-center">Message</TableHead>
            <TableHead className="w-40 text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notifications?.map((notification) => (
            <TableRow key={notification.id}>
              <TableCell className="font-medium">
                {notification.title}
              </TableCell>
              <TableCell>{notification.message}</TableCell>
              <TableCell>
                {notification.isRead ? (
                  <p className="font-semibold">Read</p>
                ) : (
                  <Button
                    variant="link"
                    className="text-sm p-0 h-5"
                    onClick={() => handleRead(notification.id)}
                  >
                    Mark as read
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default NotificationsTable;
