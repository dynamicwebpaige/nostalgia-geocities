import React from 'react';

interface IntroProps {
  onStart: () => void;
}

const Intro: React.FC<IntroProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <div className="win95-box p-1 max-w-2xl w-full bg-[#c0c0c0]">
        <div className="bg-[#000080] text-white px-2 py-1 flex justify-between items-center font-bold mb-1">
          <span>Welcome.exe</span>
          <button className="win95-btn px-2 text-black font-bold">X</button>
        </div>
        
        <div className="p-8 flex flex-col items-center gap-6">
          <h1 className="text-4xl md:text-6xl font-['Comic_Neue'] font-bold text-[#FF00FF] drop-shadow-[2px_2px_0_#000]">
            WEB CONSTRUCTION KIT 2000
          </h1>
          
          <div className="marquee-container w-full bg-black border-2 border-inset border-gray-500 text-[#00FF00] font-['VT323'] text-xl py-2">
            <div className="marquee-content">
              +++ WELCOME TO THE FUTURE OF THE INTERNET +++ BUILD YOUR OWN HOME PAGE TODAY +++ NO HTML REQUIRED +++ 
            </div>
          </div>

          <div className="flex gap-4 items-center justify-center">
            <img src="https://picsum.photos/100/100?grayscale" alt="Under Construction" className="border-2 border-black animate-bounce" />
            <div className="font-['Times_New_Roman'] text-lg">
              <p>Are you ready to surf the web?</p>
              <p className="text-red-600 font-bold blink">Create your presence now!</p>
            </div>
            <img src="https://picsum.photos/100/100?blur=2" alt="Spinning Globe" className="border-2 border-black animate-spin" style={{ animationDuration: '3s' }} />
          </div>

          <button 
            onClick={onStart}
            className="win95-btn px-8 py-4 text-xl font-bold font-['MS_Sans_Serif'] hover:bg-[#e0e0e0] active:border-inset"
          >
            ENTER SITE &gt;&gt;
          </button>
          
          <p className="text-xs text-gray-600 mt-8">Best viewed with Netscape Navigator 4.0 at 800x600 resolution.</p>
        </div>
      </div>
    </div>
  );
};

export default Intro;
