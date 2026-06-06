import React from 'react';

export default function UltraDLogo({ className = '', height = 48, showSubtitle = true }) {
  return (
    <img 
      src="/logo.png" 
      alt="Ultra D Multiventures Pvt. Ltd." 
      style={{ height: `${height}px`, width: 'auto' }}
      className={`${className} select-none max-w-full`}
    />
  );
}
