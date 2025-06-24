import {onSchedule} from "firebase-functions/v2/scheduler";
import {defineSecret} from "firebase-functions/params";
import * as nodemailer from "nodemailer";
import * as admin from "firebase-admin";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp();
}

// Define secret parameters for Firebase Functions v2
const gmailUser = defineSecret("GMAIL_USER");
const gmailAppPassword = defineSecret("GMAIL_APP_PASSWORD");

// List of privileged email addresses that are exempt
// from inactivity checks
const EXEMPT_EMAILS = [
  "felix.alfred.gomez@gmail.com",
  // Add more privileged emails here as needed
  // "admin@example.com",
  // "support@example.com",
];

// Interface for user data
interface InactiveUser {
  email: string;
  lastSignInTime: string | null;
  uid: string;
}

// export const sendTestEmail = onSchedule(
//   {
//     schedule: "every 5 minutes",
//     timeZone: "America/New_York",
//     region: "us-central1",
//     secrets: [gmailUser, gmailAppPassword],
//   },
//   async () => {
//     // Create transporter for Gmail SMTP
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: gmailUser.value(),
//         pass: gmailAppPassword.value(),
//       },
//     });

//     // Email options
//     const mailOptions = {
//       from: gmailUser.value(),
//       to: "felix.alfred.gomez@gmail.com",
//       subject: "Hello GOMEZ",
//       text: "Congratulations GOMEZ, " +
//         "you just sent an email with Gmail SMTP!",
//     };

//     try {
//       const info = await transporter.sendMail(mailOptions);
//       console.log("Email sent successfully:", info.messageId);
//     } catch (e) {
//       console.error("Error sending email:", e);
//     }
//   }
// );

export const checkInactiveUsers = onSchedule(
  {
    // schedule: "every 24 hours",
    schedule: "every 5 minutes",
    timeZone: "Europe/Paris",
    region: "us-central1",
    secrets: [gmailUser, gmailAppPassword],
  },
  async () => {
    console.log("Starting inactive users check...");

    // Calculate date range: between 1 month and 1 month + 1 day ago
    // const startDate = Date.now() - 30 * 24 * 60 * 60 * 1000;
    // const endDate = Date.now() - 31 * 24 * 60 * 60 * 1000;

    const startDate = Date.now();
    const endDate = Date.now() - 5 * 60 * 1000;

    const inactiveUsers: InactiveUser[] = [];
    let nextPageToken: string | undefined;

    try {
      // Fetch all users in batches
      do {
        const listUsersResult = await admin.auth().listUsers(
          1000,
          nextPageToken
        );

        listUsersResult.users.forEach((userRecord) => {
          const lastSignIn = userRecord.metadata.lastSignInTime ?
            new Date(userRecord.metadata.lastSignInTime).getTime() :
            0;

          // Skip users with exempt email addresses
          if (userRecord.email && EXEMPT_EMAILS.includes(userRecord.email)) {
            console.log(`Skipping exempt user: ${userRecord.email}`);
            return;
          }

          // Check if user last signed in between 1 month and 1 month + 1 day
          if (lastSignIn &&
              lastSignIn < startDate &&
              lastSignIn >= endDate) {
            if (userRecord.email) {
              inactiveUsers.push({
                email: userRecord.email,
                lastSignInTime: userRecord.metadata.lastSignInTime,
                uid: userRecord.uid,
              });
            }
          }
        });

        nextPageToken = listUsersResult.pageToken;
      } while (nextPageToken);

      console.log(`Found ${inactiveUsers.length} inactive users to notify`);

      // Send emails to inactive users
      if (inactiveUsers.length > 0) {
        await sendInactivityEmails(inactiveUsers);
      }
    } catch (error) {
      console.error("Error checking inactive users:", error);
      throw error;
    }
  }
);

export const deleteInactiveUsersData = onSchedule(
  {
    // schedule: "every 24 hours",
    schedule: "every 5 minutes",
    timeZone: "Europe/Paris",
    region: "us-central1",
    secrets: [gmailUser, gmailAppPassword],
  },
  async () => {
    console.log("Starting deletion of inactive users data...");

    // Calculate date range: between 1 month + 2 days and 1 month + 3 days ago
    // const startDate = Date.now() - 41 * 24 * 60 * 60 * 1000;
    // const endDate = Date.now() - 42 * 24 * 60 * 60 * 1000;

    const startDate = Date.now() - 5 * 60 * 1000;
    const endDate = Date.now() - 10 * 60 * 1000;

    const inactiveUsersToDelete: InactiveUser[] = [];
    let nextPageToken: string | undefined;

    try {
      // Fetch all users in batches
      do {
        const listUsersResult = await admin.auth().listUsers(
          1000,
          nextPageToken
        );

        listUsersResult.users.forEach((userRecord) => {
          const lastSignIn = userRecord.metadata.lastSignInTime ?
            new Date(userRecord.metadata.lastSignInTime).getTime() :
            0;

          // Skip users with exempt email addresses
          if (userRecord.email && EXEMPT_EMAILS.includes(userRecord.email)) {
            console.log(
              `Skipping deletion for exempt user: ${userRecord.email}`
            );
            return;
          }

          // Check if user last signed in between
          // 1 month + 2 days and 1 month + 3 days
          if (lastSignIn &&
              lastSignIn < startDate &&
              lastSignIn >= endDate) {
            if (userRecord.email) {
              inactiveUsersToDelete.push({
                email: userRecord.email,
                lastSignInTime: userRecord.metadata.lastSignInTime,
                uid: userRecord.uid,
              });
            }
          }
        });

        nextPageToken = listUsersResult.pageToken;
      } while (nextPageToken);

      console.log(`Found ${inactiveUsersToDelete.length} ` +
        "inactive users to delete");

      // Delete data for inactive users
      if (inactiveUsersToDelete.length > 0) {
        await deleteUsersData(inactiveUsersToDelete);
      }
    } catch (error) {
      console.error("Error deleting inactive users data:", error);
      throw error;
    }
  }
);

/**
 * Deletes data for inactive users
 * @param {InactiveUser[]} users - Array of inactive users whose data to delete
 */
async function deleteUsersData(users: InactiveUser[]): Promise<void> {
  console.log(`Deleting data for ${users.length} inactive users`);

  const deletionPromises = users.map(async (user) => {
    try {
      // Get username from uid in Realtime Database
      const database = admin.database();
      const userRef = database.ref(`users/${user.uid}`);
      const snapshot = await userRef.once("value");

      if (snapshot.exists()) {
        const userData = snapshot.val();
        const username = userData.username;

        if (username) {
          await deleteUserDataInternal(username);
          console.log("Successfully deleted data for user: " +
            `${user.email} (${username})`);
          return {success: true, email: user.email, username};
        } else {
          console.warn(`No username found for user: ${user.email}`);
          return {success: false, email: user.email,
            error: "No username found"};
        }
      } else {
        console.warn("User data not found in database for: " +
          `${user.email}`);
        return {success: false, email: user.email,
          error: "User data not found"};
      }
    } catch (error) {
      console.error(`Failed to delete data for ${user.email}:`, error);
      return {success: false, email: user.email, error};
    }
  });

  const results = await Promise.allSettled(deletionPromises);
  const successfulDeletions = results
    .filter((result): result is PromiseFulfilledResult<{
      success: true,
      email: string,
      username: string
    }> =>
      result.status === "fulfilled" && result.value.success)
    .map((result) => result.value);

  console.log(
    `Data deletion completed: ${successfulDeletions.length}/` +
    `${users.length} users data deleted successfully`
  );

  // Send confirmation emails to users whose data was successfully deleted
  if (successfulDeletions.length > 0) {
    await sendDataDeletionConfirmationEmails(successfulDeletions);
  }
}

/**
 * Internal function to delete user data
 * (similar to deleteUserData from HandlePortfolioData)
 * @param {string} username - The username of the user whose data to delete
 */
async function deleteUserDataInternal(username: string): Promise<void> {
  // Get UID from username
  const uid = await getUserIDWithUserName(username);
  if (!uid) {
    throw new Error("No UID found for username: " + username);
  }

  try {
    // Delete user document from Firestore (publicPortfolios) by UID
    await admin.firestore().doc(`publicPortfolios/${uid}`).delete();

    // Delete user entry from Realtime Database (users)
    await admin.database().ref(`users/${uid}`).remove();

    // Delete all files in Firebase Storage under the user's UID folder
    const bucket = admin.storage().bucket();
    const [files] = await bucket.getFiles({prefix: `${uid}/`});

    // Delete all files in the user's folder
    await Promise.all(files.map((file) => file.delete()));

    // Delete the user's Firebase Authentication account
    await admin.auth().deleteUser(uid);

    console.log(`Successfully deleted all data for user: ${username}`);
  } catch (error) {
    console.error("Error deleting user data:", error);
    throw error;
  }
}

/**
 * Helper function to get UID from username
 * @param {string} username - The username to look up
 * @return {Promise<string|null>} - The UID if found, or null if not found
 */
async function getUserIDWithUserName(username: string): Promise<string | null> {
  const regex = /^[a-zA-Z0-9-_]+$/;
  if (!regex.test(username)) {
    return null;
  }

  try {
    const database = admin.database();
    const usersRef = database.ref("users");
    const snapshot = await usersRef.once("value");

    if (snapshot.exists()) {
      const users = snapshot.val();
      for (const uid in users) {
        if (Object.prototype.hasOwnProperty.call(users, uid)) {
          const otherUser = users[uid];
          if (otherUser.username === username) {
            return uid;
          }
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Error getting user ID:", error);
    return null;
  }
}

/**
 * Sends inactivity warning emails to users
 * @param {InactiveUser[]} users - Array of inactive users to send emails to
 */
async function sendInactivityEmails(users: InactiveUser[]): Promise<void> {
  console.log(`Sending inactivity emails to ${users.length} users`);

  // Create transporter for Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser.value(),
      pass: gmailAppPassword.value(),
    },
  });

  const emailPromises = users.map(async (user) => {
    const mailOptions = {
      from: `MonFolioPerso <${gmailUser.value()}>`,
      to: user.email,
      subject: "⚠️ Connexion requise - Évitez la suppression de vos données",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;
                    margin: 0 auto;">
          <h2 style="color: #333;">Connexion requise</h2>

          <p>Bonjour,</p>

          <p>Nous avons remarqué que vous ne vous êtes pas connecté(e) à
             votre compte MonFolioPerso depuis plus d'un mois.</p>

          <div style="background-color: #fff3cd; border: 1px solid #ffeaa7;
                      padding: 15px; border-radius: 5px; margin: 20px 0;">
            <strong>Action requise :</strong> Connectez-vous sous 10 jours sur
            <a href="https://monfolioperso.fr" style="color: #0066cc;">
              https://monfolioperso.fr</a> afin d'éviter la suppression de
              vos données.
          </div>

          <p>Pour maintenir la sécurité et optimiser nos services, les
             comptes inactifs sont automatiquement supprimés après une
             période prolongée d'inactivité.</p>

          <p style="margin-top: 30px; text-align: center;">
            <a href="https://monfolioperso.fr"
               style="background-color: #0066cc; color: white;
                      padding: 12px 24px; text-decoration: none;
                      border-radius: 5px; display: inline-block;">
              Me connecter maintenant
            </a>
          </p>

          <p style="margin-top: 20px; font-size: 14px; color: #666;">
            Si vous n'avez pas de compte ou si vous recevez ce message par
            erreur, vous pouvez ignorer cet email.
          </p>

          <hr style="margin: 30px 0; border: none;
                     border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #999;">
            MonFolioPerso - Dernière connexion :
            ${user.lastSignInTime || "Inconnue"}
          </p>
        </div>
      `,
      text: `
        Bonjour,

        Nous avons remarqué que vous ne vous êtes pas connecté(e) à votre
        compte MonFolioPerso depuis plus d'un mois.

        ATTENTION : Connectez-vous sous 10 jours sur
        https://monfolioperso.fr afin d'éviter la suppression de vos données.

        Pour maintenir la sécurité et optimiser nos services, les comptes
        inactifs sont automatiquement supprimés après une période prolongée
        d'inactivité.

        Si vous n'avez pas de compte ou si vous recevez ce message par
        erreur, vous pouvez ignorer cet email.

        MonFolioPerso
        Dernière connexion : ${user.lastSignInTime || "Inconnue"}
      `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${user.email}: ${info.messageId}`);
      return {success: true, email: user.email};
    } catch (error) {
      console.error(`Failed to send email to ${user.email}:`, error);
      return {success: false, email: user.email, error};
    }
  });

  const results = await Promise.allSettled(emailPromises);
  const successful = results.filter((result) =>
    result.status === "fulfilled" && result.value.success
  ).length;

  console.log(
    `Email sending completed: ${successful}/${users.length} emails sent ` +
    "successfully"
  );
}

/**
 * Sends data deletion confirmation emails to users
 * @param {Array} users - Array of users whose data was successfully deleted
 */
async function sendDataDeletionConfirmationEmails(
  users: Array<{success: boolean, email: string, username: string}>
): Promise<void> {
  console.log(
    `Sending data deletion confirmation emails to ${users.length} users`
  );

  // Create transporter for Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser.value(),
      pass: gmailAppPassword.value(),
    },
  });

  const emailPromises = users.map(async (user) => {
    const mailOptions = {
      from: `MonFolioPerso <${gmailUser.value()}>`,
      to: user.email,
      subject: "✅ Vos données ont été supprimées",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;
                    margin: 0 auto;">
          <h2 style="color: #333;">Suppression de vos données confirmée</h2>

          <p>Bonjour,</p>

          <p>Nous vous informons que vos données MonFolioPerso ont été
             définitivement supprimées de nos serveurs en raison de
             l'inactivité prolongée de votre compte.</p>

          <div style="background-color: #d4edda; border: 1px solid #c3e6cb;
                      padding: 15px; border-radius: 5px; margin: 20px 0;">
            <strong>Données supprimées :</strong>
            <ul style="margin: 10px 0;">
              <li>Votre portfolio public</li>
              <li>Vos informations de profil</li>
              <li>Tous vos fichiers et images uploadés</li>
              <li>Votre compte utilisateur (${user.username})</li>
            </ul>
          </div>

          <p>Cette suppression fait suite à notre politique de gestion des
             comptes inactifs pour maintenir la sécurité et optimiser nos
             services.</p>

          <p><strong>Vous souhaitez revenir ?</strong><br>
             Vous pouvez créer un nouveau compte à tout moment sur
             <a href="https://monfolioperso.fr" style="color: #0066cc;">
               https://monfolioperso.fr</a>
          </p>

          <p style="margin-top: 30px; text-align: center;">
            <a href="https://monfolioperso.fr"
               style="background-color: #28a745; color: white;
                      padding: 12px 24px; text-decoration: none;
                      border-radius: 5px; display: inline-block;">
              Créer un nouveau compte
            </a>
          </p>

          <p style="margin-top: 20px; font-size: 14px; color: #666;">
            Si vous avez des questions concernant cette suppression ou si
            vous pensez qu'il s'agit d'une erreur, n'hésitez pas à nous
            contacter.
          </p>

          <hr style="margin: 30px 0; border: none;
                     border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #999;">
            MonFolioPerso - Suppression automatique des données inactives
          </p>
        </div>
      `,
      text: `
        Bonjour,

        Nous vous confirmons que vos données MonFolioPerso ont été
        définitivement supprimées de nos serveurs en raison de
        l'inactivité prolongée de votre compte.

        Données supprimées :
        - Votre portfolio public
        - Vos informations de profil
        - Tous vos fichiers et images uploadés
        - Votre compte utilisateur (${user.username})

        Cette suppression fait suite à notre politique de gestion des
        comptes inactifs pour maintenir la sécurité et optimiser nos
        services.

        Vous souhaitez revenir ?
        Vous pouvez créer un nouveau compte à tout moment sur
        https://monfolioperso.fr

        Si vous avez des questions concernant cette suppression ou si
        vous pensez qu'il s'agit d'une erreur, n'hésitez pas à nous
        contacter.

        MonFolioPerso
      `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(
        `Data deletion confirmation email sent to ${user.email}: ` +
        `${info.messageId}`
      );
      return {success: true, email: user.email};
    } catch (error) {
      console.error(
        `Failed to send deletion confirmation email to ${user.email}:`,
        error
      );
      return {success: false, email: user.email, error};
    }
  });

  const results = await Promise.allSettled(emailPromises);
  const successful = results.filter((result) =>
    result.status === "fulfilled" && result.value.success
  ).length;

  console.log(
    `Data deletion confirmation emails completed: ${successful}/` +
    `${users.length} emails sent successfully`
  );
}
