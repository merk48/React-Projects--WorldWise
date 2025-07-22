import { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../helpers/config";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState({});

  // Fetch all cities on mount
  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        alert(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  // Create new city
  async function createCity(newCity) {
    console.log(newCity);

    try {
      setIsLoading(true);

      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST", // ← fix your typo “POSY” → “POST”
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCity),
      });
      const data = await res.json();

      if (!data || !data.id) {
        throw new Error("Invalid city returned from server");
      }
      console.log(data);

      // Append the newly created city to your list
      setCities((cities) => [...cities, data]);
    } catch (err) {
      console.error("createCity:", err);
      throw err; // re‑throw so callers can .catch or show UI feedback
    } finally {
      setIsLoading(false);
    }
  }
  console.log(cities);
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        createCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function UseCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error("Cities context was used outside CitiesProvider");

  return context;
}

export { CitiesProvider, UseCities };
