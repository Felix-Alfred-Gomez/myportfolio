import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FetchUsername, GetUserNameWithUserURL } from "../../hooks/HandlePortfolioData"
import PortfolioEdition from "./PortfolioEdition"

export default function ProtectedPortfolioEditionRoute() {
  const { UserURL } = useParams();
  const [currentUsername, setCurrentUsername] = useState(null);
  const [routeUsername, setRouteUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const fetchedCurrentUsername = await FetchUsername();
        const fetchedRouteUsername = await GetUserNameWithUserURL(UserURL);
        setCurrentUsername(fetchedCurrentUsername);
        setRouteUsername(fetchedRouteUsername);
      } else {
        setCurrentUsername(null);
        setRouteUsername(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [UserURL]);

  useEffect(() => {
    if (loading && currentUsername === null && routeUsername === null) return;
    // console.log('[ProtectedPortfolioEditionRoute] loading:', loading, 'currentUsername:', currentUsername, 'routeUsername:', routeUsername);
  }, [loading, currentUsername, routeUsername]);

  if (loading) return null;
  // Check if the current user is authenticated and matches the username associated with the UserURL
  // Because users should only access their own portfolio edition route
  if (currentUsername && routeUsername && currentUsername === routeUsername) {
    // console.log('[ProtectedPortfolioEditionRoute] Access granted. Rendering PortfolioEdition.');
    return <PortfolioEdition />;
  } else {
    // console.log('[ProtectedPortfolioEditionRoute] Access denied. Redirecting to home.');
    return <Navigate to="/" replace />;
  }
}
