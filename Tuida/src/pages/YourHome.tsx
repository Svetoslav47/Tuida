import React from 'react';
import PhotoCard from '../components/PhotoCard';
import FeatureHighlights from '../components/FeatureHighlights';
import { FaHome, FaLeaf, FaUsers } from 'react-icons/fa';


const YourHome: React.FC = () => {
  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-16 py-4 sm:py-6 h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="relative w-full h-[60vh] sm:h-[70vh] mb-8 sm:mb-16 overflow-hidden">
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
          
          {/* Top content overlay */}
          <div className="absolute top-0 left-0 right-0 flex flex-col items-center text-white text-center px-4 sm:px-8 pt-8 sm:pt-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-1 sm:mb-2 tracking-wide">
              ТУИДА ХОУМС
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-light max-w-2xl sm:max-w-3xl leading-relaxed tracking-widest">
              Твоят дом сред природата
            </p>
          </div>
          
          {/* Bottom content overlay */}
          <div className="absolute bottom-0 left-0 right-0 hidden sm:flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center text-white text-center px-4 sm:px-8 pb-4 sm:pb-6">
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

        {/* Complex Overview Section */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-4 sm:mb-6">
              Твоят дом
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-justify">
              TUIDA HOMES е бутиков комплекс, който впечатлява с внимателно подбрана локация и
              безкомпромисно строителство, изпълнено с внимание към всеки детайл. Разположен върху
              терен от 8895 кв.м., проектът включва 18 двуетажни къщи, позиционирани така че да се
              гарантират панорамни гледки от всяка една къща към заобикалящата живописна среда и
              Черното ни море.
              Открийте перфектния баланс между модерния комфорт и природната красота. 
              Нашият комплекс предлага внимателно проектирани жилищни пространства, 
              които създават идеалната среда за вашия начин на живот.
            </p>
          </div>
        </div>
        {/* Main Content */}
        <PhotoCard 
          image="/houseOutsideView2.jpg" 
          title="Модерни жилищни пространства" 
          description="Създадени с акцент върху простотата и функционалността, нашите жилищни пространства осигуряват максимално естествено осветление и постигат безпроблемна връзка между вътрешната и външната среда. Всяка резиденция се отличава с просторни етажни планове, висококачествени материали и внимателно подбрани детайли, които издигат ежедневието на ново ниво. Всеки дом ще разполага с уединението на самостоятелен двор и удобството на две паркоместа." 
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
          description="Нашият комплекс предлага внимателно проектирани общи пространства, които насърчават свързването, същевременно зачитайки личното пространство. Допълнителните удобства включват места за паркиране и спокойни алеи за придвижване. Комплексът ще разполага със собствен водоизточник (сондаж за студена вода), който ще
гарантира водната поддръжката на зелените площи. Позиционирането на сградите в
проекта гарантира панорамни гледки от всяка една къща към заобикалящата живописна
среда и Черното ни море. " 
        />
        
        <FeatureHighlights />
      </div>
    </div>
  );
};
export default YourHome;