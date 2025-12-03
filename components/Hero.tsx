import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const beansY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  // Cup moves at a different speed to create depth
  const cupY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <div ref={ref} className="relative w-full h-screen overflow-hidden bg-coffee-950 flex items-center justify-center">
      {/* Background Layer - Deep Atmospheric Color/Texture */}
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-b from-coffee-900 via-coffee-950 to-black"
        style={{ y: backgroundY }}
      />
      
      {/* Abstract Animated Shapes (Steam/Smoke vibe) */}
      <div className="absolute inset-0 z-0 opacity-20 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-coffee-600 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-700 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating Elements (Parallax Beans) */}
      <motion.div 
        style={{ y: beansY, rotate: 12 }} 
        className="absolute top-20 right-[10%] w-32 h-32 md:w-48 md:h-48 z-10 opacity-60 pointer-events-none"
      >
        <svg viewBox="0 0 100 100" fill="currentColor" className="text-coffee-500 drop-shadow-2xl">
          <path d="M50 95C25 95 10 75 10 50C10 25 25 5 50 5C75 5 90 25 90 50C90 75 75 95 50 95ZM48 15C35 15 25 30 25 50C25 70 35 85 48 85C49 85 50 84 50 84C55 60 45 40 50 16C50 16 49 15 48 15Z" />
        </svg>
      </motion.div>

      <motion.div 
        style={{ y: beansY, rotate: -45 }} 
        className="absolute bottom-40 left-[5%] w-24 h-24 z-10 opacity-40 blur-[2px] pointer-events-none"
      >
         <svg viewBox="0 0 100 100" fill="currentColor" className="text-coffee-400 drop-shadow-2xl">
          <path d="M50 95C25 95 10 75 10 50C10 25 25 5 50 5C75 5 90 25 90 50C90 75 75 95 50 95ZM48 15C35 15 25 30 25 50C25 70 35 85 48 85C49 85 50 84 50 84C55 60 45 40 50 16C50 16 49 15 48 15Z" />
        </svg>
      </motion.div>

      {/* 3D Coffee Cup with Steam (Parallax Layer) */}
      <motion.div
        style={{ y: cupY, x: '-50%' }}
        className="absolute bottom-[-60px] md:bottom-[-100px] left-1/2 z-10 pointer-events-none opacity-90 scale-75 md:scale-100"
      >
        <div className="relative w-64 h-64 md:w-96 md:h-96 flex justify-center items-end">
             {/* Animated Steam Particles */}
             <div className="absolute bottom-[55%] left-1/2 -translate-x-1/2 w-32 h-64 flex justify-center z-0">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={`steam-${i}`}
                        className="absolute bottom-0 w-10 bg-gradient-to-t from-white/10 via-white/5 to-transparent blur-[20px] rounded-full origin-bottom"
                        style={{ height: 50 }} 
                        animate={{
                            y: [0, -180 - Math.random() * 60],
                            opacity: [0, 0.3, 0],
                            scaleY: [0.5, 2, 2.5],
                            scaleX: [1, 1.5, 2],
                            x: [
                                0,
                                (i % 2 === 0 ? 1 : -1) * (30 + Math.random() * 20)
                            ]
                        }}
                        transition={{
                            duration: 4 + Math.random() * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.7,
                            repeatDelay: Math.random() * 0.5
                        }}
                    />
                ))}
             </div>

             {/* Cup Illustration */}
             <svg viewBox="0 0 200 160" className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10 relative">
                 {/* Saucer */}
                 <ellipse cx="100" cy="135" rx="90" ry="20" className="fill-coffee-800" />
                 <ellipse cx="100" cy="132" rx="70" ry="15" className="fill-coffee-900" />

                 {/* Handle */}
                 <path d="M150,50 C180,50 185,90 150,100" strokeWidth="12" stroke="currentColor" fill="none" className="text-coffee-600" strokeLinecap="round" />

                 {/* Cup Body */}
                 <path d="M40,30 C40,110 50,130 100,130 C150,130 160,110 160,30" fill="currentColor" className="text-coffee-700" />

                 {/* Inner Shadow/Highlight */}
                 <path d="M40,30 Q45,130 100,130 Q155,130 160,30" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="2" />

                 {/* Cup Rim/Inside Liquid */}
                 <ellipse cx="100" cy="30" rx="60" ry="12" className="fill-coffee-800" />
                 <ellipse cx="100" cy="30" rx="54" ry="10" className="fill-coffee-950" /> {/* Coffee liquid */}
                 
                 {/* Liquid Reflection */}
                 <ellipse cx="100" cy="32" rx="30" ry="4" className="fill-coffee-800 opacity-50" />
             </svg>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div style={{ y: textY }} className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-[-80px] md:mt-[-120px]">
        <h1 className="font-serif text-6xl md:text-9xl font-bold text-coffee-50 mb-6 drop-shadow-xl tracking-tighter">
          Parallax<br/><span className="text-coffee-400 italic">Brew</span>
        </h1>
        <p className="font-sans text-xl md:text-2xl text-coffee-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          Where perception meets perfection. Experience coffee in a new dimension.
        </p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
          className="mt-10 px-8 py-4 bg-coffee-500 hover:bg-coffee-400 text-white rounded-full font-bold tracking-wide shadow-lg shadow-coffee-900/50 transition-colors"
        >
          Explore the Menu
        </motion.button>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-coffee-300"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </div>
  );
};

export default Hero;