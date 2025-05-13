import { usePortfolioPicture } from "../../hooks/HandlePortfolioPicture";

export default function AccueilSection({ username, isPublished, data, setData }) {
  const { profilePic, handleImageUpload } = usePortfolioPicture(username);

  const handleNameChange = (e) => {
    setData({ ...data, name: e.target.value });
  };

  return (
    <section
      id="home"
      style={{
        height: "100vh",
        backgroundColor: "#2b2b3d",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: "60px",
        textAlign: "center",
      }}>

      <div
        style={{
          position: "relative",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          overflow: "hidden",
          border: "2px solid #ccc",
          marginBottom: "20px",
        }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={isPublished} // Disable input if isPublished is true
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: 0,
          }}
        />
        {profilePic ? (
          <img
            src={profilePic}
            alt="Profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#ccc",
              fontSize: "0.9rem",
            }}
          >
            Upload
          </div>
        )}
      </div>

      <div
        style={{
          fontSize: "2.5rem",
          marginBottom: "0px",
          textAlign: "center",
          backgroundColor: "transparent",
          border: "none",
          // borderBottom: "2px solid #ccc", // Apply underline here
          color: "white",
          outline: "none",
          fontWeight: "bold",
          // width: "100%", // Ensure consistent width
        }}
      >
        {isPublished ? (
          <span style={{ margin: 0 }}>{data.name}</span> // Use <span> for consistent rendering
        ) : (
          <input
            type="text"
            value={data.name}
            onChange={handleNameChange}
            style={{
              fontSize: "inherit",
              backgroundColor: "transparent",
              border: "none",
              color: "inherit",
              outline: "none",
              textAlign: "center",
              fontWeight: "bold",
              // width: "100%", // Ensure it spans the container
            }}
          />
        )}

      </div>
      <p style={{ fontSize: "1.2rem", color: "#ccc" }}>
        Faites défiler pour découvrir les compétences.
      </p>
    </section>
  );
}