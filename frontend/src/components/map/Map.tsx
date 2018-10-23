import * as React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

export const MyMapComponent = withScriptjs(withGoogleMap((props: any) => {

  const personsMarkers = props.persons.map((p: any) => {
    return (<Marker
      key={Math.random().toString(36).substr(2, 9)}
      options={
        {
          icon: {
              path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
              scale: 6,
              fillColor: 'red',
              fillOpacity: 0.8,
              strokeWeight: 2,
              rotation: p.direction,
          },
          position: {
            lat: p.location.lat,
            lng: p.location.lng
          },
          label: {
              text: p.name,
              color: "#eb3a44",
              fontSize: "16px",
              fontWeight: "bold",
          },
        }
      }
      />)
  });
    return (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 51.509865, lng: -0.118092 }}
      >
        { personsMarkers }
      </GoogleMap>
    );
  }
));