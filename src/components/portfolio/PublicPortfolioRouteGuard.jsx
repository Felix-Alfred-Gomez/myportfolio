import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PublicPortfolio from "./PublicPortfolio";
import { GetPortfolioData, checkUsernameAvailable } from "../../hooks/HandlePortfolioData";

function PublicPortfolioRouteGuard() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [usernameExists, setUsernameExists] = useState(false);
  const [portfolioData] = GetPortfolioData(username);

  useEffect(() => {
    let isMounted = true;
    async function checkUser() {
      if (!username) {
        setUsernameExists(false);
        setLoading(false);
        return;
      }
      // checkUsernameAvailable returns true if username is available (not taken)
      const available = await checkUsernameAvailable(username);
      if (isMounted) {
        setUsernameExists(!available); // username exists if not available
        setLoading(false);
      }
    }
    checkUser();
    return () => { isMounted = false; };
  }, [username]);

  useEffect(() => {
    if (!loading && !usernameExists) {
      navigate("/", { replace: true });
    }
  }, [loading, usernameExists, navigate]);

  if (loading) return null;
  if (!usernameExists) return null;
  return <PublicPortfolio data={portfolioData} />;
}

export default PublicPortfolioRouteGuard;
