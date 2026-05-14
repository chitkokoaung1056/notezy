import { useNote } from "@/hooks/useNote";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Note = () => {
  const { notes, updateNote, deleteNote } = useNote();
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const note = notes.find((n) => n.id === Number(id));
  if (!note) return null;

  const [titleInput, setTitleInput] = useState(note.title);
  const [descriptionInput, setDescriptionInput] = useState(note.description);

  // Update note whenever inputs change
  useEffect(() => {
    if (note) {
      updateNote(note.id, {
        ...note,
        title: titleInput,
        description: descriptionInput,
      });
    }
  }, [titleInput, descriptionInput]);

  // Delete note if leaving screen and both title/desc are empty
  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      if (note && titleInput.trim() === "" && descriptionInput.trim() === "") {
        deleteNote(note.id);
      }
    });
    return unsubscribe;
  }, [navigation, note, titleInput, descriptionInput]);

  return (
    <KeyboardAwareScrollView
      className="flex-1 bg-blue-50 px-6 dark:bg-slate-800"
      enableOnAndroid
      keyboardOpeningTime={0}
      extraScrollHeight={Platform.OS === "android" ? 260 : 100}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-1 mb-28">
        <TextInput
          multiline
          value={titleInput}
          onChangeText={setTitleInput}
          placeholder="Title"
          className="text-2xl font-semibold mb-2 text-gray-900 dark:text-slate-100"
          placeholderTextColor="#9CA3AF"
        />

        <Text className="text-sm text-gray-500 mb-3 ms-1 dark:text-slate-300">
          {note.createdAt.toDateString()} {note.createdAt.toLocaleTimeString()}
        </Text>

        <TextInput
          value={descriptionInput}
          multiline
          onChangeText={setDescriptionInput}
          className="flex-1 text-lg text-gray-800 dark:text-slate-300"
          textAlignVertical="top"
          placeholder="Write your note..."
          placeholderTextColor="#9CA3AF"
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Note;
