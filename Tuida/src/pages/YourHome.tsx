import React from 'react';
import { Link } from 'react-router-dom';
import PhotoCard from '../components/PhotoCard';
import LocationMap from '../components/LocationMap';
import VideoPlayer from '../components/VideoPlayer';
const YourHome: React.FC = () => {
  const nearbyLocations = [{
    name: 'Central Park',
    distance: '0.5 miles',
    type: 'Park'
  }, {
    name: 'Metro Station',
    distance: '0.3 miles',
    type: 'Transport'
  }, {
    name: 'Grocery Store',
    distance: '0.2 miles',
    type: 'Shopping'
  }, {
    name: 'Elementary School',
    distance: '0.7 miles',
    type: 'Education'
  }, {
    name: 'Medical Center',
    distance: '1.2 miles',
    type: 'Healthcare'
  }, {
    name: 'Shopping Mall',
    distance: '1.5 miles',
    type: 'Shopping'
  }];

  const markers = [{
    lat: 43.16358815508278,
    lng: 27.934571646944118
  }];

  return <div className="px-6 md:px-12 lg:px-16 py-6 h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-light mb-6">Your Home</h1>
          <Link to="/home"> Home </Link>
        <PhotoCard image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" title="Modern Living Spaces" description="Designed with simplicity and functionality in mind, our living spaces maximize natural light and create a seamless connection between indoor and outdoor environments. Each residence features open floor plans, premium materials, and thoughtful details that elevate everyday living. The architectural design emphasizes clean lines and uncluttered spaces, creating homes that are both visually striking and incredibly comfortable." />
        <VideoPlayer videoUrl="https://static.videezy.com/system/resources/previews/000/021/804/original/modern-house-time-lapse.mp4" title="Experience Tuida" description="Take a journey through our thoughtfully designed spaces and experience the harmony of modern architecture and natural elements." />
        <PhotoCard image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" title="Premium Interiors" description="Each residence is finished with premium materials selected for both beauty and durability. The kitchens feature custom cabinetry, stone countertops, and professional-grade appliances. Bathrooms are designed as personal sanctuaries with luxurious fixtures and thoughtful lighting. Throughout the homes, floor-to-ceiling windows frame stunning views while bringing abundant natural light into every corner." position="left" />
        <PhotoCard image="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" title="Community Spaces" description="Our complex features thoughtfully designed community spaces that encourage connection while respecting privacy. The landscaped courtyard provides a tranquil outdoor retreat, while the rooftop terrace offers panoramic views and entertainment areas. Additional amenities include a fitness center, co-working space, and secured parking facilities. Every detail has been considered to create a living experience that is both luxurious and practical." />
        <LocationMap locations={nearbyLocations} markers={markers} />
      </div>
    </div>;
};
export default YourHome;