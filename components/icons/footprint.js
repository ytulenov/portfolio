const FootprintIcon = (props) => {
  return (
    <svg
      height="28"  /* Matches text font-size */
      width="28"   /* Square aspect ratio */
      className="inline-block transition-transform group-hover:rotate-[20deg]"
      viewBox="0 0 50 50"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    > 
      {/* Central chip (microcontroller) */}
      <rect x="20" y="20" width="16" height="16" rx="1" />

      {/* PCB outline with trace-like extensions */}
      <rect x="14" y="14" width="28" height="28" rx="2" strokeDasharray="4 2" />
      
      {/* VLSI-inspired nodes and connections */}
      <circle cx="28" cy="28" r="3" />
      <line x1="28" y1="25" x2="20" y2="16" />
      <line x1="28" y1="31" x2="36" y2="40" />
      
      {/* Pin-like protrusions */}
      <line x1="20" y1="14" x2="20" y2="8" />
      <line x1="36" y1="14" x2="36" y2="8" />
      <line x1="14" y1="20" x2="8" y2="20" />
      <line x1="14" y1="36" x2="8" y2="36" />
      <line x1="42" y1="20" x2="48" y2="20" />
      <line x1="42" y1="36" x2="48" y2="36" />
    </svg>
  );
};

export default FootprintIcon;