import React, { useState, useEffect } from 'react';
import LocationMap from '../components/LocationMap';

interface NearbyLocation {
  id: number;
  name: string;
  distance: string;
  type: string;
  description: string;
}

const Location: React.FC = () => {
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
    lat: 43.160741,
    lng: 27.932247
  }];

  return (
    <div className="px-6 md:px-12 lg:px-16 py-6 h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-light mb-8">Локация</h1>

        {/* Location Image and Description */}
        <div className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src="/houseOutsideView2.jpg"
                alt="ТУИДА - Локация"
                className="w-full h-64 lg:h-80 object-cover shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-xl font-light mb-4">Идеална локация</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Комплекс ТУИДА се намира в една от най-привлекателните и спокойни зони на кв. Галата, граничеща с природен парк – място, което предлага рядко срещан баланс между тишина, природа и удобства. Локацията осигурява директен достъп до градски транспорт, а само на 100 метра се намират хранителен магазин и детска площадка. Плаж Галата е на пешеходно разстояние – само на  500 метра.
                Близостта до природния парк създава отлични възможности за разходки, спорт и почивка сред зеленина – перфектна среда за хора и семейства, които ценят спокойствието, активния начин на живот и непосредствения досег с природата.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Природният парк, с който граничим, предлага идеални условия за отдих, разходки и спортуване,
                създавайки перфектна среда за семейства, които ценят качеството на живота и близостта до природата.
              </p>
            </div>
          </div>
        </div>

        {/* Google Maps and Nearby Locations */}
        <LocationMap locations={nearbyLocations} markers={markers} />
      </div>
    </div>
  );
};

export default Location; 