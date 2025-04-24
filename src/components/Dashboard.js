// filepath: h:\CODE\myportfolio\src\components\Dashboard\Dashboard.js
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";

function Dashboard() {
  const [username, setUsername] = useState("");
  const auth = getAuth();
  const database = getDatabase();

  useEffect(() => {
    const fetchUsername = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = ref(database, `users/${user.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUsername(data.username); // Set the username from the database
        }
      }
    };

    fetchUsername();
  }, [auth, database]);

  return (
    <div>
      <h1>Bienvenue {username}!</h1>
    </div>
  );
}

export default Dashboard;