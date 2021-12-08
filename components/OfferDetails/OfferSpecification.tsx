import Typography from "@mui/material/Typography";
import React from "react";
import Button from "@material-ui/core/Button";
import People from "@material-ui/icons/People";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { AdditionalInfo, GeneralInfo } from "../../interfaces/offer";
import Check from "@material-ui/icons/Check";
const containerStyle = {
  width: "600px",
  height: "600px",
  borderRadius: "20px",
};

const center = {
  lat: 47.49,
  lng: 19.04,
};

export default function OfferSpecification({
  generalInfo,
  additionalInfo,
}: {
  generalInfo: GeneralInfo;
  additionalInfo: AdditionalInfo;
}) {
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

  const getCheckColor = (isChecked: boolean) =>
    isChecked ? "#00EAD3" : "#000000";

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
              {generalInfo.address.streetName}{" "}
              {generalInfo.address.houseNumber + ", "}
              {generalInfo.address.city}
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
                {additionalInfo.rooms &&
                  additionalInfo.rooms.map((room, index) => (
                    <div key={index}>
                      <div className="size">Room {room.name}</div>
                      <div className="size">{room.area} sq/m</div>
                    </div>
                  ))}
                {/*<div className="bedRoom">Bedroom(s): 2</div>*/}
                {/*<div className="kitchen">kitchen</div>*/}
                {/*<div className="bathrooms">bathroom(s): 2</div>*/}
              </div>
            </div>
            <div className="locationAdvantages">
              {additionalInfo.environment.universities && (
                <>
                  <div className="uniTitle">Universities</div>
                  <div className="universities">
                    {Array.from(additionalInfo.environment.universities).map(
                      (university, index) => (
                        <div className="university" key={index}>
                          <div className="icon-uniName">
                            <People />
                            <div className="uniName">{university.name}</div>
                          </div>
                          <div className="distance">
                            {university.distanceTo} km
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </>
              )}
              {additionalInfo.environment.transport && (
                <>
                  <div className="transportationType">Tram</div>
                  <div className="transportations">
                    {Array.from(additionalInfo.environment.transport).map(
                      (transport, index) => (
                        <div className="transportation" key={index}>
                          <div className="icon-transportationName">
                            <People />
                            <div className="transportationName">
                              {transport.name}
                            </div>
                          </div>
                          <div className="distance">
                            {transport.distanceTo} km
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </>
              )}
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
                {additionalInfo.features &&
                  Object.keys(additionalInfo.features).map((i, index) => (
                    <div className="facility" key={index}>
                      <Check
                        style={{
                          color: getCheckColor(additionalInfo.features[i]),
                        }}
                      />
                      <span>{i}</span>
                    </div>
                  ))}
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
