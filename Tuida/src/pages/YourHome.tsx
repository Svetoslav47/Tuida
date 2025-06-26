import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PhotoCard from '../components/PhotoCard';
import LocationMap from '../components/LocationMap';
import VideoPlayer from '../components/VideoPlayer';
import InteractiveMap from '../components/InteractiveMap';
const YourHome: React.FC = () => {
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


  return <div className="px-6 md:px-12 lg:px-16 py-6 h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-light mb-6">Твоят дом</h1>
        <PhotoCard image="/houseOutsideView2.jpg" title="Модерни жилищни пространства" description="Създадени с акцент върху простотата и функционалността, нашите жилищни пространства осигуряват максимално естествено осветление и постигат безпроблемна връзка между вътрешната и външната среда. Всяка резиденция се отличава с просторни етажни планове, висококачествени материали и внимателно подбрани детайли, които издигат ежедневието на ново ниво. Архитектурният дизайн набляга на изчистени линии и освободени от излишни елементи пространства, превръщайки домовете във визуално впечатляващи и изключително комфортни убежища." />
        <VideoPlayer videoUrl="/video.mp4" title="Experience Tuida" description="Take a journey through our thoughtfully designed spaces and experience the harmony of modern architecture and natural elements." />
        <PhotoCard image="/houseOutsideView1.jpg" title="Вътрешни пространства" description="Нашите двуетажни къщи предлагат просторни интериори, които умело разделят зоните за отдих и развлечения от личните пространства. Всеки етаж е оптимизиран за максимален комфорт и функционалност. Обмисленото разпределение на стаите гарантира уединение и спокойствие на горния етаж, докато първият етаж е идеален за социални събирания и семейни дейности, създавайки идеалния баланс за модерен начин на живот." position="left" />
        <PhotoCard image="/housePageBanner.jpg" title="Общи пространства" description="Нашият комплекс предлага внимателно проектирани общи пространства, които насърчават свързването, същевременно зачитайки личното пространство. Озелененият двор осигурява спокойно място за отдих на открито, докато покривната тераса предлага панорамни гледки. Допълнителните удобства включват места за паркиране и спокойни алеи за придвижване. Всеки детайл е обмислен, за да създаде жилищно преживяване, което е едновременно луксозно и практично." />
        <InteractiveMap onHouseClick={(houseId) => {
          navigate(`/${houseId}`)
        }} />
        <LocationMap locations={nearbyLocations} markers={markers} />
      </div>
    </div>;
};
export default YourHome;