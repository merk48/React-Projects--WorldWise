import { Twemoji } from "react-emoji-render";
import styles from "./styles/CityItem.module.css";
import { formatDate } from "../helpers/formatter";
import { Link } from "react-router-dom";

function CityItem({ city }) {
  const { id, cityName, emoji, date, position } = city;
  return (
    <li>
      <Link
        className={styles.cityItem}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <Twemoji className={styles.emoji} text={emoji} />
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
