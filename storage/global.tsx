import { TEST_NUMBER } from "@/constants";
import { typingDefaultList } from "@/constants/data";
import { Folders, TypingSetsList, TypingWord } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as Crypto from "expo-crypto";
import useSupabaseClient from '@/app/utils/useSupabaseClient';

interface GlobalStore {
  isSignInVisible: boolean;
  setIsSignInVisible: (isSignInVisible: boolean) => void;

  folderId: string;
  setFolderId: (folderId: string) => void;
  getCurrentFolder: () => Folders | undefined;

  currentCharacterIndex: number;
  setNextCurrentCharacterIndex: (step?: number) => void;
  resetCurrentCharacterIndex: () => void;

  errorCharacter: string;
  setErrorCharacter: (errorCharacter: string) => void;
  getIsErrorActive: () => boolean;

  localWasInitialized: boolean;

  foldersLocal: TypingSetsList;
  currentFolderIdLocal: string;
  setCurrentFolderIdLocal: (localCurrentFolderId: string) => void;

  currentWordIdLocal: string;
  setCurrentWordIdLocal: (currentWordId: string) => void;

  editWordInFolder: (
    folderId: TypingWord["word"],
    wordId: TypingWord["id"],
    newWord: TypingWord["word"]
  ) => void;

  addWordToFolder: (
    folderId: TypingWord["id"],
    word: TypingWord["word"]
  ) => void;

  removeWordFromFolder: (
    folderId: TypingWord["id"],
    wordId: TypingWord["id"]
  ) => void;

  isPronounceNewWordActiveLocal: boolean;
  togglePronounceNewWordLocal: () => void;

  isWordSuccessfullyTyped: boolean;
  setIsWordSuccessfullyTyped: (isWordSuccessfullyTyped: boolean) => void;
}

export const useGlobalState = create<GlobalStore>()(
  persist(
    (set, get) => ({
      isSignInVisible: true,
      setIsSignInVisible: (isSignInVisible) => set({ isSignInVisible }),

      folderId: "0",
      setFolderId: (folderId) => set({ folderId }),
      getCurrentFolder: () =>
        get().foldersLocal.find(
          (item) => item.id === get().currentFolderIdLocal
        ),

      currentCharacterIndex: 0,
      setNextCurrentCharacterIndex: (step = 1) =>
        set({ currentCharacterIndex: get().currentCharacterIndex + step }),
      resetCurrentCharacterIndex: () => set({ currentCharacterIndex: 0 }),

      errorCharacter: "",
      setErrorCharacter: (errorCharacter) => set({ errorCharacter }),
      getIsErrorActive: () => get().errorCharacter !== "",

      localWasInitialized: false,

      foldersLocal: [],
      currentFolderIdLocal: "0",
      setCurrentFolderIdLocal: (currentFolderIdLocal) =>
        set({ currentFolderIdLocal }),

      currentWordIdLocal: "0",
      setCurrentWordIdLocal: (currentWordIdLocal) =>
        set({ currentWordIdLocal }),

      editWordInFolder: (folderId, wordId, newWord) => {
        const folders = get().foldersLocal;
        const folderIndex = folders.findIndex((item) => item.id === folderId);
        const folder = folders[folderIndex];
        if (folderIndex === -1) return;

        const wordIndex = folder.words.findIndex((item) => item.id === wordId);
        if (wordIndex === -1) return;

        folder.words[wordIndex].word = newWord;
        folders[folderIndex] = folder;
        set({ foldersLocal: folders });
      },

      addWordToFolder: (folderId, word) => {
        const folders = get().foldersLocal;
        const folderIndex = folders.findIndex((item) => item.id === folderId);
        if (folderIndex === -1) return;

        const UUID = Crypto.randomUUID();

        folders[folderIndex].words.push({ id: UUID, word });
        set({ foldersLocal: folders });
      },

      removeWordFromFolder: (folderId, wordId) => {
        const folders = get().foldersLocal;
        const folderIndex = folders.findIndex((item) => item.id === folderId);
        if (folderIndex === -1) return;

        const wordIndex = folders[folderIndex].words.findIndex(
          (item) => item.id === wordId
        );
        if (wordIndex === -1) return;

        folders[folderIndex].words.splice(wordIndex, 1);
        set({ foldersLocal: folders });
      },

      isWordSuccessfullyTyped: false,
      setIsWordSuccessfullyTyped: (isWordSuccessfullyTyped) =>
        set({ isWordSuccessfullyTyped }),

      isPronounceNewWordActiveLocal: true,
      togglePronounceNewWordLocal: () => {
        const currentState = get().isPronounceNewWordActiveLocal;

        set(() => ({
          isPronounceNewWordActiveLocal: !currentState,
        }));
      },
    }),
    {
      name: `global-storage${TEST_NUMBER}`,
      storage: createJSONStorage(() => AsyncStorage),

      partialize: (state) => ({
        localWasInitialized: state.localWasInitialized,
        foldersLocal: state.foldersLocal,
        currentFolderIdLocal: state.currentFolderIdLocal,
        currentWordIdLocal: state.currentWordIdLocal,
        isPronounceNewWordActiveLocal: state.isPronounceNewWordActiveLocal,
      }),

      onRehydrateStorage: () => {
        return async (storedState) => {

          const supabase = useSupabaseClient();


          if (storedState && !storedState.localWasInitialized) {
            useGlobalState.setState({
              localWasInitialized: true,
              foldersLocal: typingDefaultList,
            });
          }
        };
      },
    }
  )
);
