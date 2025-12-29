
export interface Question {
  id: number;
  text: string;
  textZh: string;
  answer: string;
  answerZh: string;
  options: string[];
  optionsZh: string[];
}

export enum GameStatus {
  START = 'START',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED'
}

export type Language = 'en' | 'zh';
