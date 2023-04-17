// import React, { useState } from 'react';
// import GoogleMapReact from 'google-map-react';
// import Marker from 'google-map-react';

// const Map = ({ onChange }) => {
//   const [position, setPosition] = useState({ lat: -23.5505, lng: -46.6333 });
//   const apiKey = process.env.KEY;

//   return (
//     <div style={{ height: '400px', width: '100%' }}>
//     <GoogleMapReact
//       bootstrapURLKeys={{ key: apiKey }}
//       center={position}
//       onClick={(event) => {
//         const lat = event.lat;
//         const lng = event.lng;
//         setPosition({ lat, lng });
//         onChange({ lat, lng });}
//       }
//       defaultZoom={12}
//       defaultCenter={{ lat: -23.5505, lng: -46.6333 }}
//     >
//       {position && (
//         <Marker position={position} />
//       )}
//     </GoogleMapReact>
//     </div>
//   );
// };

// export default Map;

import React, { useState } from 'react';
import GoogleMapReact, { AnyReactComponent } from 'google-map-react';
import styled from 'styled-components';

const Map = ({ onChange }) => {
  const [center, setCenter] = useState({ lat: -23.5505, lng: -46.6333 });

  const handleMapClick = (event) => {
    setCenter({ lat: event.lat, lng: event.lng });
    onChange({ lat: event.lat, lng: event.lng });
  };

  const handleBoundsChange = (event) => {
    setCenter(event);
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_KEY }}
        center={center}
        zoom={14}
        onClick={handleMapClick}
        options={options}
        //onBoundsChange={handleBoundsChange}
      >
        <MarkerWrapper lat={center.lat} lng={center.lng} />
      </GoogleMapReact>
    </div>
  );
};

const MarkerF = styled.div`
  width: 30px;
  height: 30px;
  align-self: center;
  border-radius: 5px;
  background-image: url('https://www.iconpacks.net/icons/1/free-pin-icon-48-thumb.png');
  background-size: cover;
`;

const AnyReactComponentWrapper = styled.div`
  position: absolute;
  top: -15px;
  left: -15px;
`;

const MarkerWrapper = () => (
  <AnyReactComponentWrapper>
    <MarkerF />
  </AnyReactComponentWrapper>
);

const options = {
  gestureHandling: "greedy",
};

export default Map;

// import React, { useMemo } from "react";
// import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

// const Map = ({ onChange }) => {
//   const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: process.env.KEY,
//   });

//   if (!isLoaded) return <div>Loading...</div>;

//   return (
//     <div style={{ height: '400px', width: '100%' }}>
//     <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
//       <MarkerF position={center} />
//     </GoogleMap>
//     </div>
//   );
// }

// export default Map;