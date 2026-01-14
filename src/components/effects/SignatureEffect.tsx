import React from 'react';

interface SignatureEffectProps {
  effect: 'noise' | 'grain' | 'glass';
  className?: string;
}

export const SignatureEffect: React.FC<SignatureEffectProps> = ({ effect, className = '' }) => {
  if (effect === 'noise' || effect === 'grain') {
    return (
      <div 
        className={`fixed top-0 left-0 w-full h-full pointer-events-none z-[9999] opacity-[0.05] ${className}`}
        style={{ 
          backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />
    );
  }

  return null;
};
