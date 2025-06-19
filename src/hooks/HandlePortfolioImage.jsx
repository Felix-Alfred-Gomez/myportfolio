import { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { GetUserIDWithUserName } from "./HandlePortfolioData";
import BackgroundDefault from "../assets/Background_default.jpg";

export function usePortfolioImage(username, CharVarName, refreshKey, defaultBackground = BackgroundDefault) {
  const [imageUrl, setImageUrl] = useState(null); // ← start with null
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    if (!username || !CharVarName) {
      setImageUrl(null); // not defaultBackground
      setLoading(false);
      return;
    }

    const fetchImage = async () => {
      setLoading(true);
      // Get UID from username
      const uid = await GetUserIDWithUserName(username);
      if (!uid) {
        setImageUrl(defaultBackground);
        setError(`No UID found for username: ${username}`);
        setLoading(false);
        return;
      }
      const storage = getStorage();
      const imageRef = ref(storage, `${uid}/${CharVarName}`);
      try {
        const url = await getDownloadURL(imageRef);
        if (!cancelled) setImageUrl(url);
      } catch (error) {
        if (!cancelled) {
          setImageUrl(defaultBackground); // only set if image not found
          setError(`Error fetching image: ${error.message}`);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    setImageUrl(null); // clear previous
    fetchImage();

    return () => {
      cancelled = true;
    };
  }, [username, CharVarName, refreshKey, defaultBackground]);

  const handleImageUpload = async (event) => {
    setError(null);
    const file = event.target.files[0];
    if (file && username && CharVarName) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 10MB.");
        return;
      }
      // Get UID from username
      const uid = await GetUserIDWithUserName(username);
      if (!uid) {
        setError(`No UID found for username: ${username}`);
        setImageUrl(defaultBackground);
        return;
      }
      const storage = getStorage();
      const imageRef = ref(storage, `${uid}/${CharVarName}`);
      try {
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
      } catch (error) {
        setError(`Error uploading ${CharVarName}: ${error.message}`);
        setImageUrl(defaultBackground);
      }
    }
  };

  return { imageUrl, handleImageUpload, error, loading };
}