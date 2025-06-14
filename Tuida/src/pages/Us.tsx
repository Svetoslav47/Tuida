import React from 'react';
import PhotoCard from '../components/PhotoCard';
import ContactForm from '../components/ContactForm';
const Us: React.FC = () => {
  return <div className="px-6 md:px-12 lg:px-16 py-6 h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <PhotoCard image="https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" title="Our Philosophy" description="At Tuida, we believe architecture should enhance daily life through thoughtful design that connects people with their environment. Our approach centers on three core principles: sustainability, functionality, and aesthetic harmony. Each project is an opportunity to create spaces that inspire while serving real human needs. We work closely with our clients to understand their vision and translate it into architectural reality." />
        <PhotoCard image="https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" title="Our Team" description="Our diverse team brings together expertise in architecture, interior design, urban planning, and sustainable building practices. Led by award-winning architect Sarah Chen, our studio cultivates creativity while maintaining rigorous attention to detail. We believe in collaborative design processes that incorporate multiple perspectives, resulting in richer, more thoughtful architectural solutions." position="left" />
        <PhotoCard image="https://images.unsplash.com/photo-1626885930974-4b69aa41ce63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" title="Our Approach" description="Every Tuida project begins with a deep understanding of the site, context, and client needs. We emphasize sustainable design practices, incorporating energy-efficient systems and environmentally responsible materials. Our iterative design process allows for refinement and adaptation as the project evolves. We believe in transparent communication throughout the process, ensuring our clients are engaged and informed at every stage." />
        <ContactForm />
      </div>
    </div>;
};
export default Us;