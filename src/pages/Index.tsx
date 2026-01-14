import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../components/motion/Reveal';
import { SignatureEffect } from '../components/effects/SignatureEffect';
import { SignatureInteraction } from '../components/effects/SignatureInteraction';

// Styles for fonts and specific animations that are easier in CSS
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Italiana&family=Manrope:wght@200;400;600&family=Syncopate:wght@400;700&display=swap');
    
    :root {
      --bg: #050505;
      --text: #f0f0f0;
      --accent: #ff3c00;
      --glass: rgba(255, 255, 255, 0.05);
      --border: rgba(255, 255, 255, 0.1);
    }

    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: 'Manrope', sans-serif;
      overflow-x: hidden;
    }

    .font-head { font-family: 'Italiana', serif; }
    .font-display { font-family: 'Syncopate', sans-serif; }
    .font-body { font-family: 'Manrope', sans-serif; }

    .cursor {
      mix-blend-mode: difference;
      pointer-events: none;
      z-index: 10000;
    }

    @keyframes panZoom {
      from { transform: scale(1.1) translate(0, 0); }
      to { transform: scale(1.2) translate(-20px, -20px); }
    }

    .animate-panZoom {
      animation: panZoom 20s infinite alternate ease-in-out;
    }

    .mask-gradient {
      mask-image: linear-gradient(to right, transparent, black);
      -webkit-mask-image: linear-gradient(to right, transparent 0%, black 100%);
    }

    @media (max-width: 768px) {
      .mask-gradient {
        mask-image: none;
        -webkit-mask-image: none;
      }
    }
  `}</style>
);

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleHover = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'scale(3)';
        cursorRef.current.style.background = '#f0f0f0';
        cursorRef.current.style.borderColor = 'transparent';
      }
    };

    const handleLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'scale(1)';
        cursorRef.current.style.background = 'transparent';
        cursorRef.current.style.borderColor = '#f0f0f0';
      }
    };

    window.addEventListener('mousemove', moveCursor);
    
    const hoverables = document.querySelectorAll('a, button, .hover-target');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      hoverables.forEach(el => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="cursor fixed w-5 h-5 border border-[#f0f0f0] rounded-full transition-transform duration-100 ease-out"
      style={{ top: 0, left: 0 }}
    />
  );
};

export default function Index() {
  return (
    <div className="bg-[#050505] text-[#f0f0f0] min-h-screen">
      <GlobalStyles />
      <SignatureEffect effect="noise" />
      <Cursor />

      {/* Navigation */}
      <nav className="fixed top-0 w-full px-8 py-8 md:px-12 flex justify-between items-center z-50 mix-blend-difference">
        <div className="font-display font-bold text-2xl tracking-widest">NOCTURNE.</div>
        <div className="font-body uppercase tracking-widest text-sm">Dallas, TX</div>
      </nav>

      {/* Hero Section */}
      <header className="h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1574391884720-38501869d27a?q=80&w=2067&auto=format&fit=crop" 
            alt="Nightclub Crowd" 
            className="w-full h-full object-cover opacity-40 animate-panZoom"
          />
        </div>
        <div className="relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-body font-extralight tracking-[0.5em] uppercase mb-4 block"
          >
            Welcome to the Abyss
          </motion.span>
          <SignatureInteraction type="text-reveal">
            <h1 className="font-display text-[clamp(3rem,10vw,12rem)] leading-[0.9] uppercase font-bold tracking-tighter bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
              The Pulse<br/>of Dallas
            </h1>
          </SignatureInteraction>
        </div>
      </header>

      {/* Zones Section */}
      <section className="py-40 relative px-[5%] max-w-[1600px] mx-auto">
        <Reveal>
          <h2 className="font-display text-[1.2rem] tracking-[0.2em] uppercase text-[#ff3c00]">Sonic Landscapes</h2>
        </Reveal>
        <Reveal delay={0.4}>
          <h3 className="font-head text-[clamp(2.5rem,5vw,6rem)] leading-[1.1] mt-2">Five Realms.<br/>One Destination.</h3>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-20">
          {/* Zone 1 */}
          <div className="md:col-span-6 relative h-[50vh] md:h-[60vh] overflow-hidden border border-white/10 group">
            <SignatureInteraction type="parallax" className="w-full h-full">
              <img 
                src="https://images.unsplash.com/photo-1598518141948-24cc40c83226?q=80&w=2070&auto=format&fit=crop" 
                alt="Techno" 
                className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)] grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-100"
              />
            </SignatureInteraction>
            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black to-transparent pointer-events-none">
              <div className="font-head text-5xl mb-2">The Void</div>
              <p className="text-sm opacity-80 max-w-[300px]">Industrial Techno & Deep House. Immersive lasers and bass that stops your heart.</p>
            </div>
          </div>
          
          {/* Zone 2 */}
          <div className="md:col-span-6 relative h-[50vh] md:h-[60vh] overflow-hidden border border-white/10 group md:translate-y-20">
            <SignatureInteraction type="parallax" className="w-full h-full">
              <img 
                src="https://images.unsplash.com/photo-1571266028243-371695039353?q=80&w=2070&auto=format&fit=crop" 
                alt="Lounge" 
                className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)] grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-100"
              />
            </SignatureInteraction>
            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black to-transparent pointer-events-none">
              <div className="font-head text-5xl mb-2">Velvet Room</div>
              <p className="text-sm opacity-80 max-w-[300px]">R&B, Soul & Downtempo. A plush sanctuary for conversation and connection.</p>
            </div>
          </div>

          {/* Zone 3 */}
          <div className="md:col-span-12 relative h-[50vh] md:h-[80vh] overflow-hidden border border-white/10 group">
            <SignatureInteraction type="parallax" className="w-full h-full">
              <img 
                src="https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1974&auto=format&fit=crop" 
                alt="Main Stage" 
                className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)] grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-100"
              />
            </SignatureInteraction>
            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black to-transparent pointer-events-none">
              <div className="font-head text-5xl mb-2">The Cathedral</div>
              <p className="text-sm opacity-80 max-w-[300px]">Main Stage Energy. Top 40, EDM, and High-Octane Performance Art.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lineup Section */}
      <section className="py-20 pb-40 bg-[#080808]">
        <div className="px-[5%] max-w-[1600px] mx-auto">
          <Reveal>
            <h2 className="font-display text-[1.2rem] tracking-[0.2em] uppercase text-[#ff3c00]">Upcoming Rituals</h2>
          </Reveal>
          <div className="mt-16 border-t border-white/10">
            {[ 
              { date: 'FRI OCT 14', artist: 'SOLOMUN', genre: 'Deep House' },
              { date: 'SAT OCT 15', artist: 'AMELIE LENS', genre: 'Techno' },
              { date: 'FRI OCT 21', artist: 'BLACK COFFEE', genre: 'Afro House' },
              { date: 'SAT OCT 22', artist: 'ZHU', genre: 'Electronic' }
            ].map((event, i) => (
              <Reveal key={i} delay={i * 0.1} width="100%">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] py-10 border-b border-white/10 transition-all duration-300 hover:bg-white/5 hover:pl-8 items-center gap-2 md:gap-0 text-center md:text-left hover-target">
                  <span className="font-display text-[#ff3c00] text-sm">{event.date}</span>
                  <span className="font-head text-5xl">{event.artist}</span>
                  <span className="uppercase text-xs tracking-widest opacity-60 md:text-right">{event.genre}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bar Section */}
      <section className="min-h-screen flex flex-col md:flex-row items-center relative pb-16 md:pb-0">
        <div className="absolute md:right-0 top-0 w-full md:w-1/2 h-[50vh] md:h-full z-10 mask-gradient">
           <img 
            src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1964&auto=format&fit=crop" 
            alt="Cocktail" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 w-full md:w-1/2 px-8 md:pl-[10vw] pt-[55vh] md:pt-0">
          <Reveal>
            <h2 className="font-display text-[1.2rem] tracking-[0.2em] uppercase text-[#ff3c00]">Alchemy & Spirits</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <h3 className="font-head text-[clamp(2.5rem,5vw,6rem)] leading-[1.1] my-8">Liquid<br/>Artistry</h3>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-lg opacity-70 leading-relaxed max-w-[500px] mb-12">
              Experience mixology elevated to an art form. Our expansive onyx bar features rare spirits, molecular cocktails, and a wine list curated by the world's finest sommeliers. Taste the night.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <a href="#" className="inline-block bg-transparent text-[#f0f0f0] border border-[#f0f0f0] px-16 py-6 font-display text-base tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#f0f0f0] hover:text-[#050505] hover-target">
              View Menu
            </a>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-16 text-center relative">
        <Reveal>
          <h2 className="font-display text-[5vw] font-bold uppercase tracking-tighter">Join The Night</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 tracking-[0.1em] uppercase">1900 Pacific Ave, Dallas, TX</p>
        </Reveal>
        <Reveal delay={0.3}>
          <a href="#" className="inline-block bg-transparent text-[#f0f0f0] border border-[#f0f0f0] px-16 py-6 font-display text-base tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#f0f0f0] hover:text-[#050505] mt-12 hover-target">
            Reserve Table
          </a>
        </Reveal>
      </footer>
    </div>
  );
}
