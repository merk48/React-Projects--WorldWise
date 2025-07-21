import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./styles/Map.module.css";

function Map() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [lat, lng] = [searchParams.get("lat"), searchParams.get("lng")];

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      <h1>{lat}</h1>
      <h1>{lng}</h1>
    </div>
  );
}

export default Map;
