import React, { useState } from 'react';
import TiltCard from './TiltCard';
import { MenuItem } from '../types';

const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Ethiopian Yirgacheffe',
    description: 'Bright acidity with complex floral and citrus notes.',
    price: '$6.50',
    image: 'https://picsum.photos/400/300?grayscale&blur=1',
    category: 'beans'
  },
  {
    id: '2',
    name: 'Nitro Cold Brew',
    description: 'Velvety smooth, infused with nitrogen for a creamy texture.',
    price: '$5.50',
    image: 'https://picsum.photos/400/301?grayscale',
    category: 'coffee'
  },
  {
    id: '3',
    name: 'Smoked Vanilla Latte',
    description: 'House-made vanilla bean syrup with a hint of hickory smoke.',
    price: '$6.00',
    image: 'https://picsum.photos/400/302?grayscale',
    category: 'coffee'
  },
  {
    id: '4',
    name: 'Matcha Croissant',
    description: 'Flaky pastry filled with premium matcha cream.',
    price: '$4.75',
    image: 'https://picsum.photos/400/303?grayscale',
    category: 'pastry'
  },
  {
    id: '5',
    name: 'Pour Over V60',
    description: 'Hand-poured single origin of the day. Clean and articulate.',
    price: '$7.00',
    image: 'https://picsum.photos/400/304?grayscale',
    category: 'coffee'
  },
  {
    id: '6',
    name: 'Espresso Flight',
    description: 'A tasting journey of three distinct single-origin espressos.',
    price: '$9.00',
    image: 'https://picsum.photos/400/305?grayscale',
    category: 'coffee'
  }
];

const MenuImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && (
        <div className="absolute inset-0 bg-coffee-800 animate-pulse" />
      )}
      <img 
        src={src} 
        alt={alt} 
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 
          ${isLoaded ? 'opacity-80 group-hover:opacity-100 blur-0' : 'opacity-0 blur-lg scale-110'}
        `} 
      />
    </>
  );
};

const Menu: React.FC = () => {
  return (
    <section id="menu" className="py-24 bg-coffee-950 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-coffee-800/20 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-coffee-50 mb-4">Curated Selection</h2>
          <p className="text-coffee-300 max-w-xl mx-auto">
            Sourced from the finest altitudes, roasted with precision, and brewed with passion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {MENU_ITEMS.map((item) => (
            <TiltCard key={item.id} className="group h-full">
              <div className="relative h-full bg-coffee-900 border border-coffee-800 rounded-xl overflow-hidden shadow-2xl transform transition-transform group-hover:border-coffee-600">
                <div className="h-64 overflow-hidden relative bg-coffee-900">
                    <MenuImage src={item.image} alt={item.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-coffee-900 via-transparent to-transparent opacity-90 pointer-events-none" />
                </div>
                
                <div className="p-8 relative -mt-12">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold tracking-wider text-coffee-400 uppercase bg-coffee-950/50 px-2 py-1 rounded backdrop-blur-sm border border-coffee-800">
                            {item.category}
                        </span>
                        <span className="font-serif text-2xl text-amber-500 font-bold">{item.price}</span>
                    </div>
                  
                  <h3 className="text-2xl font-serif text-coffee-50 mb-3 group-hover:text-amber-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-coffee-300 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                  
                  <button className="w-full py-3 border border-coffee-600 text-coffee-200 rounded-lg hover:bg-coffee-500 hover:text-white hover:border-coffee-500 transition-all font-medium text-sm tracking-wide">
                    Add to Order
                  </button>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;