import React, { useState, useEffect, useContext } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  GeoJSON,
  Popup,
  useMap,
} from "react-leaflet";
import mapData from "@/data/countries.json";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import "@/styles/map.css";
import logo from "/location.png";
import L from "leaflet";
import { json } from "react-router-dom";
import { SelectContext } from "../context/SelectContext";

// create custom icon
const customIcon = new Icon({
  iconUrl: logo,
  iconSize: [38, 38], // size of the icon
});

// custom cluster icon
const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(22, 22, true),
  });
};

const position = [6.5227, 3.6218];

function ResetCenterView(props) {
  const { selected } = props;
  const map = useMap();

  useEffect(() => {
    if (selected) {
      map.flyTo(L.latLng(selected?.lat, selected?.lon), map.getZoom(13), {
        animate: true,
      });
      // map.setView(
      //   L.latLng(selected?.lat, selected?.lon),
      //   map.getZoom(10),
      //   {
      //     animate: true,
      //   }
      // );
    }
  }, [selected]);

  return null;
}
// const API_BASE_URL = "https://llll.onrender.com";

const MapView = (props) => {
  // const { selected } = props;
  const { selected } = useContext(SelectContext);
  // const
  const locationSelection = [selected?.lat, selected?.lon];
  // const [marker, setMarker] = useState([]);

  // const getMarkers = async () => {
  //   try {
  //     const response = await `${API_BASE_URL}/markers`;
  //     const data = await response.json();
  //     console.log(data.data)
  //     setMarkers(data.data)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    console.log(mapData);
  }, []);

  const marker = [
    {
      geocode: [6.6018, 3.3515],
      popUp: "Ikeja",
    },
    {
      geocode: [6.4698, 3.5852],
      popUp: "Lekki",
    },
    {
      geocode: [6.4281, 3.4219],
      popUp: "Victoria Island",
    },
  ];
  const countryStyle = {
    fillOpacity: "0",
    color: "black",
    weight: ".5",
  };

  const onEachCountry = (country, layer) => {
    const countryName = country.properties.ADMIN;
  };

  useEffect(() => {
    console.log(marker);
  }, [marker]);

  return (
    <MapContainer
      style={{ height: "100vh", width: "40rem" }}
      zoom={13}
      center={position}
      className="flex z-10"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=I7fTkNOZe0l7PPytA5zf"
      />
      <GeoJSON
        style={countryStyle}
        data={mapData.features}
        onEachFeature={onEachCountry}
      />
      {selected && (
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          {!marker?.length <= 0 ? (
            marker.map((marker, index) => (
              <Marker
                key={index}
                position={locationSelection}
                icon={customIcon}
              >
                <Popup title="marker">{marker.popUp}</Popup>
              </Marker>
            ))
          ) : (
            <p>NOOO</p>
          )}
          {/* {marker.map((marker) => (
            <Marker position={marker.geocode} icon={customIcon}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))} */}
        </MarkerClusterGroup>
      )}
      <ResetCenterView selected={selected} />
    </MapContainer>
  );
};

export default MapView;
