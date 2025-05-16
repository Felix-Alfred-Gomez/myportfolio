import { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export function usePortfolioImage(username, CharVarName) {
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchImage = async () => {
      if (username && CharVarName) {
        const storage = getStorage();
        const imageRef = ref(storage, `${username}/${CharVarName}`);
        try {
          const url = await getDownloadURL(imageRef);
          setImageUrl(url);
        } catch (error) {
          console.error(`No ${CharVarName} found:`, error);
        }
      }
    };

    fetchImage();
  }, [username, CharVarName]);

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
        console.error(`Error uploading ${CharVarName}:`, error);
      }
    }
  };

  return { imageUrl, handleImageUpload, error };
}