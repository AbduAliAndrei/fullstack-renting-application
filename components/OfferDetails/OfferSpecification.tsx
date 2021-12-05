import Typography from "@mui/material/Typography";
import React from "react";
import Button from "@material-ui/core/Button";
import People from "@material-ui/icons/People";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
const containerStyle = {
  width: "600px",
  height: "600px",
  borderRadius: "20px",
};

const center = {
  lat: 47.49,
  lng: 19.04,
};

export default function OfferSpecification() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBTqXQw52_-bPDsCtJnOzoYAVSWzcNpu9Y",
  });

  const [, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  return (
    <div className="OfferSpecification">
      <div className="specification">
        <div className="detailsHeader">
          <div className="location">
            <Typography
              className="locationH1"
              color="black"
              variant="h5"
              component="h5"
            >
              Blaha utca 92, Budapest
            </Typography>
          </div>
          <div className="studentFriendly">
            <Button
              className="studentFriendlyContainer"
              startIcon={<People />}
              variant="contained"
              color="primary"
            >
              Student choice
            </Button>
          </div>
        </div>
        <div className="mainDetails">
          <div className="location-features">
            <div className="location-flatInfo">
              <div className="flatInfo">
                <div className="size">Size: 25 sq/m</div>
                <div className="bedRoom">Bedroom(s): 2</div>
                <div className="kitchen">kitchen</div>
                <div className="bathrooms">bathroom(s): 2</div>
              </div>
            </div>
            <div className="locationAdvantages">
              <div className="universities">
                <div className="uniTitle">Universities</div>
                <div className="university">
                  <div className="icon-uniName">
                    <People />
                    <div className="uniName">ELTE</div>
                  </div>
                  <div className="distance">0.2 km</div>
                </div>
                <div className="university">
                  <div className="icon-uniName">
                    <People />
                    <div className="uniName">BME</div>
                  </div>
                  <div className="distance">2 km</div>
                </div>
              </div>
              <div className="transportations">
                <div className="transportationType">Tram</div>
                <div className="transportation">
                  <div className="icon-transportationName">
                    <People />
                    <div className="transportationName">1</div>
                  </div>
                  <div className="distance">2 km</div>
                </div>
                <div className="transportation">
                  <div className="icon-transportationName">
                    <People />
                    <div className="transportationName">4/6</div>
                  </div>
                  <div className="distance">1 km</div>
                </div>
              </div>
            </div>
          </div>
          <div className="offerFeatures">
            <div className="subTitle">
              <Typography
                className="featuresH4"
                color="black"
                variant="h5"
                component="h5"
              >
                Features
              </Typography>
            </div>
            <div className="featuresList">
              <ul>
                <li>best property</li>
                <li>best property</li>
                <li>best property</li>
              </ul>
              <ul>
                <li>best property</li>
                <li>best property</li>
                <li>best property</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="map">
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <></>
          </GoogleMap>
        )}
      </div>
    </div>
  );
}
