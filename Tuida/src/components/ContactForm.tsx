import React from 'react';
const ContactForm: React.FC = () => {
  return <div className="w-full my-16">
      <h3 className="text-xl font-light mb-8">Contact Us</h3>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm text-gray-600 mb-1">
              Name
            </label>
            <input type="text" id="name" className="w-full border-b border-gray-300 py-2 focus:border-black focus:outline-none transition-colors" placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
              Email
            </label>
            <input type="email" id="email" className="w-full border-b border-gray-300 py-2 focus:border-black focus:outline-none transition-colors" placeholder="Your email" />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm text-gray-600 mb-1">
            Message
          </label>
          <textarea id="message" rows={4} className="w-full border-b border-gray-300 py-2 focus:border-black focus:outline-none transition-colors" placeholder="Your message"></textarea>
        </div>
        <button type="submit" className="px-8 py-3 bg-black text-white text-sm hover:bg-gray-800 transition-colors">
          Send Message
        </button>
      </form>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="text-sm font-medium mb-2">Email</h4>
          <p className="text-gray-600">contact@tuida.com</p>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2">Phone</h4>
          <p className="text-gray-600">+1 (555) 123-4567</p>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2">Address</h4>
          <p className="text-gray-600">
            123 Architecture Blvd
            <br />
            Design District, CA 90210
          </p>
        </div>
      </div>
    </div>;
};
export default ContactForm;