export interface TypingWords {
  id: number;
  word: string;
}

export interface TypingSet {
  id: number;
  name: string;
  description?: string;
  words: TypingWords[];
}

export type TypingSetsList = TypingSet[];
