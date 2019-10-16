const index = require("./index");

const data = {
  "Station 1": {
    neighbours: ["Station 2", "Station 3"],
    line: ["Harry Line"],
  },
  "Station 2": {
    neighbours: ["Station 1"],
    line: ["Harry Line"],
  },
  "Station 3": {
    neighbours: ["Station 1"],
    line: ["Harry Line"],
  },
};

describe("One stop stations", () => {
  test("Given 3 stations when requesting 1 then get a array of 2", () =>
    expect(index.nextStation(data, "Station 1").length).toBe(2));

  test("Given 3 stations when requesting the end then get a array of 1", () =>
    expect(index.nextStation(data, "Station 2").length).toBe(1));

  test("Given 3 stations when requesting an invalid station then get a array of 0", () =>
    expect(index.nextStation(data, "No STATION").length).toBe(0));
});

describe("Given all stations", () => {
  const promise = index.readFile("./StationsAndLines.txt");

  test("Given all data, get correct number of lines", async () =>
    expect(Object.keys((await promise).lines).length).toBe(12));

  test("Given Balham, get 2 neighbours", async () =>
    expect(index.nextStation((await promise).stations, "Balham").length).toBe(
      2
    ));
  test("Given Balham, get Clapham South and Tooting Bec as neighbours", async () =>
    expect(index.nextStation((await promise).stations, "Balham")).toStrictEqual(
      ["Tooting Bec", "Clapham South"]
    ));
});
