export interface UserData {
  name: string;
  handle: string;
  music: string;
  interests: string;
  quote: string;
  rawImage?: string; // base64
}

export interface GeneratedSiteContent {
  pageTitle: string;
  welcomeMessage: string;
  aboutMeHtml: string;
  blinkText: string;
  webringName: string;
  coolLinks: { title: string; url: string }[];
  guestbookEntries: { name: string; message: string; date: string }[];
  musicTrack: string; // Just a title
}

export enum AppState {
  INTRO = 'INTRO',
  CAMERA = 'CAMERA',
  FORM = 'FORM',
  PROCESSING = 'PROCESSING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}
