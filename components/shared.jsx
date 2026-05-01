// Shared logo SVG component (the airoclip infinity-clip mark)
function AiroLogoMark({ size = 18, color = "#fff" }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M14 32c0-7.2 5.8-13 13-13 4.4 0 7.7 2.4 10.4 5.8l3.4-2.6C37.5 17.6 33 14.5 27 14.5c-9.7 0-17.5 7.8-17.5 17.5S17.3 49.5 27 49.5c5.7 0 10.3-2.9 13.5-6.4l-3.3-2.7C34.7 43.6 31.4 46 27 46c-7.2 0-13-6.3-13-14z" fill={color}/>
      <path d="M50 32c0 7.7-5.8 14-13 14-4.4 0-7.7-2.4-10.5-5.8l-3.3 2.7C26.4 46.6 31 49.5 36.7 49.5c9.7 0 17.5-7.8 17.5-17.5S46.4 14.5 36.7 14.5c-6 0-10.5 3.1-13.7 7.7l3.3 2.6C29 21.4 32.3 19 36.7 19c7.2 0 13.3 5.8 13.3 13z" fill={color}/>
      <circle cx="48" cy="20" r="4" fill={color}/>
    </svg>
  );
}

// Brand mark with image fallback (uses real logo)
function AiroLogoFull({ height = 28, mode = "light" }) {
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
      <div className="mark">
        <AiroLogoMark size={Math.round(height * 0.62)} color="#fff" />
      </div>
      <span style={{fontWeight: 500, fontSize: height * 0.62, letterSpacing: '-0.02em'}}>airoclip</span>
    </div>
  );
}

// Tap Hexa logo image
function TapHexaLogo({ maxHeight = 280 }) {
  return <img src="assets/tap-hexa-logo.png" alt="Tap Hexa" style={{maxHeight}} />;
}

// Hexa Dreams artwork (built — placeholder hexagon mosaic)
function HexaDreamsArt({ scale = 1 }) {
  // Stylized hexagon cluster representing the puzzle game
  return (
    <svg viewBox="0 0 320 320" width={320 * scale} height={320 * scale} aria-label="Hexa Dreams">
      <defs>
        <linearGradient id="hd1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff6bd6"/>
          <stop offset="1" stopColor="#a93dff"/>
        </linearGradient>
        <linearGradient id="hd2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3dffd6"/>
          <stop offset="1" stopColor="#3d8aff"/>
        </linearGradient>
        <linearGradient id="hd3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffd23d"/>
          <stop offset="1" stopColor="#ff7a3d"/>
        </linearGradient>
        <linearGradient id="hd4" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95"/>
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.65"/>
        </linearGradient>
        <filter id="hdShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodOpacity="0.25"/>
        </filter>
      </defs>
      <g filter="url(#hdShadow)" transform="translate(160,160)">
        {/* Hex grid */}
        {[
          {x:0,y:-72,f:"url(#hd1)"},
          {x:62,y:-36,f:"url(#hd2)"},
          {x:62,y:36,f:"url(#hd3)"},
          {x:0,y:72,f:"url(#hd1)"},
          {x:-62,y:36,f:"url(#hd2)"},
          {x:-62,y:-36,f:"url(#hd3)"},
          {x:0,y:0,f:"url(#hd4)"},
        ].map((h, i) => (
          <polygon key={i} points="0,-36 31,-18 31,18 0,36 -31,18 -31,-18" transform={`translate(${h.x},${h.y})`} fill={h.f} stroke="#fff" strokeWidth="3" />
        ))}
        <text x="0" y="6" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="22" fill="#5b2ee8">DREAMS</text>
      </g>
    </svg>
  );
}

// Social icons
const Social = {
  X: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  In: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  Yt: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  Ig: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
};

// Make available globally for other Babel scripts
Object.assign(window, { AiroLogoMark, AiroLogoFull, TapHexaLogo, HexaDreamsArt, Social });
