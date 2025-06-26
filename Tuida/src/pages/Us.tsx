import React from 'react';
import LocationMap from '../components/LocationMap';
import ContactForm from '../components/ContactForm';

const Us: React.FC = () => {
  // Sample data for LocationMap component
  const sampleLocations = [{
    name: 'Плаж Галата',
    distance: '500м',
    type: 'Luxary'
  }, {
    name: 'Градски Транспорт ',
    distance: '0m',
    type: 'Transport'
  }, {
    name: 'Летище Варна',
    distance: '20км',
    type: 'Transport'
  }];

  const sampleMarkers = [{
    lat: 43.16071268761977,
    lng: 27.932502927771097
  }];

  return (
    <div className="px-6 md:px-12 lg:px-16 py-6 h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <LocationMap locations={sampleLocations} markers={sampleMarkers} />
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Us;