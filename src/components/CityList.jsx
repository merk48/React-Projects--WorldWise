import styles from "./styles/CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { UseCities } from "../contexts/cities";

function CityList() {
  const { cities, isLoading } = UseCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message="Add your first city by clicking on the map" />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
