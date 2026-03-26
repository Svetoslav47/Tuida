import React from 'react';
import ContactForm from '../components/ContactForm';

const Us: React.FC = () => {
  return (
    <div className="px-6 md:px-12 lg:px-16 py-6 h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-light mb-8">Контакти</h1>

        {/* Contact Form */}
        <ContactForm />
      </div>
    </div>
  );
};

export default Us;