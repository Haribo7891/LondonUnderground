const fs = require("fs");

function nextStation(data, name) {
  return (data[name] && data[name].neighbours) || [];
}

function readFile(filename) {
  return new Promise((resolve, reject) => {
    const prefix = "Line: ";
    fs.readFile(filename, (err, buffer) => {
      if (err) {
        return reject(err);
      }

      const lines = {};
      const stations = {};

      const data = buffer.toString().split("\n");
      let currentRailLine;

      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        if (row.includes(prefix)) {
          currentRailLine = row.substr(prefix.length);
          lines[currentRailLine] = [];
        } else if (row.length > 0) {
          const stationName = row.trim();
          if (stations[stationName]) {
            stations[stationName].line.push(currentRailLine);
          } else {
            stations[stationName] = {
              neighbours: [],
              line: [currentRailLine],
            };
          }
          lines[currentRailLine].push(stationName);
        }
      }

      const stationArrayArray = Object.values(lines);
      for (let i = 0; i < stationArrayArray.length; i++) {
        const stationArray = stationArrayArray[i];
        let lastStation;
        let nextStation;
        let lastStationName;
        let nextStationName;

        for (let j = 0; j < stationArray.length; j++) {
          const stationName = stationArray[j];
          lastStation = nextStation;
          nextStation = stations[stationName];
          lastStationName = nextStationName;
          nextStationName = stationName;

          if (lastStation) {
            lastStation.neighbours.push(nextStationName);
            nextStation.neighbours.push(lastStationName);
          }
        }
      }

      resolve({ stations, lines });
    });
  });
}

module.exports = { nextStation, readFile };
