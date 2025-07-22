// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Twemoji } from "react-emoji-render";
import { useNavigate } from "react-router-dom";
import styles from "./styles/Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { GEOCODING_URL } from "../helpers/config";
import Message from "./Message";
import Spinner from "./Spinner";
import { convertToEmoji } from "../helpers/formatter";
import { UseCities } from "../contexts/cities";

function Form() {
  const navigate = useNavigate();
  const [city, setCity] = useState({});
  const { createCity, isLoading } = UseCities();
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
          date: new Date(),
          notes: "",
        }));
      } catch (err) {
        setGeoCodingError(err.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    lat && lng && fetchCity();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!(city.name || city.date)) return;

      const newCity = {
        cityName: city.name,
        date: city.date,
        emoji: city.emoji,
        country: city.countryName,
        notes: city.notes,
        position: { lat, lng },
      };

      await createCity(newCity);
      navigate("/app/cities");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <>
      {isLoadingGeocoding ? (
        <Spinner />
      ) : !(lat && lng) ? (
        <Message message="Start by clicking somewhere on the map" />
      ) : geoCodingError ? (
        <Message message={geoCodingError} />
      ) : (
        <form
          className={`${styles.form} ${isLoading ? styles.loading : ""}`}
          onSubmit={(e) => handleSubmit(e)}
        >
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
            <DatePicker
              id="date"
              selected={city.date}
              onChange={(date) => setCity((city) => ({ ...city, date }))}
              dateFormat="dd/MM/yy"
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="notes">Notes about your trip to {city.name}</label>
            <textarea
              id="notes"
              onChange={(e) =>
                setCity((city) => ({ ...city, notes: e.target.value }))
              }
              value={city.notes}
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
