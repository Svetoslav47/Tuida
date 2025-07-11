import React from 'react';
import { MapPinIcon } from 'lucide-react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

interface LocationItem {
  name: string;
  distance: string;
  type: string;
}

interface MarkerItem {
  lat: number;
  lng: number;
}

interface LocationMapProps {
  locations: LocationItem[];
  markers: MarkerItem[];
}

const LocationMap: React.FC<LocationMapProps> = ({
  locations,
  markers
}) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '', // Set your API key in .env
  });

  // Create a custom SVG marker
  const createCustomMarker = () => {
    const svg = `
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="15" fill="white" stroke="black" stroke-width="1"/>
        <path d="M16 8L8 14V24H24V14L16 8Z" fill="black"/>
      </svg>
    `;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };

  const center = { lat: markers[0].lat + 0.005, lng: markers[0].lng - 0.007 }
  return <div className="w-full my-8 sm:my-16">
    <h3 className="text-lg sm:text-xl font-light mb-4 sm:mb-8">Локация и околности</h3>
    <div className="w-full aspect-[16/9] bg-gray-100 mb-6 sm:mb-8 flex items-center justify-center">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={center }
          zoom={14}
          mapTypeId={google.maps.MapTypeId.HYBRID}
        >
          {markers?.map((marker, idx) => (
            <Marker
              key={idx}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{
                url: createCustomMarker(),
                scaledSize: new google.maps.Size(42, 42),
                anchor: new google.maps.Point(16, 16)
              }}
            />
          ))}
        </GoogleMap>
      ) : (
        <div className="text-center">
          <MapPinIcon className="mx-auto mb-2" size={24} />
          <p className="text-sm text-gray-500">
            Loading map...
          </p>
        </div>
      )}
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {locations.map((location, index) => <div key={index} className="border-t pt-3 sm:pt-4">
        <div className="flex justify-between items-center">
          <p className="font-light text-sm sm:text-base">{location.name}</p>
          <span className="text-xs sm:text-sm text-gray-500">{location.distance}</span>
        </div>
      </div>)}
    </div>
  </div>;
};

export default LocationMap;