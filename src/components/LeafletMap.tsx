"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, LatLngTuple, Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

// Importing the marker images
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet's default icon paths
const defaultIcon = new Icon({
  iconUrl: iconUrl.src, // Access the src property of the image
  iconRetinaUrl: iconRetinaUrl.src, // Access the src property for retina image
  shadowUrl: shadowUrl.src, // Access the src property for shadow
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapProps {
  posix: LatLngExpression | LatLngTuple;
  zoom?: number;
}

const defaults = {
  zoom: 19,
};

const LeafletMap = ({ posix, zoom = defaults.zoom }: MapProps) => {
  return (
    <MapContainer
      center={posix}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={posix} icon={defaultIcon}>
        <Popup>You are here</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;
