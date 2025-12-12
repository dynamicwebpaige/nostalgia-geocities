import React, { useRef, useState, useEffect } from 'react';

interface WebcamCaptureProps {
  onCapture: (base64Image: string) => void;
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        setError("Could not access webcam. Please ensure you have a camera connected and permissions allowed.");
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const image = canvasRef.current.toDataURL('image/jpeg', 0.8);
        onCapture(image);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="win95-box p-1 max-w-2xl w-full bg-[#c0c0c0]">
        <div className="bg-[#000080] text-white px-2 py-1 flex justify-between items-center font-bold mb-1">
          <span>Digital Camera Interface v1.0</span>
          <button className="win95-btn px-2 text-black font-bold">_</button>
        </div>

        <div className="p-4 flex flex-col items-center">
          {error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          ) : (
            <>
              <div className="relative border-4 border-gray-600 bg-black w-full aspect-video mb-4 overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  className="w-full h-full object-cover transform scale-x-[-1]" 
                />
                <div className="absolute top-2 left-2 text-[#00FF00] font-mono text-xs animate-pulse">
                  REC ●
                </div>
                <div className="absolute bottom-2 right-2 text-[#00FF00] font-mono text-xs">
                  {new Date().toLocaleDateString()}
                </div>
                {/* Crosshairs */}
                <div className="absolute top-1/2 left-1/2 w-8 h-8 border-2 border-[#00FF00]/50 -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-[#00FF00] -translate-x-1/2 -translate-y-1/2"></div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={handleCapture}
                  className="win95-btn px-6 py-2 font-bold flex items-center gap-2 active:translate-y-1"
                >
                  <div className="w-3 h-3 rounded-full bg-red-500 border border-red-800"></div>
                  SNAP PICTURE
                </button>
              </div>
            </>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>
        
        <div className="bg-[#c0c0c0] p-1 text-xs border-t border-gray-400 flex justify-between">
          <span>Ready</span>
          <span>USB Connected</span>
        </div>
      </div>
    </div>
  );
};

export default WebcamCapture;
