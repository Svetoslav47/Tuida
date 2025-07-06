import React, { useState, useEffect } from 'react';
import PhotoCard from '../components/PhotoCard';
import FeatureHighlights from '../components/FeatureHighlights';
import { FaHome, FaLeaf, FaUsers } from 'react-icons/fa';

interface House {
  id: number;
  name: string;
  house_area?: number;
  full_area?: number;
  price?: number | null;
  state: string;
  image: string;
  number_of_parking_spaces: number;
  number_of_bedrooms: number;
  vertices: Array<{ x: number; y: number }>;
}

const YourHome: React.FC = () => {
  const [totalArea, setTotalArea] = useState<number>(0);
  const [houseCount, setHouseCount] = useState<number>(0);

  useEffect(() => {
    const fetchHousesData = async () => {
      try {
        const response = await fetch('/houses.json');
        const houses: House[] = await response.json();
        
        // Calculate total area from all houses
        const total = houses.reduce((sum, house) => {
          return sum + (house.full_area || 0);
        }, 0);
        
        setTotalArea(total);
        setHouseCount(houses.length);
      } catch (error) {
        console.error('Error fetching houses data:', error);
        setTotalArea(0);
        setHouseCount(0);
      }
    };

    fetchHousesData();
  }, []);

  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-16 py-4 sm:py-6 h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="relative w-full h-[60vh] sm:h-[70vh] mb-8 sm:mb-16 overflow-hidden rounded-2xl">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          
          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4 sm:px-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 sm:mb-6 tracking-wide">
              ТУИДА HOMES
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-light mb-6 sm:mb-8 max-w-2xl sm:max-w-3xl leading-relaxed">
              Вашият дом сред природата
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
              <div className="flex items-center gap-2 text-sm sm:text-base">
                <FaHome className="text-xl sm:text-2xl" />
                <span>Модерни жилищни пространства</span>
              </div>
              <div className="flex items-center gap-2 text-sm sm:text-base">
                <FaLeaf className="text-xl sm:text-2xl" />
                <span>Хармония с природата</span>
              </div>
              <div className="flex items-center gap-2 text-sm sm:text-base">
                <FaUsers className="text-xl sm:text-2xl" />
                <span>Общностен дух</span>
              </div>
            </div>
          </div>
        </div>

        {/* Complex Overview Section */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-4 sm:mb-6">
              Вашият дом в ТУИДА HOMES
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
              Открийте перфектния баланс между модерния комфорт и природната красота. 
              Нашият комплекс предлага внимателно проектирани жилищни пространства, 
              които създават идеалната среда за вашия начин на живот.
            </p>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="bg-gray-50 p-6 sm:p-8 rounded-xl text-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{houseCount}</div>
              <div className="text-sm sm:text-base text-gray-700 font-medium">Къщи</div>
              <div className="text-xs text-gray-600 mt-1">В комплекса</div>
            </div>
            <div className="bg-gray-50 p-6 sm:p-8 rounded-xl text-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{Math.round(totalArea)}</div>
              <div className="text-sm sm:text-base text-gray-700 font-medium">Обща квадратура (м²)</div>
              <div className="text-xs text-gray-600 mt-1">На комплекса</div>
            </div>
            <div className="bg-gray-50 p-6 sm:p-8 rounded-xl text-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">100%</div>
              <div className="text-sm sm:text-base text-gray-700 font-medium">Качество</div>
              <div className="text-xs text-gray-600 mt-1">Гарантирано</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <PhotoCard 
          image="/houseOutsideView2.jpg" 
          title="Модерни жилищни пространства" 
          description="Създадени с акцент върху простотата и функционалността, нашите жилищни пространства осигуряват максимално естествено осветление и постигат безпроблемна връзка между вътрешната и външната среда. Всяка резиденция се отличава с просторни етажни планове, висококачествени материали и внимателно подбрани детайли, които издигат ежедневието на ново ниво." 
        />
        
        <PhotoCard 
          image="/houseOutsideView1.jpg" 
          title="Вътрешни пространства" 
          description="Нашите двуетажни къщи предлагат просторни интериори, които умело разделят зоните за отдих и развлечения от личните пространства. Всеки етаж е оптимизиран за максимален комфорт и функционалност. Обмисленото разпределение на стаите гарантира уединение и спокойствие на горния етаж, докато първият етаж е идеален за социални събирания и семейни дейности." 
          position="left" 
        />
        
        <PhotoCard 
          image="/housePageBanner.jpg" 
          title="Общи пространства" 
          description="Нашият комплекс предлага внимателно проектирани общи пространства, които насърчават свързването, същевременно зачитайки личното пространство. Озелененият двор осигурява спокойно място за отдих на открито, докато покривната тераса предлага панорамни гледки. Допълнителните удобства включват места за паркиране и спокойни алеи за придвижване." 
        />
        
        <FeatureHighlights />
      </div>
    </div>
  );
};
export default YourHome;