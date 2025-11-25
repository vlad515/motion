export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export interface CatProfile {
  id: number;
  name: string;
  role: string;
  image: string;
}

export enum Section {
  HERO = 'hero',
  ABOUT = 'about',
  FEED = 'feed',
  CHAT = 'chat',
  CATS = 'cats',
}