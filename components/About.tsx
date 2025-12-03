import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, Variants, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface FeatureDetail {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
}

const FEATURES: FeatureDetail[] = [
  {
    id: 'source',
    title: 'Source',
    shortDescription: 'Direct trade relationships with farmers in Ethiopia, Colombia, and Costa Rica ensure fair wages and exceptional quality beans that tell a story.',
    fullDescription: "Our journey begins at the origin. We practice direct trade, meaning we meet the farmers, walk the fields, and shake hands with the people who nurture the coffee cherries.\n\nThis ensures transparency, fair wages well above Fair Trade standards, and sustainable farming practices that protect the biodiversity of regions like Yirgacheffe and Tarrazú. Every bean tells a story of its soil, climate, and the hands that picked it.",
    image: 'https://picsum.photos/id/1063/800/600?grayscale'
  },
  {
    id: 'roast',
    title: 'Roast',
    shortDescription: 'Small-batch roasting in-house allows us to highlight the unique terroir of every bean we serve, unlocking flavors you never knew existed.',
    fullDescription: "Roasting is where science meets art. We roast in small batches of 10kg or less on our vintage Probat roaster. We don't just turn beans brown; we develop a specific roast profile for every single lot.\n\nUsing sensors to track temperature changes up to 100 times per second, we manipulate the Maillard reaction to caramelize sugars perfectly, preserving the delicate floral and fruit notes while developing body and sweetness.",
    image: 'https://picsum.photos/id/429/800/600?grayscale'
  },
  {
    id: 'brew',
    title: 'Brew',
    shortDescription: 'Precision extraction using state-of-the-art equipment and scientific brewing ratios to deliver the perfect cup, every single time.',
    fullDescription: "The final step is the most critical. We treat brewing as a precise science. Our water is remineralized to exact specifications (magnesium for fruitiness, bicarbonate for buffer).\n\nWe use precision grinders to ensure uniform particle size and weigh every dose to 0.1g. Whether it's a V60 pour-over or a 9-bar espresso shot, our baristas are trained to extract the 'sweet spot'—where acidity, sweetness, and bitterness are in perfect harmony.",
    image: 'https://picsum.photos/id/425/800/600?grayscale'
  }
];

const About: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<FeatureDetail | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms
  // Title moves slightly against the scroll direction to float
  const titleY = useTransform(scrollYProgress, [0, 0.5], ["60px", "-60px"]);
  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  
  // Create different speeds for the cards to enhance depth (staggered effect)
  const card1Y = useTransform(scrollYProgress, [0, 1], ["120px", "-40px"]);
  const card2Y = useTransform(scrollYProgress, [0, 1], ["180px", "-80px"]); // Middle card moves the most
  const card3Y = useTransform(scrollYProgress, [0, 1], ["120px", "-40px"]);
  
  const transforms = [card1Y, card2Y, card3Y];

  // Staggered entrance animation variants
  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: (custom: number) => ({
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        delay: custom * 0.2, // Stagger based on index
        ease: "easeOut" 
      }
    })
  };

  return (
    <section ref={containerRef} className="relative py-32 px-4 border-t border-coffee-900 bg-coffee-950 overflow-hidden min-h-[100vh]">
      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedFeature(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-coffee-950 border border-coffee-700 w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedFeature(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/40 hover:bg-black/70 rounded-full text-white transition-colors backdrop-blur-sm"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="h-64 sm:h-80 overflow-hidden relative shrink-0">
                 <img 
                    src={selectedFeature.image} 
                    alt={selectedFeature.title} 
                    className="w-full h-full object-cover" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-coffee-950 to-transparent opacity-90" />
                 <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
                    <h3 className="text-4xl md:text-5xl font-serif text-amber-500 font-bold drop-shadow-lg">
                        {selectedFeature.title}
                    </h3>
                 </div>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto">
                <p className="text-coffee-100 leading-relaxed whitespace-pre-line text-lg font-sans">
                  {selectedFeature.fullDescription}
                </p>
                <div className="mt-8 pt-6 border-t border-coffee-800 flex justify-between items-center">
                    <span className="text-coffee-500 text-sm italic">Parallax Brew Philosophy</span>
                    <button 
                        onClick={() => setSelectedFeature(null)}
                        className="px-6 py-2 bg-coffee-800 hover:bg-coffee-700 text-coffee-100 rounded-lg transition-colors font-medium text-sm"
                    >
                        Close
                    </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Background Elements moving at different speeds */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]) }}
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20"
      >
        <div className="absolute top-0 left-[10%] w-[40rem] h-[40rem] bg-coffee-800/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-[5%] w-[30rem] h-[30rem] bg-amber-900/30 rounded-full blur-[80px]" />
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
            style={{ opacity: titleOpacity, y: titleY }}
            className="text-center mb-24"
        >
            <h2 className="text-4xl md:text-6xl font-serif text-coffee-100 mb-6 italic drop-shadow-lg leading-tight">
            "Coffee is not a drink.<br/>It's a dimension."
            </h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto rounded-full shadow-[0_0_15px_rgba(217,119,6,0.5)]" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 text-coffee-100">
            {FEATURES.map((feature, index) => (
                <motion.div 
                    key={feature.id} 
                    style={{ y: transforms[index] }} 
                    className={`relative group h-full ${index === 1 ? 'md:mt-16' : ''}`}
                >
                    <motion.div
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-50px" }}
                      className="h-full relative flex flex-col"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-coffee-800 to-coffee-950 rounded-2xl transform rotate-2 group-hover:rotate-3 transition-transform opacity-60" />
                      <div className="relative p-8 border border-coffee-800 bg-coffee-900/90 backdrop-blur-md rounded-2xl hover:border-amber-700/50 hover:bg-coffee-900 transition-all duration-300 h-full shadow-2xl flex flex-col">
                          <h3 className="text-amber-500 font-bold mb-4 uppercase tracking-widest text-lg border-b border-coffee-800 pb-4">
                            {feature.title}
                          </h3>
                          <p className="text-coffee-300 leading-relaxed font-sans text-base mb-6 flex-grow">
                            {feature.shortDescription}
                          </p>
                          <button
                            onClick={() => setSelectedFeature(feature)}
                            className="self-start px-4 py-2 mt-auto border border-coffee-600 rounded text-coffee-400 text-sm hover:bg-coffee-800 hover:text-amber-500 hover:border-amber-600/50 transition-all duration-300 group-hover:translate-x-1"
                          >
                            Read More
                          </button>
                      </div>
                    </motion.div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default About;
