import React from 'react';
// import PhotoCard from '../components/PhotoCard';
import VideoPlayer from '../components/VideoPlayer';

const Progress: React.FC = () => {
  return <div className="px-4 sm:px-6 md:px-12 lg:px-16 py-4 sm:py-6 h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-light mb-4 sm:mb-8">Прогрес</h1>

        <VideoPlayer videoUrl="/video.mp4" title="ТУИДА - Строителен прогрес" description="Следете развитието на нашия жилищен комплекс от началото до завършването. Вижте как внимателно планираните етапи на строителството се превръщат в модерни жилищни пространства." />
        </div>
    </div>;
};
export default Progress;