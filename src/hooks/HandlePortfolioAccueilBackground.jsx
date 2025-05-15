import { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export function usePortfolioAccueilBackground(username) {
  const [backgroundUrl, setBackgroundUrl] = useState(null);

  useEffect(() => {
    const fetchBackground = async () => {
      if (username) {
        const storage = getStorage();
        const bgRef = ref(storage, `${username}/AccueilBackground`);
        try {
          const url = await getDownloadURL(bgRef);
          setBackgroundUrl(url);
        } catch (error) {
          console.error("No accueil background found:", error);
        }
      }
    };

    fetchBackground();
  }, [username]);

  const handleBackgroundUpload = async (event) => {
    const file = event.target.files[0];
    if (file && username) {
      const storage = getStorage();
      const bgRef = ref(storage, `${username}/AccueilBackground`);
      try {
        await uploadBytes(bgRef, file);
        const url = await getDownloadURL(bgRef);
        setBackgroundUrl(url);
        console.log("Accueil background uploaded successfully!");
      } catch (error) {
        console.error("Error uploading accueil background:", error);
      }
    }
  };

  return { backgroundUrl, handleBackgroundUpload };
}