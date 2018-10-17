import * as React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

export const MyMapComponent = withScriptjs(withGoogleMap((props: any) => {
  const personsMarkers = props.persons.map((p: any) => {
    return (<Marker key={Math.random().toString(36).substr(2, 9)} position={{ lat: p.location.lat, lng: p.location.lng }} />)
  });
  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
      { personsMarkers }
    </GoogleMap>
  );
));