import admin from "firebase-admin";
import { Message } from "firebase-admin/messaging";
import { NextRequest, NextResponse } from "next/server";

if (!admin.apps.length) {
  const serviceAccount = require("@/constants/service_key.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function POST(request: NextRequest) {
  const { token, title, message, id } = await request.json();

  if (id) {
    try {
      const docRef = admin.firestore().collection("notification").doc(id);

      await docRef.update({
        isRead: true,
      });

      return NextResponse.json({
        message: "Read the notification",
        success: true,
      });
    } catch (error) {
      return NextResponse.json({ success: false, error });
    }
  }

  const payload: Message = {
    token,
    notification: {
      title: title,
      body: message,
    },
  };

  try {
    await admin.messaging().send(payload);

    const { id } = await admin.firestore().collection("notification").add({
      token,
      title,
      message,
      isRead: false,
      createdAt: new Date().toISOString(),
    });

    const docRef = admin.firestore().collection("notification").doc(id);

    const result = await docRef.get();

    if (!result.exists)
      return NextResponse.json({
        message: "Failed to retreive data",
        success: false,
      });

    return NextResponse.json({
      success: true,
      message: "Notification sent!",
    });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}

export async function GET(request: NextRequest) {
  try {
    const notifications: any[] = [];

    await admin
      .firestore()
      .collection("notification")
      .orderBy("createdAt", "desc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          notifications.push({
            ...doc.data(),
            id: doc.id,
          });
        });
      });

    return NextResponse.json({
      success: true,
      message: "got notifications!!",
      notifications,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
