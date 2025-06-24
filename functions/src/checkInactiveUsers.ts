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
    schedule: "every 24 hours", // Run daily to check for inactive users
    timeZone: "Europe/Paris",
    region: "us-central1",
    secrets: [gmailUser, gmailAppPassword],
  },
  async () => {
    console.log("Starting inactive users check...");
    
    // Calculate date range: between 1 month and 1 month + 1 day ago
    const oneMonthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const oneMonthOneDayAgo = Date.now() - 31 * 24 * 60 * 60 * 1000;
    
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
          
          // Check if user last signed in between 1 month and 1 month + 1 day
          if (lastSignIn && 
              lastSignIn < oneMonthAgo && 
              lastSignIn >= oneMonthOneDayAgo) {
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

/**
 * Sends inactivity warning emails to users
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
      from: `MonPortfolio <${gmailUser.value()}>`,
      to: user.email,
      subject: "⚠️ Connexion requise - Évitez la suppression de vos données",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; 
                    margin: 0 auto;">
          <h2 style="color: #333;">Connexion requise</h2>
          
          <p>Bonjour,</p>
          
          <p>Nous avons remarqué que vous ne vous êtes pas connecté(e) à 
             votre compte MonPortfolio depuis plus d'un mois.</p>
          
          <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; 
                      padding: 15px; border-radius: 5px; margin: 20px 0;">
            <strong>Action requise :</strong> Connectez-vous sous 48h sur 
            <a href="https://monfolioperso.fr" style="color: #0066cc;">
              https://monfolioperso.fr</a> afin d'éviter la suppression de 
              vos données.
          </div>
          
          <p>Pour maintenir la sécurité et optimiser nos services, les 
             comptes inactifs sont automatiquement supprimés après une 
             période prolongée d'inactivité.</p>
          
          <p style="margin-top: 30px;">
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
            MonPortfolio - Dernière connexion : 
            ${user.lastSignInTime || "Inconnue"}
          </p>
        </div>
      `,
      text: `
        Bonjour,
        
        Nous avons remarqué que vous ne vous êtes pas connecté(e) à votre 
        compte MonPortfolio depuis plus d'un mois.
        
        ATTENTION : Connectez-vous sous 48h sur https://monfolioperso.fr 
        afin d'éviter la suppression de vos données.
        
        Pour maintenir la sécurité et optimiser nos services, les comptes 
        inactifs sont automatiquement supprimés après une période prolongée 
        d'inactivité.
        
        Si vous n'avez pas de compte ou si vous recevez ce message par 
        erreur, vous pouvez ignorer cet email.
        
        MonPortfolio
        Dernière connexion : ${user.lastSignInTime || "Inconnue"}
      `,
    };
    
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${user.email}: ${info.messageId}`);
      return { success: true, email: user.email };
    } catch (error) {
      console.error(`Failed to send email to ${user.email}:`, error);
      return { success: false, email: user.email, error };
    }
  });
  
  const results = await Promise.allSettled(emailPromises);
  const successful = results.filter(result => 
    result.status === "fulfilled" && result.value.success
  ).length;
  
  console.log(
    `Email sending completed: ${successful}/${users.length} emails sent ` +
    `successfully`
  );
}
