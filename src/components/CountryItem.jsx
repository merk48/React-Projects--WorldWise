import { Twemoji } from "react-emoji-render";
import styles from "./styles/CountryItem.module.css";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <Twemoji text={country.emoji} />
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
