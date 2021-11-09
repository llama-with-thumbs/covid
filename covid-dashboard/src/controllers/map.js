export let mymap = L.map("map");

export default function drawMap(filter) {
  mymap.setView([50, 10], 5);

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmFkaW5la2hpcyIsImEiOiJja2loZGticTMwNzJxMnltbGRsdzRqZmw0In0.E8fOw826aYb03PGElEtyYQ",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken: "your.mapbox.access.token",
    }
  ).addTo(mymap);

  let data = null;

  async function getData() {
    const url = `https://corona.lmao.ninja/v2/countries`;
    const res = await fetch(url);
    data = await res.json();

    const hasData = Array.isArray(data) && data.length > 0;

    if (!hasData) return;

    const geoJson = {
      type: "FeatureCollection",
      features: data.map((country = {}) => {
        const { countryInfo = {} } = country;
        const { lat, long: lng } = countryInfo;

        var km = Math.log2(country.cases) * 2 + country.cases / 30000;
        var points = 64;
        var coords = {
          latitude: lat,
          longitude: lng,
        };
        var ret = [];
        var distanceX =
          km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
        var distanceY = km / 110.574;
        var theta, x, y;
        for (var i = 0; i < points; i++) {
          theta = (i / points) * (2 * Math.PI);
          x = distanceX * Math.cos(theta);
          y = distanceY * Math.sin(theta);
          ret.push([coords.longitude + x, coords.latitude + y]);
        }
        ret.push(ret[0]);

        return {
          type: "Feature",
          properties: {
            ...country,
          },
          geometry: {
            type: "Polygon",
            coordinates: [ret],
          },
        };
      }),
    };

    const geoJsonLayers = new L.GeoJSON(geoJson);

    geoJsonLayers.addTo(mymap);
  }
  getData();
}
