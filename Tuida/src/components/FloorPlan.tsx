import React from 'react'
interface FloorPlanProps {
  image: string
}
const FloorPlan: React.FC<FloorPlanProps> = ({ image }) => {
  return (
    <div className="w-full border border-gray-200">
      <div className="aspect-[16/9] relative overflow-hidden">
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
