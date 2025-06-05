import { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import BackgroundDefault from "../assets/Background_default.jpg";

export function usePortfolioImage(username, CharVarName, refreshKey, defaultBackground = BackgroundDefault) {
  const [imageUrl, setImageUrl] = useState(defaultBackground);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    if (!username || !CharVarName) {
      setImageUrl(defaultBackground); // Reset to default on change
      return;
    }

    const fetchImage = async () => {
      const storage = getStorage();
      const imageRef = ref(storage, `${username}/${CharVarName}`);
      try {
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
      } catch (error) {
        setError(`Error fetching image: ${error.message}`);
        setImageUrl(defaultBackground); // Use default image on error
      }
    };

    setImageUrl(defaultBackground); // Clear old image before fetch
    fetchImage();
  }, [username, CharVarName, refreshKey, defaultBackground]);

  const handleImageUpload = async (event) => {
    setError(null); // Reset error
    const file = event.target.files[0];
    if (file && username && CharVarName) {
      if (file.size > 5 * 1024 * 1024) { // 5MB size check
        setError("Image size must be less than 5MB.");
        return;
      }
      const storage = getStorage();
      const imageRef = ref(storage, `${username}/${CharVarName}`);
      try {
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
        console.log(`${CharVarName} uploaded successfully!`);
      } catch (error) {
        setError(`Error uploading ${CharVarName}: ${error.message}`);
        setImageUrl(defaultBackground); // Use default image on upload error
        console.error(`Error uploading ${CharVarName}:`, error);
      }
    }
  };

  return { imageUrl, handleImageUpload, error };
}