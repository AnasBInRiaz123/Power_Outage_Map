import React from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, DirectionsRenderer } from '@react-google-maps/api';


// typescript
const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: -3.742,
  lng: -38.523
};

const points = [
  {
    lat: -3.741,
    lng: -38.523
  },
  {
    lat: -3.742,
    lng: -38.573
  },
  {
    lat: -3.755,
    lng: -38.583
  },
  {
    lat: -3.745,
    lng: -38.623
  }
];

function MyComponent() {
  const [map, setMap] = React.useState(null);
  const [direction, setDirection] = React.useState(null);// typescript


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyC4plJSZfKjf_ABzsmQmfBj3wLAeO8DuDs"
  });

  const calculateDirection = async () => {
    if (isLoaded && points.length > 1) {
      const directioService = new window.google.maps.DirectionsService

      const wayPoints = points.map((point) => ({
        location: { lat: point.lat, lng: point.lng }
      }))
      const req = {
        origin: wayPoints[0].location,
        destination: wayPoints[wayPoints.length - 1].location,
        wayPoints: wayPoints.slice(1, -1),
        travelMode: window.google.maps.TravelMode.WALKING
      }
      const res = await directioService.route(req)
      if (res.status === "ok") {
        setDirection(res)
      }
    }
  }

  React.useEffect(() => {
    calculateDirection()
  }, [isLoaded])


  return isLoaded ? (


    <>

      <div style={{
        backgroundColor: "red",
        paddingTop: "10px", paddingBottom: "10px", textAlign: "center"
      }}>
        <h1 style={{ color: "white" }}>
          Power Outage Map
        </h1>
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={(map) => setMap(map)}
      >
        {points.map((point, index) => (
          <MarkerF key={index} position={point} />
        ))}

        {
          direction && (
            <DirectionsRenderer directions={direction} />
          )
        }
      </GoogleMap>
    </>
  ) : <></>;
}

export default React.memo(MyComponent);
