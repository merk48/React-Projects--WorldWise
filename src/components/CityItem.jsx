import { Twemoji } from "react-emoji-render";
import styles from "./styles/CityItem.module.css";
import { formatDate } from "../helpers/formatter";

function CityItem({ city }) {
  const { cityName, emoji, date } = city;
  return (
    <li className={styles.cityItem}>
      <Twemoji className={styles.emoji} text={emoji} />
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>{formatDate(date)}</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}

export default CityItem;
