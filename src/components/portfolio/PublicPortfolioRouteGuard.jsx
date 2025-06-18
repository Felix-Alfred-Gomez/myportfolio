import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PublicPortfolio from "./PublicPortfolio";
import { IsUserURL } from "../../hooks/HandlePortfolioData";

function PublicPortfolioRouteGuard() {
  const { UserURL } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userURLExists, setUserURLExists] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function checkUser() {
      if (!UserURL) {
        setUserURLExists(false);
        setLoading(false);
        return;
      }
      // Use IsUserURL to check if the UserURL exists
      const exists = await IsUserURL(UserURL);
      if (isMounted) {
        setUserURLExists(exists);
        setLoading(false);
      }
    }
    checkUser();
    return () => { isMounted = false; };
  }, [UserURL]);

  useEffect(() => {
    if (!loading && !userURLExists) {
      navigate("/", { replace: true });
    }
  }, [loading, userURLExists, navigate]);

  if (loading) return null;
  if (!userURLExists) return null;
  return <PublicPortfolio />;
}

export default PublicPortfolioRouteGuard;
