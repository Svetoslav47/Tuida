import React from 'react';
import { useNavigate } from 'react-router-dom';
import LocationMap from '../components/LocationMap';
import InteractiveMap from '../components/InteractiveMap';

const Houses: React.FC = () => {
  const nearbyLocations = [{
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

  const markers = [{
    lat: 43.16071268761977,
    lng: 27.932502927771097
  }];
  const navigate = useNavigate();

  return (
    <div className="px-6 md:px-12 lg:px-16 py-6 h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-light mb-8">Къщите</h1>
        <p className="text-gray-600 max-w-2xl mb-12">
          Разгледайте нашите къщи на интерактивната карта. Кликнете върху всяка къща, за да видите подробна информация за нея.
        </p>
        <InteractiveMap onHouseClick={(houseId) => {
          navigate(`/${houseId}`)
        }} />
        <LocationMap locations={nearbyLocations} markers={markers} />
      </div>
    </div>
  );
};
export default Houses; 