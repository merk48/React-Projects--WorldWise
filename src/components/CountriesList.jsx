import Spinner from "./Spinner";
import styles from "./styles/CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";

function CountriesList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  const countries = Array.from(
    new Set(
      cities.map((city) =>
        JSON.stringify({ country: city.country, emoji: city.emoji })
      )
    )
  ).map((str) => JSON.parse(str));

  // const countries = cities.reduce((arr, city) => {  if (!arr.some((el) => el.country === city.country)) {     return [...arr, { country: city.country, emoji: city.emoji }];   }   return arr; }, []);

  if (!countries.length)
    return <Message message="Add your first country by clicking on the map" />;

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  );
}

export default CountriesList;
