import { typingDefaultList } from "@/constants/data";
import { TypingSetsList } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface GlobalStore {
  folderId: string;
  setFolderId: (folderId: string) => void;

  currentCharacterIndex: number;
  setNextCurrentCharacterIndex: (step?: number) => void;
  resetCurrentCharacterIndex: () => void;

  errorCharacter: string;
  setErrorCharacter: (errorCharacter: string) => void;
  getIsErrorActive: () => boolean;

  localWasInitialized: boolean;

  localFolders: TypingSetsList;
  localCurrentFolderId: string;
  setLocalStorageCurrentFolderId: (localCurrentFolderId: string) => void;

  localCurrentWordId: string;
  setLocalCurrentWordId: (currentWordId: string) => void;
}

export const useGlobalState = create<GlobalStore>()(
  persist(
    (set, get) => ({
      folderId: "0",
      setFolderId: (folderId) => set({ folderId }),

      currentCharacterIndex: 0,
      setNextCurrentCharacterIndex: (step = 1) =>
        set({ currentCharacterIndex: get().currentCharacterIndex + step }),
      resetCurrentCharacterIndex: () => set({ currentCharacterIndex: 0 }),

      errorCharacter: "",
      setErrorCharacter: (errorCharacter) => set({ errorCharacter }),
      getIsErrorActive: () => get().errorCharacter !== "",

      localWasInitialized: false,

      localFolders: [],
      localCurrentFolderId: "0",
      setLocalStorageCurrentFolderId: (localCurrentFolderId) =>
        set({ localCurrentFolderId }),

      localCurrentWordId: "",
      setLocalCurrentWordId: (localCurrentWordId) =>
        set({ localCurrentWordId }),
    }),
    {
      name: "global-storage3",
      storage: createJSONStorage(() => AsyncStorage),

      partialize: (state) => ({
        localWasInitialized: state.localWasInitialized,
        localFolders: state.localFolders,
        localCurrentFolderId: state.localCurrentFolderId,
        localCurrentWordId: state.localCurrentWordId,
      }),

      onRehydrateStorage: () => {
        return (storedState) => {
          if (storedState && !storedState.localWasInitialized) {
            useGlobalState.setState({
              localWasInitialized: true,
              localFolders: typingDefaultList,
            });
          }
        };
      },
    }
  )
);
