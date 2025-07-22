import { Twemoji } from "react-emoji-render";
import styles from "./styles/CityItem.module.css";
import { formatDate } from "../helpers/formatter";
import { Link } from "react-router-dom";
import { UseCurrentCity } from "../contexts/currentCity";
import { UseCities } from "../contexts/cities";

function CityItem({ city }) {
  const { id, cityName, emoji, date, position } = city;
  const { currentCity } = UseCurrentCity();
  const { deleteCity } = UseCities();

  async function handleClick(e) {
    e.preventDefault();
    await deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <Twemoji className={styles.emoji} text={emoji} />
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={(e) => handleClick(e)}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
