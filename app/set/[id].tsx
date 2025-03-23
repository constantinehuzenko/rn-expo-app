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
import { ScrollView, View } from "react-native";

// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "~/components/ui/dialog";

export default function Set() {
  const { localFolders } = useGlobalState();
  const { id } = useLocalSearchParams();
  const currentFolder = localFolders.find((item) => item.id === id);

  return (
    <PageWrapper safeArea={false}>
      {currentFolder ? (
        <>
          <Text className="text-2xl">{currentFolder?.name}</Text>
          <Text className="text-lg mb">{currentFolder?.description}</Text>
          <ScrollView className="w-full py-8">
            {currentFolder?.words.map(({ word }) => (
              <Card
                key={word}
                className="w-full mb-4 flex flex-row justify-between relative"
              >
                <CardHeader>
                  <CardTitle>{word}</CardTitle>
                </CardHeader>

                <View className="flex h-full">
                  <Button size="sm" variant="ghost" className="flex-1">
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

      {/* <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Text>Edit Profile</Text>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button>
                <Text>OK</Text>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </PageWrapper>
  );
}
