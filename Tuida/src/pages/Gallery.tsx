import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface GalleryItem {
  id: number
  image: string
  title: string
  category: string
}

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [mounted, setMounted] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      image: '/interactiveMap.jpg',
      title: 'Топ изглед',
      category: 'Комплекс',
    },
    {
      id: 2,
      image: '/housePageBanner.jpg', 
      title: 'Общи пространства',
      category: 'Екстериор',
    },
    {
      id: 3,
      image: '/type1-min.jpg',
      title: 'Къщи тип 1 и 2',
      category: 'Екстериор',
    },
    {
      id: 4,
      image: '/type2-min.jpg',
      title: 'Къща тип 4', 
      category: 'Екстериор',
    },
    {
      id: 5,
      image: '/k4.webp',
      title: 'Къща тип 4',
      category: 'Екстериор',
    },
    {
      id: 6,
      image: '/k2and2f.webp',
      title: 'Къща тип 2',
      category: 'Екстериор',
    },
    {
      id: 7,
      image: '/k3and3f.webp',
      title: 'Къща тип 3',
      category: 'Екстериор',
    },
    {
      id: 8,
      image: '/k1.webp',
      title: 'Къща тип 1',
      category: 'Екстериор',
    },
  ]

  const handleImageClick = (item: GalleryItem) => {
    console.log('Opening modal for:', item.title)
    setSelectedImage(item)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    console.log('Closing modal')
    setSelectedImage(null)
    document.body.style.overflow = 'unset'
  }

  const goToNext = () => {
    if (!selectedImage) return
    const currentIndex = galleryItems.findIndex(item => item.id === selectedImage.id)
    const nextIndex = (currentIndex + 1) % galleryItems.length
    setSelectedImage(galleryItems[nextIndex])
  }

  const goToPrevious = () => {
    if (!selectedImage) return
    const currentIndex = galleryItems.findIndex(item => item.id === selectedImage.id)
    const previousIndex = currentIndex === 0 ? galleryItems.length - 1 : currentIndex - 1
    setSelectedImage(galleryItems[previousIndex])
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!selectedImage) return
    
    switch (e.key) {
      case 'Escape':
        closeModal()
        break
      case 'ArrowRight':
        goToNext()
        break
      case 'ArrowLeft':
        goToPrevious()
        break
    }
  }

  // Touch handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      goToNext()
    }
    if (isRightSwipe) {
      goToPrevious()
    }
  }

  useEffect(() => {
    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedImage])

  const ModalPortal = () => {
    if (!mounted || !selectedImage) return null

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
        {/* Navigation Buttons */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            goToPrevious()
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
            e.stopPropagation()
            goToNext()
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
          {/* Close Button */}
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
          
          {/* Image */}
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

          {/* Image Info */}
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
            <p style={{ fontSize: '14px', opacity: 0.8, margin: 0 }}>
              {selectedImage.category}
            </p>
          </div>
        </div>
      </div>,
      document.body
    )
  }

  return (
    <div className="relative">
      <div className="px-6 md:px-12 lg:px-16 py-6 h-full overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-2xl font-light mb-8">Галерия</h2>
            <p className="text-gray-600 max-w-2xl">
              Разгледайте нашата колекция реалистични рендери на къщите. Всяко изображение представлява нашия ангажимент да създаваме
              пространства, които балансират естетика, функционалност и устойчиви
              принципи на проектиране и строителство.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {galleryItems.map((item) => (
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
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Render modal using portal */}
      <ModalPortal />
    </div>
  )
}
export default Gallery
