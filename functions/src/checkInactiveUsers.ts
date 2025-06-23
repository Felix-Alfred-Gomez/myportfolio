import * as admin from "firebase-admin";
import {onSchedule} from "firebase-functions/v2/scheduler";

admin.initializeApp();

export const checkInactiveUsers = onSchedule(
  {schedule: "every 5 minutes"},
  // {schedule: "every 24 hours"},
  async () => {
    const DurationCheck = Date.now() - 30 * 24 * 60 * 60 * 1000;
    // const DurationCheck = Date.now() - 48 * 60 * 60 * 1000;
    let nextPageToken: string | undefined;

    do {
      const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
      listUsersResult.users.forEach((userRecord) => {
        const lastSignIn = userRecord.metadata.lastSignInTime ?
          new Date(userRecord.metadata.lastSignInTime).getTime() :
          0;
        if (lastSignIn && lastSignIn < DurationCheck) {
          // TODO: Notify inactive user
          console.log(
            `User ${userRecord.email} last signed in at ` +
            `${userRecord.metadata.lastSignInTime}`
          );
        }
      });
      nextPageToken = listUsersResult.pageToken;
    } while (nextPageToken);
    // No return value needed
  }
);
