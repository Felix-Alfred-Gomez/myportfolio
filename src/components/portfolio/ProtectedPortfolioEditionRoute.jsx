import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { FetchUsername } from "../../hooks/HandlePortfolioData"
import PortfolioEdition from "./PortfolioEdition"

export default function ProtectedPortfolioEditionRoute() {
  const { username } = useParams();
  const [currentUsername, setCurrentUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const fetchedUsername = await FetchUsername();
      setCurrentUsername(fetchedUsername);
      setLoading(false);
    }
    fetchUser();
  }, []);

  if (loading) return null; // or a loading spinner
  if (currentUsername === username) {
    return <PortfolioEdition />;
  } else {
    return <Navigate to="/" replace />;
  }
}
