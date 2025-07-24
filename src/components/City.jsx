import styles from "./styles/City.module.css";
import { formatDateWithWeekday } from "../helpers/formatter";
import { Twemoji } from "react-emoji-render";
import Spinner from "./Spinner";
import BackButton from "./BackButton";
import { UseCities } from "../contexts/cities/CitiesContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = UseCities();

  useEffect(
    function () {
      getCity(id);
    },
    [id, getCity]
  );

  const { cityName, emoji, date, notes } = currentCity;
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.city}>
          <div className={styles.row}>
            <h6>City name</h6>
            <h3>
              <span>
                <Twemoji className={styles.emoji} text={`${emoji}`} />
              </span>
              {""}
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

          <div>
            <BackButton />
          </div>
        </div>
      )}
    </>
  );
}

export default City;
