import React from 'react';
const ContactForm: React.FC = () => {
  return <div className="w-full my-8 sm:my-16">
      <h3 className="text-lg sm:text-xl font-light mb-6 sm:mb-8">Свържи се с нас</h3>
      
      {/* Явлена Logo */}
      <div className="mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4">
        <img 
          src="/logoTuida.png" 
          alt="Явлена Logo" 
          className="h-10 sm:h-12 w-auto opacity-80"
        />
        <div>
          <h4 className="text-base sm:text-lg font-medium">Явлена</h4>
          <p className="text-xs sm:text-sm text-gray-600">Официален партньор</p>
        </div>
      </div>
      <form className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label htmlFor="name" className="block text-sm text-gray-600 mb-1">
              Name
            </label>
            <input type="text" id="name" className="w-full border-b border-gray-300 py-2 focus:border-black focus:outline-none transition-colors text-sm sm:text-base" placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
              Email
            </label>
            <input type="email" id="email" className="w-full border-b border-gray-300 py-2 focus:border-black focus:outline-none transition-colors text-sm sm:text-base" placeholder="Your email" />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm text-gray-600 mb-1">
            Message
          </label>
          <textarea id="message" rows={4} className="w-full border-b border-gray-300 py-2 focus:border-black focus:outline-none transition-colors text-sm sm:text-base" placeholder="Your message"></textarea>
        </div>
        <button type="submit" className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-black text-white text-sm hover:bg-gray-800 transition-colors">
          Send Message
        </button>
      </form>
      <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <div>
          <h4 className="text-sm font-medium mb-1 sm:mb-2">Email</h4>
          <p className="text-sm sm:text-base text-gray-600">sales@tuida.life</p>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-1 sm:mb-2">Phone</h4>
          <p className="text-sm sm:text-base text-gray-600">+359 89 251 7200</p>
        </div>
        <div className="sm:col-span-2 md:col-span-1">
          <h4 className="text-sm font-medium mb-1 sm:mb-2">Address</h4>
          <p className="text-sm sm:text-base text-gray-600">
            ул. Братя Миладинови 27, офис Явлена
          </p>
        </div>
      </div>
    </div>;
};
export default ContactForm;