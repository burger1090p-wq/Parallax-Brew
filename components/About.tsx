import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';

const About: React.FC = () => {
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
    <section ref={containerRef} className="relative py-32 px-4 border-t border-coffee-900 bg-coffee-950 overflow-hidden">
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
            {/* Card 1 */}
            <motion.div style={{ y: card1Y }} className="relative group h-full">
                <motion.div
                  custom={0}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="h-full relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-coffee-800 to-coffee-950 rounded-2xl transform rotate-2 group-hover:rotate-3 transition-transform opacity-60" />
                  <div className="relative p-8 border border-coffee-800 bg-coffee-900/90 backdrop-blur-md rounded-2xl hover:border-amber-700/50 hover:bg-coffee-900 transition-all duration-300 h-full shadow-2xl flex flex-col">
                      <h3 className="text-amber-500 font-bold mb-4 uppercase tracking-widest text-lg border-b border-coffee-800 pb-4">Source</h3>
                      <p className="text-coffee-300 leading-relaxed font-sans text-base">Direct trade relationships with farmers in Ethiopia, Colombia, and Costa Rica ensure fair wages and exceptional quality beans that tell a story.</p>
                  </div>
                </motion.div>
            </motion.div>

            {/* Card 2 - Offset visually */}
            <motion.div style={{ y: card2Y }} className="relative group md:mt-16 h-full">
                <motion.div
                  custom={1}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="h-full relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-coffee-800 to-coffee-950 rounded-2xl transform -rotate-1 group-hover:-rotate-2 transition-transform opacity-60" />
                  <div className="relative p-8 border border-coffee-800 bg-coffee-900/90 backdrop-blur-md rounded-2xl hover:border-amber-700/50 hover:bg-coffee-900 transition-all duration-300 h-full shadow-2xl flex flex-col">
                      <h3 className="text-amber-500 font-bold mb-4 uppercase tracking-widest text-lg border-b border-coffee-800 pb-4">Roast</h3>
                      <p className="text-coffee-300 leading-relaxed font-sans text-base">Small-batch roasting in-house allows us to highlight the unique terroir of every bean we serve, unlocking flavors you never knew existed.</p>
                  </div>
                </motion.div>
            </motion.div>

            {/* Card 3 */}
            <motion.div style={{ y: card3Y }} className="relative group h-full">
                <motion.div
                  custom={2}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="h-full relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-coffee-800 to-coffee-950 rounded-2xl transform rotate-2 group-hover:rotate-3 transition-transform opacity-60" />
                  <div className="relative p-8 border border-coffee-800 bg-coffee-900/90 backdrop-blur-md rounded-2xl hover:border-amber-700/50 hover:bg-coffee-900 transition-all duration-300 h-full shadow-2xl flex flex-col">
                      <h3 className="text-amber-500 font-bold mb-4 uppercase tracking-widest text-lg border-b border-coffee-800 pb-4">Brew</h3>
                      <p className="text-coffee-300 leading-relaxed font-sans text-base">Precision extraction using state-of-the-art equipment and scientific brewing ratios to deliver the perfect cup, every single time.</p>
                  </div>
                </motion.div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;