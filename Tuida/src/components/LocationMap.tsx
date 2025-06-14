import React from 'react';
import { MapPinIcon } from 'lucide-react';
interface LocationItem {
  name: string;
  distance: string;
  type: string;
}
interface LocationMapProps {
  locations: LocationItem[];
}
const LocationMap: React.FC<LocationMapProps> = ({
  locations
}) => {
  return <div className="w-full my-16">
      <h3 className="text-xl font-light mb-8">Location & Nearby</h3>
      <div className="w-full aspect-[16/9] bg-gray-100 mb-8 flex items-center justify-center">
        <div className="text-center">
          <MapPinIcon className="mx-auto mb-2" size={24} />
          <p className="text-sm text-gray-500">
            Interactive map will be displayed here
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location, index) => <div key={index} className="border-t pt-4">
            <p className="font-light">{location.name}</p>
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>{location.type}</span>
              <span>{location.distance}</span>
            </div>
          </div>)}
      </div>
    </div>;
};
export default LocationMap;