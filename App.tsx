import React, { useState, useCallback, useRef } from 'react';
import Intro from './components/Intro';
import WebcamCapture from './components/WebcamCapture';
import UserInfoForm from './components/UserInfoForm';
import LoadingScreen from './components/LoadingScreen';
import GeneratedSite from './components/GeneratedSite';
import { AppState, UserData, GeneratedSiteContent } from './types';
import { generateSiteContent, stylizeImage } from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INTRO);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [siteContent, setSiteContent] = useState<GeneratedSiteContent | null>(null);
  const [stylizedImage, setStylizedImage] = useState<string>('');
  
  // Ref to store the ongoing image processing promise
  const stylizedImagePromiseRef = useRef<Promise<string> | null>(null);

  const handleStart = () => {
    setAppState(AppState.CAMERA);
  };

  const handleCapture = (base64Image: string) => {
    setUserData(prev => prev ? { ...prev, rawImage: base64Image } : { 
      rawImage: base64Image, name: '', handle: '', interests: '', music: '', quote: '' 
    });
    
    // START OPTIMIZATION: Begin processing the image immediately in the background
    // while the user fills out the form. This makes the "Connecting" step much faster.
    stylizedImagePromiseRef.current = stylizeImage(base64Image);
    
    setAppState(AppState.FORM);
  };

  const handleFormSubmit = useCallback(async (data: Omit<UserData, 'rawImage'>) => {
    if (!userData?.rawImage) return;

    const fullUserData: UserData = { ...data, rawImage: userData.rawImage };
    setUserData(fullUserData);
    setAppState(AppState.PROCESSING);

    try {
      // Use the pre-started image promise if it exists, otherwise start it now.
      const imagePromise = stylizedImagePromiseRef.current || stylizeImage(userData.rawImage);

      // Execute requests (content generation runs in parallel with the tail end of image processing)
      const [content, image] = await Promise.all([
        generateSiteContent(fullUserData),
        imagePromise
      ]);

      setSiteContent(content);
      setStylizedImage(image);
      setAppState(AppState.RESULT);
    } catch (error) {
      console.error("Processing failed", error);
      setAppState(AppState.INTRO); 
      alert("Oops! The modem disconnected. Please try again.");
    }
  }, [userData]);

  return (
    <div className="min-h-screen">
      {appState === AppState.INTRO && <Intro onStart={handleStart} />}
      {appState === AppState.CAMERA && <WebcamCapture onCapture={handleCapture} />}
      {appState === AppState.FORM && <UserInfoForm onSubmit={handleFormSubmit} />}
      {appState === AppState.PROCESSING && <LoadingScreen />}
      {appState === AppState.RESULT && siteContent && (
        <GeneratedSite content={siteContent} userImage={stylizedImage} />
      )}
    </div>
  );
};

export default App;