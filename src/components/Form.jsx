// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./styles/Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { UseCurrentCity } from "../contexts/currentCity";
import { BASE_URL, GEOCODING_URL } from "../helpers/config";
import { Twemoji } from "react-emoji-render";
import Message from "./Message";
import Spinner from "./Spinner";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [city, setCity] = useState({});
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState(null);

  useEffect(() => {
    async function fetchCity() {
      try {
        setIsLoadingGeocoding(true);
        setGeoCodingError(null);

        const res = await fetch(
          `${GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json();

        if (!data || Object.keys(data).length === 0) {
          throw new Error("Empty city object received.");
        }
        if (!data.countryCode) {
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else 😊"
          );
        }

        console.log(data);
        setCity(() => ({
          name: data.city || data.locality || "",
          countryName: data.countryName,
          emoji: convertToEmoji(data.countryCode),
        }));
        console.log(city);
      } catch (err) {
        setGeoCodingError(err.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    lat && lng && fetchCity();
  }, [lat, lng]);

  return (
    <>
      {}
      {isLoadingGeocoding ? (
        <Spinner />
      ) : geoCodingError ? (
        <Message message={geoCodingError} />
      ) : (
        <form className={styles.form}>
          <div className={styles.row}>
            <label htmlFor="cityName">City name</label>
            <input
              id="cityName"
              onChange={(e) =>
                setCity((city) => ({ ...city, name: e.target.value }))
              }
              value={city.name}
            />
            <span className={styles.flag}>
              <Twemoji text={`${city.emoji}`} />
            </span>
          </div>

          <div className={styles.row}>
            <label htmlFor="date">When did you go to {city.name}?</label>
            <input
              id="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="notes">Notes about your trip to {city.name}</label>
            <textarea
              id="notes"
              onChange={(e) => setNotes(e.target.value)}
              value={notes}
            />
          </div>

          <div className={styles.buttons}>
            <Button type={"primary"}>Add</Button>
            <BackButton />
          </div>
        </form>
      )}
    </>
  );
}

export default Form;
