import React from 'react'
interface FloorPlanProps {
  image: string
  className?: string
}
const FloorPlan: React.FC<FloorPlanProps> = ({ image, className }) => {
  return (
    <div className={`w-full border border-gray-200 ${className || ''}`}>
      <div className="relative overflow-hidden h-full">
        <img
          src={image}
          alt="Floor Plan"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  )
}
export default FloorPlan
