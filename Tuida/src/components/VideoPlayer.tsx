import React, { useRef, useState, useEffect } from 'react';
interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  description?: string;
}
const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  title,
  description
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return <div className="w-full my-12 sm:my-16 md:my-24">
      <div className="w-full aspect-video bg-black overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          controls={!isMobile}
          playsInline
          autoPlay={true}
          muted={true}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      {(title || description) && <div className="mt-4 sm:mt-6 md:mt-8">
          <h3 className="text-lg sm:text-xl font-light mb-3 sm:mb-4 opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]">
            {title}
          </h3>
          {description && <p className="text-sm sm:text-base text-gray-600 leading-relaxed opacity-0 animate-[fadeIn_0.8s_ease-out_0.2s_forwards]">
              {description}
            </p>}
        </div>}
    </div>;
};
export default VideoPlayer;