import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryParams } from "../../components/shared/QuerySearch";

const SpotifyRedirect = () => {
  const navigate = useNavigate();
  const query = useQueryParams();

  useEffect(() => {
    const spy = localStorage.getItem("spy-id");
    navigate(`${spy}?code=${query[0]?.code}`);
  }, []);

  return <div></div>;
};

export default SpotifyRedirect;
