export interface TypingWords {
  id: string;
  word: string;
}

export interface Folders {
  id: string;
  name: string;
  description?: string;
  words: TypingWords[];
}

export type TypingSetsList = Folders[];
