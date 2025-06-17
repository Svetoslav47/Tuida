import React, { useEffect, useRef, useState } from 'react';
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
  const [shouldAutoplay, setShouldAutoplay] = useState(false);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;
    let hasPlayed = false;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed) {
          setShouldAutoplay(true);
          hasPlayed = true;
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <div className="w-full my-24">
      <div className="w-full aspect-video bg-black overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          controls
          playsInline
          autoPlay={shouldAutoplay}
          muted={shouldAutoplay}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      {(title || description) && <div className="mt-6 md:mt-8">
          <h3 className="text-xl font-light mb-4 opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]">
            {title}
          </h3>
          {description && <p className="text-gray-600 leading-relaxed opacity-0 animate-[fadeIn_0.8s_ease-out_0.2s_forwards]">
              {description}
            </p>}
        </div>}
    </div>;
};
export default VideoPlayer;