/* eslint-disable react/prop-types */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { BASE_URL } from "../../helpers/config";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
      };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
        isLoading: false,
      };
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: initialState.currentCity,
        isLoading: false,
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      console.log(state);
      console.log(action);
      throw new Error("Unknow action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Fetch all cities on mount
  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();

        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "rejected", payload: err.message });
      }
    }

    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (!id) return;

      if (Number(id) === currentCity.id) return;

      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();

        if (!data || Object.keys(data).length === 0) {
          throw new Error("Empty city object received.");
        }

        dispatch({ type: "city/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "rejected", payload: err.message });
      }
    },
    [currentCity.id]
  );

  // Create new city
  async function createCity(newCity) {
    if (!newCity) return;

    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCity),
      });
      const data = await res.json();

      if (!data || !data.id) {
        throw new Error("Invalid city returned from server");
      }

      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }
  async function deleteCity(id) {
    if (!id) return;

    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
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
