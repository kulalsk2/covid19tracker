import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { showCirclesOnMap } from "../util";
import "./CircleMap.css";

const zoom = 7;
const minLat = 27.1751;
const maxLat = 20.940737;
const minLong = 70.23846;
const maxLong = 93.781153;

function CircleMap({ casesType, center, mapData, isDark }) {
  return (
    <div className={`map ${isDark && "map--darkMode"}`}>
      <LeafletMap
        zoomControl={false}
        key="maps"
        center={center}
        zoom={zoom}
        maxZoom={10}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        minZoom={4}
        attributionControl={true}
        bounds={[
          [minLat, minLong],
          [maxLat, maxLong],
        ]}
      >
        <TileLayer
          url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
          attribution={'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }
        />
        {showCirclesOnMap(mapData, casesType, isDark)}
      </LeafletMap>
    </div>
  );
}

export default CircleMap;
