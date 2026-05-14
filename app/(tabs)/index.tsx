import NoteImage from "@/assets/img/noteImage.png";
import AddNoteButton from "@/components/AddNoteButton";
import NoteComponent from "@/components/NoteComponent";
import SearchBar from "@/components/SearchBar";
import { useNote } from "@/hooks/useNote";
import useSearchBar from "@/hooks/useSearchBar";
import { NoteType } from "@/types/NoteType";
import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { notes } = useNote();
  const { searchBarValue } = useSearchBar();

  const sortedNotes: NoteType[] = useMemo(() => {
    return [...notes].sort((a, b) => Number(b.isPinned) - Number(a.isPinned));
  }, [notes]);

  const [displayedNotes, setDisplayedNotes] = useState<NoteType[]>(sortedNotes);

  useEffect(() => {
    if (searchBarValue.trim() === "") {
      setDisplayedNotes(sortedNotes);
    } else {
      const filteredNotes = sortedNotes.filter((note) =>
        note.title.toLowerCase().includes(searchBarValue.toLowerCase())
      );
      setDisplayedNotes(filteredNotes);
    }
  }, [searchBarValue, sortedNotes, notes]);

  const firstNormalIndex = displayedNotes.findIndex((n) => !n.isPinned);
  const hasPinned = displayedNotes.some((n) => n.isPinned);
  const hasNormal = displayedNotes.some((n) => !n.isPinned);

  return (
    <SafeAreaView className="flex-1 px-4 bg-blue-50 dark:bg-slate-800 relative z-0">
      <SearchBar />
      <AddNoteButton />

      {displayedNotes.length !== 0 ? (
        <FlatList
          className="mt-6"
          data={displayedNotes}
          keyboardDismissMode="on-drag"
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <>
              {hasPinned && index === 0 && (
                <Text className="font-extrabold mt-2 mb-2 text-gray-700 dark:text-white">
                  📌 Pinned Notes
                </Text>
              )}

              {hasNormal && index === firstNormalIndex && (
                <Text className="font-extrabold mt-6 mb-2 text-gray-700 dark:text-white">
                  All Notes
                </Text>
              )}

              <NoteComponent {...item} />
            </>
          )}
          ItemSeparatorComponent={() => <View className="h-3.5" />}
        />
      ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 justify-center items-center">
            <Image
              source={NoteImage}
              className="w-36 h-36 mb-5"
              resizeMode="contain"
            />
            <Text className="text-slate-500 text-lg">No Notes Here yet...</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    </SafeAreaView>
  );
};

export default Home;
