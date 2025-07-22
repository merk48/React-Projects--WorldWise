import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CitiesProvider } from "./contexts/cities/CitiesContext";
import { AuthProvider } from "./contexts/authentication/fakeAuthenticationContext";

import Product from "./pages/Product";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountriesList from "./components/CountriesList";
import City from "./components/City";
import Form from "./components/Form";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="login" element={<Login />} />
          <Route
            path="app"
            element={
              <CitiesProvider>
                <AppLayout />
              </CitiesProvider>
            }
          >
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountriesList />} />
            <Route path="form" element={<Form />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

// Declarative
