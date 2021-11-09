import GoogleMapReact from "google-map-react";
import { useStore } from "../../store/Store";

const MapWrapper = (props) => {
  const mapLocation = useStore((state) => state.mapLocation);
  const setMapLocation = useStore((state) => state.setMapLocation);

  const handleApiLoaded = (map, maps) => {
    console.log(map);
  };

  const handleClick = (obj) => {
    const lat = obj.center.lat;
    const lng = obj.center.lng;
    setMapLocation({ lat, lng });
  };

  return (
    <div style={{ height: "40vh" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDSL2vsqeRZS6CoQwTxQiUKcpK1O9N0wLY" }}
        defaultCenter={props.center}
        defaultZoom={props.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        // onClick={handleClick}
        onChange={handleClick}
      >
        {props.children}
      </GoogleMapReact>
    </div>
  );
};

export default MapWrapper;
