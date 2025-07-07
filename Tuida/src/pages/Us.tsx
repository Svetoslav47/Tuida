import React from 'react';
import ContactForm from '../components/ContactForm';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const Us: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  });

  const center = {
    lat: 42.699644,
    lng: 23.317455
  };

  return (
    <div className="px-6 md:px-12 lg:px-16 py-6 h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-light mb-8">Контакти</h1>
        
        {/* Google Maps - Full Width */}
        <div className="w-full mb-12">
          <h3 className="text-xl font-light mb-8">Локация на офиса</h3>
          <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={center}
                zoom={17}
                mapTypeId={google.maps.MapTypeId.HYBRID}
              >
                <Marker position={center} />
              </GoogleMap>
            ) : (
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Loading map...
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Contact Form */}
        <ContactForm />
      </div>
    </div>
  );
};

export default Us;