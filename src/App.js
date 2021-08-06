import React, { useState, useEffect } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import { latlong } from "./constants";
import "leaflet/dist/leaflet.css";
import StatusCard from "./components/Card/Card";
import CircleMap from "./components/Map/CircleMap";
import "./App.css";
import Charts from "./components/Charts/Chart";
import { prettyNumber } from "./components/util";
import StateInfoTable from "./components/Table/Table";
function App() {
  const [data, setData] = useState({});
  const [darkMode, setDarkMode] = useState(getInitialMode());
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [states, setStatesData] = useState([]);
  const [selectedState, setSelectedState] = useState("TT");
  const [selectedStateInfo, setSelectedStateInfo] = useState({});
  const [casesType, setCasesType] = useState("active");
  const [mapCenter, setMapCenter] = useState([24.070541, 83.003948]);

  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(darkMode));
  }, [darkMode]);

  function getInitialMode() {
    return JSON.parse(localStorage.getItem("dark"));
  }

  const handleResize = (e) => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    fetch("https://api.covid19india.org/data.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        let DataofStates = [];
        for (let i = 0; i < data.statewise.length; i++) {
          for (let j = 0; j < latlong.length; j++) {
            if (data.statewise[i].statecode === latlong[j].statecode) {
              let temp = {
                ...data.statewise[i],
                lat: latlong[j].lat,
                lng: latlong[j].long,
                name: latlong[j].name,
              };
              DataofStates.push(temp);
            }
          }
        }
        setStatesData(DataofStates);
        setSelectedStateInfo(DataofStates[0]);
      });
    fetch("https://api.covid19india.org/v4/min/timeseries.min.json");
  }, []);

  const onStateChange = (event) => {
    const stateCodeOfSelectedState = event.target.value;
    setSelectedState(stateCodeOfSelectedState);
    console.log("statecode -----", stateCodeOfSelectedState);
    const stateData = states.filter((state) => {
      return state.statecode === stateCodeOfSelectedState;
    })[0];
    setSelectedStateInfo(stateData);
    setMapCenter([stateData.lat, stateData.lng]);
  };

  const countrySelect = (
    <FormControl className="app_dropdown">
      <Select
        style={
          darkMode
            ? {
                backgroundColor: "#1f1f1f",
                color: "white",
              }
            : {}
        }
        className="app_select"
        variant="outlined"
        value={selectedState}
        onChange={onStateChange}
      >
        {states.map((state) => (
          <MenuItem
            key={state.statecode}
            value={state.statecode}
            style={{
              backgroundColor: `${darkMode && "#1f1f1f"}`,
              color: `${darkMode && "white"}`,
            }}
          >
            {state.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText style={darkMode ? { color: "white" } : {}}>
        Select state from Here
      </FormHelperText>
    </FormControl>
  );

  return (
    <div className={`app ${darkMode && "dark-mode"}`}>
      <div className={`app_header ${darkMode && "dark-mode-header"}`}>
        <nav className="navbar">Covid 19 India</nav>
        <div className="toggle-container">
          <span style={{ color: darkMode ? "grey" : "yellow" }}>☀︎</span>
          <span className="toggle">
            <input
              type="checkbox"
              checked={darkMode}
              className="checkbox"
              id="checkbox"
              onChange={() => setDarkMode((prevmode) => !prevmode)}
            />
            <label htmlFor="checkbox" />
          </span>
          <span style={{ color: darkMode ? "slateblue" : "grey" }}>☾</span>
        </div>
      </div>
      <div className="app_body">
        <div className="app_right_left">
          <div className="app_right">
            <div className="app_right_select">{countrySelect}</div>
            <div className="app_status">
              <StatusCard
                isDark={darkMode}
                onClick={(e) => setCasesType("active")}
                title="Active"
                active={casesType === "active"}
                isColor1={true}
                cases={
                  windowWidth < 770
                    ? prettyNumber(selectedStateInfo.active)
                    : selectedStateInfo.active
                }
              />
              <StatusCard
                isDark={darkMode}
                active={casesType === "confirmed"}
                isColor2={true}
                onClick={(e) => setCasesType("confirmed")}
                title="Confirmed"
                cases={
                  windowWidth < 770
                    ? prettyNumber(selectedStateInfo.confirmed)
                    : selectedStateInfo.confirmed
                }
              />
              <StatusCard
                isDark={darkMode}
                active={casesType === "recovered"}
                isColor3={true}
                onClick={(e) => setCasesType("recovered")}
                title="Recovered"
                cases={
                  windowWidth < 770
                    ? prettyNumber(selectedStateInfo.recovered)
                    : selectedStateInfo.recovered
                }
              />
              <StatusCard
                isDark={darkMode}
                active={casesType === "deaths"}
                isColor4={true}
                onClick={(e) => setCasesType("deaths")}
                title="Deaths"
                cases={
                  windowWidth < 770
                    ? prettyNumber(selectedStateInfo.deaths)
                    : selectedStateInfo.deaths
                }
              />
            </div>
            <CircleMap
              isDark={darkMode}
              center={mapCenter}
              casesType={casesType}
              mapData={states}
            />
          </div>
          <div className="app_left">
            <Charts isDark={darkMode} data={data.cases_time_series} />
          </div>
        </div>
        <div className="stateinfotable">
          <StateInfoTable states={states} isDark={darkMode} />
        </div>
      </div>
    </div>
  );
}

export default App;
