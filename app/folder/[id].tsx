import { PageWrapper } from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useGlobalState } from "@/storage/global";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import * as DialogPrimitive from "@rn-primitives/dialog";

export default function Folder() {
  const {
    foldersLocal,
    editWordInFolder,
    addWordToFolder,
    removeWordFromFolder,
  } = useGlobalState();
  const { id: folderId } = useLocalSearchParams();
  const [editingModalOpen, setEditingModalOpen] = useState(false);
  const [editingWordId, setEditingWordId] = useState("");
  const [editingInputValue, setEditingInputValue] = useState("");

  const [addingModalOpen, setAddingModalOpen] = useState(false);
  const [addingInputValue, setAddingInputValue] = useState("");

  const currentFolder = foldersLocal.find((item) => item.id === folderId);
  const currentEditingWord = currentFolder?.words.find(
    (item) => item.id === editingWordId
  )?.word;

  const onAddPress = () => {
    setAddingModalOpen(true);
  };

  useEffect(() => {
    setEditingInputValue(currentEditingWord ?? "");
  }, [currentEditingWord]);

  return (
    <>
      <PageWrapper safeArea={false}>
        {currentFolder ? (
          <>
            <Text className="text-2xl">{currentFolder?.name}</Text>
            <Text className="text-lg mb">{currentFolder?.description}</Text>
            <ScrollView className="w-full py-8">
              {currentFolder?.words.map(({ word, id }) => (
                <Card
                  key={word}
                  className="w-full relative mb-4 flex flex-row justify-between p-0"
                >
                  <CardHeader className="">
                    <CardTitle>{word}</CardTitle>
                  </CardHeader>

                  <CardContent className="absolute z-10 right-0 top-0 h-full p-0 flex flex-row items-center gap-4">
                    <Button
                      size="icon"
                      variant="ghost"
                      onPress={() => {
                        removeWordFromFolder(folderId as string, id);
                      }}
                      className="h-full"
                    >
                      <Text>🗑️</Text>
                    </Button>

                    <Button
                      size="icon"
                      variant="ghost"
                      onPress={() => {
                        setEditingWordId(id ?? "");
                        setEditingModalOpen(true);
                      }}
                      className="h-full mr-2"
                    >
                      <Text>✏️</Text>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </ScrollView>

            <SafeAreaView className="w-full">
              <Button onPress={onAddPress} className="w-full">
                <Text>➕ Add</Text>
              </Button>
            </SafeAreaView>
          </>
        ) : (
          <Text>Folder not found</Text>
        )}

        {/* <DialogPrimitive.Root>
        <DialogPrimitive.Trigger>
          <Text>Show Dialog</Text>
        </DialogPrimitive.Trigger>

        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay>
            <DialogPrimitive.Content>
              <DialogPrimitive.Title>Dialog Title</DialogPrimitive.Title>
              <DialogPrimitive.Description>
                Dialog description.
              </DialogPrimitive.Description>
              <DialogPrimitive.Close>
                <Text>Close</Text>
              </DialogPrimitive.Close>
            </DialogPrimitive.Content>
          </DialogPrimitive.Overlay>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root> */}

        <Dialog open={addingModalOpen} onOpenChange={setAddingModalOpen}>
          <DialogContent className="w-screen">
            <DialogHeader>
              <DialogTitle>Add word</DialogTitle>
            </DialogHeader>
            <View>
              <Input
                value={addingInputValue}
                placeholder="Enter the word"
                className="mb-4"
                autoFocus
                onChangeText={setAddingInputValue}
                autoCapitalize="none"
              />
            </View>
            <DialogFooter>
              <Button
                onPress={() => {
                  setAddingModalOpen(false);
                  addWordToFolder(folderId as string, addingInputValue);
                  setAddingInputValue("");
                }}
              >
                <Text>Save</Text>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageWrapper>

      <DialogPrimitive.Root
        open={editingModalOpen}
        onOpenChange={setEditingModalOpen}
      >
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay
            closeOnPress={true}
            className=" border-yellow-400 border-2 h-full w-full"
          >
            <DialogPrimitive.Content className="w-screen border-red-600 border-2 absolute top-0 left-0 h-5">
              <DialogPrimitive.Title>Edit word</DialogPrimitive.Title>
              <View>
                <Input
                  value={editingInputValue}
                  placeholder="Enter the word"
                  className="mb-4"
                  autoFocus
                  onChangeText={setEditingInputValue}
                  autoCapitalize="none"
                />
              </View>
              {/* <DialogFooter> */}
              <Button
                onPress={() => {
                  setEditingModalOpen(false);
                  editWordInFolder(
                    folderId as string,
                    editingWordId,
                    editingInputValue
                  );
                }}
              >
                <Text>Save</Text>
              </Button>
              {/* </DialogFooter> */}
            </DialogPrimitive.Content>
          </DialogPrimitive.Overlay>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
}
