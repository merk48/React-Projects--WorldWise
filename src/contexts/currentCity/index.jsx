import { createContext, useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { BASE_URL } from "../../helpers/config";

const CurrentCityContext = createContext();

function CurrentCityProvider({ children }) {
  const { id } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const [lat, lng] = [searchParams.get("lat"), searchParams.get("lng")];

  const [currentCity, setCurrentCity] = useState({});
  const [isLoading, setIsLoading] = useState({});

  useEffect(() => {
    async function fetchCity() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();

        if (!data || Object.keys(data).length === 0) {
          throw new Error("Empty city object received.");
        }

        console.log(data);
        setCurrentCity(data);
      } catch (err) {
        alert("Current City " + err);
      } finally {
        setIsLoading(false);
      }
    }
    id && fetchCity();
  }, [id]);

  return (
    <CurrentCityContext.Provider
      value={{
        currentCity,
        setCurrentCity,
        setSearchParams,
        lat,
        lng,
        isLoading,
      }}
    >
      {children}
    </CurrentCityContext.Provider>
  );
}

function UseCurrentCity() {
  const context = useContext(CurrentCityContext);
  if (context === undefined)
    throw new Error("CurrentCity context was used outside CurrentCityProvider");

  return context;
}

export { CurrentCityProvider, UseCurrentCity };
