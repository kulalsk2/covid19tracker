import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

export const prettyNumber = (stat) =>
  stat ? `${numeral(stat).format("0a")}` : "+0";

const casesTypeValues = {
  active: {
    color: "#a820ff",
    multiplier: 1200,
  },
  confirmed: {
    color: "#3783ea",
    multiplier: 180,
  },
  recovered: {
    color: "#2c9947",
    multiplier: 200,
  },
  deaths: {
    color: "#e9113f",
    multiplier: 2000,
  },
};

export const showCirclesOnMap = (data, casesType = "active") =>
  data.map((state, i) => {
    if (state.statecode !== "TT") {
      return (
        <Circle
          key={i}
          center={[state.lat, state.lng]}
          fillOpacity={0.3}
          stroke={true}
          color={casesTypeValues[casesType].color}
          fillColor={casesTypeValues[casesType].color}
          radius={
            Math.sqrt(state[casesType]) * casesTypeValues[casesType].multiplier
          }
        >
          <div className="popupdarkMode">
            <Popup key={state.statecode}>
              <div className={"info-container"}>
                <div className="info-name">{state.state}</div>
                <div className="info-active">Active:{state.active}</div>
                <div className="info-confirmed">
                  Confirmed:{state.confirmed}
                </div>
                <div className="info-recovered">
                  Recovered:{state.recovered}
                </div>
                <div className="info-deaths">Deaths: {state.deaths}</div>
              </div>
            </Popup>
          </div>
        </Circle>
      );
    } else {
      return <div></div>;
    }
  });
