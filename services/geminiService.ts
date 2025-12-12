import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedSiteContent, UserData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Using 'gemini-2.5-flash-image' (NanoBanana) to stylize the image
export const stylizeImage = async (base64Image: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image.split(',')[1], // Remove header
            },
          },
          {
            text: 'Transform this webcam selfie into a nostalgic early 2000s cyber-y2k aesthetic image. Make it look like a low-resolution digital camera photo or a webcam picture from 2000. Add some digital grain, high contrast, and maybe a subtle neon or glitch effect. Keep the face recognizable.',
          },
        ],
      },
    });

    // Extract the generated image
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    // Fallback if no image is returned (rare but possible)
    return base64Image;
  } catch (error) {
    console.error("Error stylizing image:", error);
    // Return original if styling fails so the flow doesn't break
    return base64Image;
  }
};

// Using 'gemini-2.5-flash' to generate text content JSON
export const generateSiteContent = async (userData: UserData): Promise<GeneratedSiteContent> => {
  const prompt = `
    You are a webmaster from the year 2000. Generate the content for a GeoCities personal homepage based on this user:
    Name: ${userData.name}
    Handle: ${userData.handle}
    Interests: ${userData.interests}
    Music: ${userData.music}
    Quote: ${userData.quote}

    The tone should be extremely nostalgic, using early 2000s internet slang (lol, rofl, l33t, n00b, xD).
    Return ONLY valid JSON with this schema:
    {
      "pageTitle": "string (e.g. xX_DarkAngel_Xx's Realm)",
      "welcomeMessage": "string (short intro)",
      "aboutMeHtml": "string (HTML with <br>, <b>, <i>, <font color=...>. Make it chaotic and fun. No <div> or complex structure, just inline formatting.)",
      "blinkText": "string (something urgent or random)",
      "webringName": "string",
      "coolLinks": [{"title": "string", "url": "string"}],
      "guestbookEntries": [{"name": "string", "message": "string", "date": "string (circa 1999-2001)"}],
      "musicTrack": "string (a popular song from 1998-2000)"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            pageTitle: { type: Type.STRING },
            welcomeMessage: { type: Type.STRING },
            aboutMeHtml: { type: Type.STRING },
            blinkText: { type: Type.STRING },
            webringName: { type: Type.STRING },
            coolLinks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  url: { type: Type.STRING }
                }
              }
            },
            guestbookEntries: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  message: { type: Type.STRING },
                  date: { type: Type.STRING }
                }
              }
            },
            musicTrack: { type: Type.STRING }
          }
        }
      }
    });
    
    if (response.text) {
        return JSON.parse(response.text) as GeneratedSiteContent;
    }
    throw new Error("No text response");
  } catch (error) {
    console.error("Error generating site content:", error);
    // Fallback data
    return {
      pageTitle: "My Cyber Home",
      welcomeMessage: "Welcome to my digital soul!",
      aboutMeHtml: "I love <b>computers</b> and <i>pizza</i>!",
      blinkText: "NEW PHOTOS UPLOADED!",
      webringName: "The Cool Kids Webring",
      coolLinks: [{ title: "Google", url: "http://google.com" }],
      guestbookEntries: [],
      musicTrack: "Sandstorm - Darude"
    };
  }
};
