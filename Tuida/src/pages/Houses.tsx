import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LocationMap from '../components/LocationMap';
import InteractiveMap from '../components/InteractiveMap';

interface NearbyLocation {
  id: number;
  name: string;
  distance: string;
  type: string;
  description: string;
}

const Houses: React.FC = () => {
  const [nearbyLocations, setNearbyLocations] = useState<NearbyLocation[]>([]);

  useEffect(() => {
    const fetchNearbyLocations = async () => {
      try {
        const response = await fetch('/nearbyLocations.json');
        const data: NearbyLocation[] = await response.json();
        setNearbyLocations(data);
      } catch (error) {
        console.error('Error loading nearby locations:', error);
        setNearbyLocations([]);
      }
    };

    fetchNearbyLocations();
  }, []);
  const markers = [{
    lat: 43.16071268761977,
    lng: 27.932502927771097
  }];
  const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-16 py-4 sm:py-6 h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-light mb-4 sm:mb-8">Къщите</h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mb-8 sm:mb-12">
          <span className="hidden sm:inline">Разгледайте нашите къщи на интерактивната карта. Кликнете върху всяка къща, за да видите подробна информация за нея.</span>
          <span className="sm:hidden">Разгледайте списъка с нашите къщи. Кликнете върху всяка къща, за да видите подробна информация за нея.</span>
        </p>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mb-8 sm:mb-12">
          Не се дължи комисионно възнаграждение при закупуване на къща в комплекса.
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