
export enum AppView {
  LOBBY = 'LOBBY',
  PRACTICE = 'PRACTICE',
  DUEL = 'DUEL',
  HISTORY = 'HISTORY',
  LEADERBOARD = 'LEADERBOARD',
  RESULTS = 'RESULTS'
}

export interface RecognitionResult {
  objectName: string;
  translations: {
    en: string;
    fr: string;
    zh: string;
  };
  confidence: number;
}

export interface UserStats {
  globalRank: number;
  winLoss: string;
  winRate: number;
  xp: number;
  streak: number;
  level: number;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  image: string;
  data: RecognitionResult;
}

export interface QuizQuestion {
  imageUrl: string;
  correctAnswer: string;
  options: string[];
  targetLanguage: 'French' | 'Chinese' | 'English';
  pronunciation?: string;
}
