import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import VideoPlayer from '../components/VideoPlayer';

interface ProgressImage {
  id: number;
  image: string;
  title: string;
}

const Progress: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ProgressImage | null>(null);
  const [mounted, setMounted] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const progressImages: ProgressImage[] = [
    {
      id: 1,
      image: '/oct25-1.jpg',
      title: 'Строителен прогрес - Октомври 2025',
    },
    {
      id: 2,
      image: '/oct25-2.jpg',
      title: 'Строителен прогрес - Октомври 2025',
    },
    {
      id: 3,
      image: '/oct25-3.jpg',
      title: 'Строителен прогрес - Октомври 2025',
    },
    {
      id: 4,
      image: '/oct25-4.jpg',
      title: 'Строителен прогрес - Октомври 2025',
    },
    {
      id: 5,
      image: '/oct25-5.jpg',
      title: 'Строителен прогрес - Октомври 2025',
    },
  ];

  const handleImageClick = (item: ProgressImage) => {
    setSelectedImage(item);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const goToNext = () => {
    if (!selectedImage) return;
    const currentIndex = progressImages.findIndex(item => item.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % progressImages.length;
    setSelectedImage(progressImages[nextIndex]);
  };

  const goToPrevious = () => {
    if (!selectedImage) return;
    const currentIndex = progressImages.findIndex(item => item.id === selectedImage.id);
    const previousIndex = currentIndex === 0 ? progressImages.length - 1 : currentIndex - 1;
    setSelectedImage(progressImages[previousIndex]);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!selectedImage) return;
    
    switch (e.key) {
      case 'Escape':
        closeModal();
        break;
      case 'ArrowRight':
        goToNext();
        break;
      case 'ArrowLeft':
        goToPrevious();
        break;
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }
  };

  useEffect(() => {
    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedImage]);

  const ModalPortal = () => {
    if (!mounted || !selectedImage) return null;

    return createPortal(
      <div 
        ref={modalRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}
        onClick={closeModal}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '50px',
            height: '50px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            zIndex: 1000
          }}
          className="hover:bg-black/80 transition-colors"
        >
          ‹
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '50px',
            height: '50px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            zIndex: 1000
          }}
          className="hover:bg-black/80 transition-colors"
        >
          ›
        </button>

        <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
          <button
            onClick={closeModal}
            style={{
              position: 'absolute',
              top: '-50px',
              right: '0px',
              width: '40px',
              height: '40px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              zIndex: 1000
            }}
            className="hover:bg-black/80 transition-colors"
          >
            ✕
          </button>
          
          <img
            src={selectedImage.image}
            alt={selectedImage.title}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain'
            }}
            onClick={(e) => e.stopPropagation()}
          />

          <div
            style={{
              position: 'absolute',
              bottom: '-60px',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              color: 'white',
              zIndex: 1000
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: '300', margin: '0 0 4px 0' }}>
              {selectedImage.title}
            </h3>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-16 py-4 sm:py-6 h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-light mb-4 sm:mb-8">Прогрес</h1>

        <VideoPlayer videoUrl="/videoMain.mp4" title="ТУИДА - Строителен прогрес" description="Следете развитието на нашия жилищен комплекс от началото до завършването. Вижте как внимателно планираните етапи на строителството се превръщат в модерни жилищни пространства." />
        
        <div className="mt-8 sm:mt-12">
          <h2 className="text-xl sm:text-2xl font-light mb-6 sm:mb-8">Снимки от строителството</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {progressImages.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden opacity-0 animate-[fadeIn_0.8s_ease-out_forwards] cursor-pointer"
                style={{
                  animationDelay: `${item.id * 0.1}s`,
                }}
                onClick={() => handleImageClick(item)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-light">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ModalPortal />
    </div>
  );
};
export default Progress;