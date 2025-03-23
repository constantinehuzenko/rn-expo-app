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
import { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";

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

export default function Set() {
  const { foldersLocal, editWordInFolder } = useGlobalState();
  const { id: folderId } = useLocalSearchParams();
  const [editingModalOpen, setEditingModalOpen] = useState(false);
  const [editingWordId, setEditingWordId] = useState("");
  const [inputValue, setInputValue] = useState("");

  const currentFolder = foldersLocal.find((item) => item.id === folderId);
  const currentEditingWord = currentFolder?.words.find(
    (item) => item.id === editingWordId
  )?.word;

  useEffect(() => {
    setInputValue(currentEditingWord ?? "");
  }, [currentEditingWord]);

  return (
    <PageWrapper safeArea={false}>
      {currentFolder ? (
        <>
          <Text className="text-2xl">{currentFolder?.name}</Text>
          <Text className="text-lg mb">{currentFolder?.description}</Text>
          <ScrollView className="w-full py-8">
            {currentFolder?.words.map(({ word, id }) => (
              <Card
                key={word}
                className="w-full mb-4 flex flex-row justify-between relative"
              >
                <CardHeader>
                  <CardTitle>{word}</CardTitle>
                </CardHeader>

                <View className="flex h-full">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="flex-1"
                    onPress={() => {
                      setEditingWordId(id);
                      setEditingModalOpen(true);
                    }}
                  >
                    <Text>✏️</Text>
                  </Button>
                </View>
              </Card>
            ))}
          </ScrollView>
        </>
      ) : (
        <Text>Folder not found</Text>
      )}
      {/* <Button>
        <Text>💪 Type</Text>
      </Button> */}

      <Dialog open={editingModalOpen} onOpenChange={setEditingModalOpen}>
        <DialogContent className="w-screen">
          <DialogHeader>
            <DialogTitle>Edit word</DialogTitle>
          </DialogHeader>
          <View>
            <Input
              value={inputValue}
              placeholder="Enter the word"
              className="mb-4"
              autoFocus
              onChangeText={setInputValue}
            />
          </View>
          <DialogFooter>
            <Button
              onPress={() => {
                setEditingModalOpen(false);
                editWordInFolder(folderId as string, editingWordId, inputValue);
              }}
            >
              <Text>Save</Text>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageWrapper>
  );
}
