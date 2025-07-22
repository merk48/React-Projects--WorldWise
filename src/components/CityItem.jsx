/* eslint-disable react/prop-types */
import { Twemoji } from "react-emoji-render";
import styles from "./styles/CityItem.module.css";
import { formatDate } from "../helpers/formatter";
import { Link } from "react-router-dom";
import { UseCities } from "../contexts/cities/CitiesContext";
function CityItem({ city }) {
  const { currentCity, deleteCity } = UseCities();
  const { id, cityName, emoji, date, position } = city;

  async function handleClick(e) {
    e.preventDefault();
    console.log("start");
    await deleteCity(id);
    console.log("emd");
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
