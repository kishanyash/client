export default function UltraDLogo({ className = '', height = 48 }) {
  return (
    <img 
      src="/logo.png" 
      alt="Ultra D Multiventures Pvt. Ltd." 
      style={{ height: `${height}px`, width: 'auto' }}
      className={`${className} select-none max-w-full`}
    />
  );
}
