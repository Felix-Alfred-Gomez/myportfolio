import { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export function usePortfolioPicture(username) {
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const fetchProfilePic = async () => {
      if (username) {
        const storage = getStorage();
        const imageRef = ref(storage, `${username}/Profile`);
        try {
          const url = await getDownloadURL(imageRef);
          setProfilePic(url);
        } catch (error) {
          console.error("No profile picture found:", error);
        }
      }
    };

    fetchProfilePic();
  }, [username]);

  const handleProfileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && username) {
      const storage = getStorage();
      const imageRef = ref(storage, `${username}/Profile`);
      try {
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        setProfilePic(url);
        console.log("Profile picture uploaded successfully!");
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    }
  };

  return { profilePic, handleProfileUpload };
}