import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./styles/City.module.css";
import { formatDateWithWeekday } from "../helpers/formatter";
import { BASE_URL } from "../helpers/config";
import { Twemoji } from "react-emoji-render";

function City() {
  const [city, setCity] = useState({});
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [lat, lng] = [searchParams.get("lat"), searchParams.get("lng")];

  useEffect(() => {
    async function fetchCities() {
      try {
        // setIsLoading(true);

        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();

        setCity(data);
        console.log(data);
      } catch (err) {
        alert(err);
      } finally {
        // setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  // TEMP DATA
  const currentCity = {
    cityName: "Lisbon",
    emoji: "🇵🇹",
    date: "2027-10-31T15:59:59.138Z",
    notes: "My favorite city so far!",
  };

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <Twemoji className={styles.emoji} text={emoji} />
          {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDateWithWeekday(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      {/* <div>
        <ButtonBack />
      </div> */}
    </div>
  );
}

export default City;
