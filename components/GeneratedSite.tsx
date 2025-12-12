import React, { useState } from 'react';
import { GeneratedSiteContent } from '../types';

interface GeneratedSiteProps {
  content: GeneratedSiteContent;
  userImage: string;
}

const GeneratedSite: React.FC<GeneratedSiteProps> = ({ content, userImage }) => {
  const [visitorCount, setVisitorCount] = useState(1337);

  // Background pattern: Starfield
  const bgPattern = `
    radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 3px),
    radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 2px),
    radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 3px)
  `;
  const bgSize = '550px 550px, 350px 350px, 250px 250px';
  const bgPos = '0 0, 40px 60px, 130px 270px';

  return (
    <div 
      className="min-h-screen text-white font-['Times_New_Roman'] overflow-x-hidden"
      style={{
        backgroundColor: 'black',
        backgroundImage: bgPattern,
        backgroundSize: bgSize,
        backgroundPosition: bgPos
      }}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row min-h-screen border-l-2 border-r-2 border-gray-600 bg-black/80">
        
        {/* Sidebar */}
        <div className="w-full md:w-48 bg-[url('https://picsum.photos/200/600?blur=10')] bg-repeat-y border-r-4 border-yellow-400 p-4 text-center">
          <h3 className="font-['Comic_Sans_MS'] text-yellow-300 font-bold mb-4 underline decoration-wavy">Navigation</h3>
          <ul className="space-y-4 text-sm font-bold text-cyan-300">
            <li><a href="#" className="hover:text-white hover:bg-blue-800 p-1 block border border-transparent hover:border-white">:: Home ::</a></li>
            <li><a href="#" className="hover:text-white hover:bg-blue-800 p-1 block border border-transparent hover:border-white">:: About Me ::</a></li>
            <li><a href="#" className="hover:text-white hover:bg-blue-800 p-1 block border border-transparent hover:border-white">:: My Pics ::</a></li>
            <li><a href="#" className="hover:text-white hover:bg-blue-800 p-1 block border border-transparent hover:border-white">:: Webring ::</a></li>
            <li><a href="#" className="hover:text-white hover:bg-blue-800 p-1 block border border-transparent hover:border-white">:: E-Mail Me ::</a></li>
          </ul>
          
          <div className="mt-8">
            <img src="https://picsum.photos/88/31?random=1" alt="Valid HTML" className="mx-auto mb-2" />
            <img src="https://picsum.photos/88/31?random=2" alt="IE 5.0" className="mx-auto" />
          </div>

          <div className="mt-8 border-2 border-dashed border-red-500 p-2 bg-black">
             <p className="text-xs text-red-500 font-bold blink">DON'T CLICK HERE</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-7xl font-['Press_Start_2P'] text-transparent bg-clip-text bg-gradient-to-b from-yellow-400 via-red-500 to-purple-600 drop-shadow-[4px_4px_0_rgba(255,255,255,0.5)] mb-4">
              {content.pageTitle}
            </h1>
            <div className="marquee-container w-3/4 mx-auto bg-blue-900 border border-white text-yellow-300 font-mono">
              <div className="marquee-content">
                 *** {content.blinkText} *** Welcome to my corner of the web *** peace love and unity ***
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Left Col: Photo & Intro */}
            <div className="space-y-6">
              <div className="win95-box p-1 bg-gray-300 inline-block rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src={userImage} 
                  alt="Me" 
                  className="win95-inset border-4 border-white max-w-full h-auto object-cover" 
                  style={{ filter: 'contrast(1.2) saturation(1.2)' }}
                />
                <p className="text-center text-black font-['Comic_Sans_MS'] font-bold text-xs mt-1">Me_IRL_2000.jpg</p>
              </div>

              <div className="bg-black border-2 border-green-500 p-4 shadow-[5px_5px_0_#00FF00]">
                 <h2 className="text-green-500 font-['Courier_New'] font-bold text-xl mb-2">&gt; WHO_AM_I?</h2>
                 <p className="text-green-300 font-['Courier_New'] text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: content.aboutMeHtml }} />
              </div>
            </div>

            {/* Right Col: Stuff */}
            <div className="space-y-6">
              <div className="bg-purple-900/50 border-4 border-double border-purple-400 p-4 text-center">
                <h2 className="text-2xl font-['Comic_Sans_MS'] text-pink-300 mb-2">~*~ {content.welcomeMessage} ~*~</h2>
                <hr className="border-purple-400 mb-2"/>
                <p className="text-sm">
                   Now playing: <span className="text-yellow-300 font-bold">{content.musicTrack}</span>
                   <span className="inline-block w-2 h-2 bg-red-500 rounded-full ml-2 animate-pulse"></span>
                </p>
              </div>

              <div className="bg-white text-black p-4 font-['Arial'] border-t-4 border-blue-600">
                <h3 className="font-bold text-blue-800 text-lg mb-2">My Cool Links:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {content.coolLinks.map((link, i) => (
                    <li key={i}>
                      <a href={link.url} target="_blank" rel="noreferrer" className="text-blue-600 underline hover:text-red-500 hover:decoration-wavy">
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-yellow-100 text-black border-2 border-orange-500 p-2 transform -rotate-1">
                 <h3 className="text-center font-bold text-orange-600 border-b border-orange-400 mb-2">Guestbook</h3>
                 <div className="h-32 overflow-y-auto font-['Comic_Sans_MS'] text-xs space-y-2 pr-1 custom-scrollbar">
                   {content.guestbookEntries.length > 0 ? content.guestbookEntries.map((entry, i) => (
                     <div key={i} className="bg-white p-1 border border-yellow-300">
                       <span className="font-bold text-blue-600">{entry.name}</span> <span className="text-gray-500">({entry.date})</span>:
                       <br/>
                       "{entry.message}"
                     </div>
                   )) : <p>No signatures yet! Be the first!</p>}
                 </div>
                 <div className="text-center mt-2">
                    <button className="underline text-blue-600 text-xs">[Sign Guestbook]</button>
                 </div>
              </div>
            </div>
          </div>

          {/* Footer / Webring */}
          <div className="mt-12 text-center pb-8">
            <div className="inline-block bg-gray-800 border-2 border-gray-500 p-2">
               <p className="text-xs text-gray-400 mb-2">Proud Member of:</p>
               <h4 className="text-xl font-['Press_Start_2P'] text-cyan-400 mb-2">{content.webringName}</h4>
               <div className="flex justify-center gap-4 text-xs text-yellow-200">
                 <a href="#">[Prev]</a>
                 <a href="#">[Hub]</a>
                 <a href="#">[Random]</a>
                 <a href="#">[Next]</a>
               </div>
            </div>
            
            <div className="mt-8">
               <div className="inline-block bg-black border border-white px-2 py-1 font-mono text-red-500 font-bold tracking-widest text-lg">
                 {String(visitorCount).padStart(6, '0')}
               </div>
               <p className="text-xs mt-1 text-gray-500">Visitors since 1999</p>
            </div>
            
            <p className="text-xs text-gray-600 mt-8">
              (c) 2000 {content.pageTitle}. Hosted by GeoCities. <br/>
              Created with React & Gemini NanoBanana.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratedSite;
