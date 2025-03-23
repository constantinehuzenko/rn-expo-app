export interface TypingWord {
  id: string;
  word: string;
}

export interface Folders {
  id: string;
  name: string;
  description?: string;
  words: TypingWord[];
}

export type TypingSetsList = Folders[];
