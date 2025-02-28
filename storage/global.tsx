import { typingDefaultList } from "@/constants/data";
import { TypingSetsList } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface GlobalStore {
  folderId: string;
  setFolderId: (folderId: string) => void;

  currentCharacterIndex: number;
  setCurrentCharacterIndex: () => void;
  resetCurrentCharacterIndex: () => void;

  errorCharacter: string;
  setErrorCharacter: (errorCharacter: string) => void;
  getIsErrorActive: () => boolean;

  localStorageWasInitialized: boolean;
  localStorageFolders: TypingSetsList;
  localStorageCurrentFolderId: string;
  setLocalStorageCurrentFolderId: (localStorageCurrentFolderId: string) => void;
}

export const useGlobalState = create<GlobalStore>()(
  persist(
    (set, get) => ({
      folderId: "0",
      setFolderId: (folderId) => set({ folderId }),

      currentCharacterIndex: 0,
      setCurrentCharacterIndex: () =>
        set({ currentCharacterIndex: get().currentCharacterIndex + 1 }),
      resetCurrentCharacterIndex: () => set({ currentCharacterIndex: 0 }),

      errorCharacter: "",
      setErrorCharacter: (errorCharacter) => set({ errorCharacter }),
      getIsErrorActive: () => get().errorCharacter !== "",

      localStorageWasInitialized: false,
      localStorageFolders: [],
      localStorageCurrentFolderId: "0",
      setLocalStorageCurrentFolderId: (localStorageCurrentFolderId) =>
        set({ localStorageCurrentFolderId }),
    }),
    {
      name: "global-storage3",
      storage: createJSONStorage(() => AsyncStorage),

      partialize: (state) => ({
        localStorageWasInitialized: state.localStorageWasInitialized,
        localStorageFolders: state.localStorageFolders,
        localStorageCurrentFolderId: state.localStorageCurrentFolderId,
      }),

      onRehydrateStorage: () => {
        return (storedState) => {
          if (storedState && !storedState.localStorageWasInitialized) {
            useGlobalState.setState({
              localStorageWasInitialized: true,
              localStorageFolders: typingDefaultList,
            });
          }
        };
      },
    }
  )
);
