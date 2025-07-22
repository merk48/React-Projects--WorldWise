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
    if (!newCity) return;

    try {
      setIsLoading(true);

      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCity),
      });
      const data = await res.json();

      if (!data || !data.id) {
        throw new Error("Invalid city returned from server");
      }
      console.log(data);

      setCities((cities) => [...cities, data]);
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  }
  async function deleteCity(id) {
    if (!id) return;

    try {
      setIsLoading(true);

      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        createCity,
        deleteCity,
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
