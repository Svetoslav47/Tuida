import React from 'react';
const ContactForm: React.FC = () => {
  return <div className="w-full my-8 sm:my-16">
      <h3 className="text-lg sm:text-xl font-light mb-6 sm:mb-8">Свържи се с нас</h3>
      
      {/* Явлена Logo */}
      <div className="mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4">
        <img 
          src="/QvlenaLogo.jpg" 
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
              Име
            </label>
            <input type="text" id="name" className="w-full border-b border-gray-300 py-2 focus:border-black focus:outline-none transition-colors text-sm sm:text-base" placeholder="Вашето име" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
              Имейл
            </label>
            <input type="email" id="email" className="w-full border-b border-gray-300 py-2 focus:border-black focus:outline-none transition-colors text-sm sm:text-base" placeholder="Вашият имейл" />
          </div>
        </div>
        <div>
                      <label htmlFor="message" className="block text-sm text-gray-600 mb-1">
              Съобщение
            </label>
            <textarea id="message" rows={4} className="w-full border-b border-gray-300 py-2 focus:border-black focus:outline-none transition-colors text-sm sm:text-base" placeholder="Вашето съобщение"></textarea>
        </div>
        <button type="submit" className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-black text-white text-sm hover:bg-gray-800 transition-colors">
          Изпрати съобщение
        </button>
      </form>
      <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <div>
          <h4 className="text-sm font-medium mb-1 sm:mb-2">Имейл</h4>
          <p className="text-sm sm:text-base text-gray-600">sales@tuida.life</p>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-1 sm:mb-2">Телефон</h4>
          <p className="text-sm sm:text-base text-gray-600">+359 89 251 7200</p>
        </div>
        <div className="sm:col-span-2 md:col-span-1">
          <h4 className="text-sm font-medium mb-1 sm:mb-2">Адрес</h4>
          <p className="text-sm sm:text-base text-gray-600">
            ул. Братя Миладинови 27, офис Явлена
          </p>
        </div>
      </div>
    </div>;
};
export default ContactForm;