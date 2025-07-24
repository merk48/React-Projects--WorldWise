/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styles from "./styles/Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { UseCities } from "../contexts/cities/CitiesContext";
import { Twemoji } from "react-emoji-render";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";

function Map() {
  const { cities } = UseCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    error: geoError,
    getPosition,
  } = useGeolocation();
  const [mapLat, mapLng] = useUrlPosition();
  useEffect(() => {
    if (!(mapLat && mapLng)) return;
    setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (!geoLocationPosition) return;
    setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {geoError && <Message message={geoError} />}
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>
                {" "}
                <Twemoji text={`${city.emoji}`} />
              </span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });

  return null;
}
export default Map;
