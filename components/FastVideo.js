'use client'; // Use client-side rendering for DOM manipulation

import { useEffect, useRef } from 'react';

export default function FastVideo({ src, poster }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2; // Set desired speed
    }
  }, []);

  return (
    <div style={{ textAlign: 'center' }} height="100%" width="100%">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        style={{
          objectFit: 'fill',
          height: '100%',
          width: '100%',
          aspectRatio: '1382 / 700',
          borderRadius: '8px',
        }}
        poster={poster}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div style={{ fontStyle: 'italic', fontSize: '0.9em', color: '#666', marginBottom: '20px' }}>
        CAD model showcase—visualizing the sorter’s mechanics, powered by my electrical design.
      </div>
    </div>
  );
}