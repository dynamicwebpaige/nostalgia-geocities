import React, { useEffect, useState } from 'react';

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Dialing...");

  useEffect(() => {
    const statuses = [
      "Dialing...",
      "Handshaking...",
      "Verifying Username...",
      "Logging on to Network...",
      "Downloading graphic resources...",
      "Initializing Java Applets...",
      "Done."
    ];

    let currentStatusIndex = 0;
    
    // Sped up interval and increased increment size for a faster loading experience
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15 + 2; // Increments of ~10% on average
      });
      
      // Update status more frequently
      if (Math.random() > 0.5 && currentStatusIndex < statuses.length - 1) {
        currentStatusIndex++;
        setStatus(statuses[currentStatusIndex]);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#008080] p-4">
      <div className="win95-box p-1 max-w-md w-full bg-[#c0c0c0]">
        <div className="bg-[#000080] text-white px-2 py-1 font-bold mb-4 flex justify-between">
          <span>Connecting to Internet...</span>
          <button className="win95-btn px-1 text-black font-bold text-xs">X</button>
        </div>

        <div className="p-6 flex flex-col items-center gap-4">
          <img src="https://picsum.photos/64/64" alt="Modem" className="mb-2 border-2 border-gray-500" />
          
          <div className="w-full text-left font-['MS_Sans_Serif'] text-sm mb-1">
             Status: {status}
          </div>

          <div className="w-full win95-inset h-6 p-0.5 relative">
            <div 
              className="h-full bg-[#000080]" 
              style={{ width: `${Math.min(progress, 100)}%`, transition: 'width 0.2s' }}
            ></div>
          </div>
          
          <button className="win95-btn px-6 py-1 mt-4 font-bold disabled:opacity-50" disabled>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;