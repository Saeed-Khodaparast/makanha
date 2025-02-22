// components/Map.jsx
import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// MapEvents component to handle click events
function MapEvents({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      onMapClick(e);
    },
  });
  return null;
}

function Map() {
  // Default position (London)
  const [position, setPosition] = useState([51.505, -0.09]);
  // Stores all markers
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    // Tries to get user's current location when component mounts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          setPosition([location.coords.latitude, location.coords.longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  const handleMapClick = (e) => {
    // Creates a new marker when user clicks on the map
    const newMarker = {
      position: [e.latlng.lat, e.latlng.lng],
      title: `Location ${markers.length + 1}`,
      description: `This is marker ${markers.length + 1}`,
    };
    setMarkers([...markers, newMarker]);
  };

  return (
    <div className="map-container">
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapEvents onMapClick={handleMapClick} />

        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position}>
            <Popup>
              <h3>{marker.title}</h3>
              <p>{marker.description}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
