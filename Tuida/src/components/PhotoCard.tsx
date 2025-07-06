import React from 'react';
import { usePopInOnScroll } from '../hooks/usePopInOnScroll';
interface PhotoCardProps {
  image: string;
  title: string;
  description: string;
  position?: 'left' | 'right';
}
const PhotoCard: React.FC<PhotoCardProps> = ({
  image,
  title,
  description,
  position = 'right'
}) => {
  const { ref, isVisible } = usePopInOnScroll();
  return <div ref={ref} className={`w-full flex flex-col md:flex-row my-12 sm:my-16 md:my-24 items-center ${isVisible ? 'pop-in' : 'pop-in-hidden'}`}>
      <div className={`w-full md:w-7/12 aspect-square relative overflow-hidden group ${position === 'left' ? 'md:order-2' : 'md:order-1'}`}>
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
      </div>
      <div className={`w-full md:w-5/12 p-4 sm:p-6 md:p-12 ${position === 'left' ? 'md:order-1 md:text-right' : 'md:order-2'}`}>
        <h3 className="text-lg sm:text-xl font-light mb-3 sm:mb-4 mt-4 sm:mt-6 md:mt-0">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>;
};
export default PhotoCard;