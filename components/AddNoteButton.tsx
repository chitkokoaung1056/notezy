import { useNote } from "@/hooks/useNote";
import { NoteType } from "@/types/NoteType";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { Pressable, View } from "react-native";

const AddNoteButton = () => {
  const { notes, addNote } = useNote();

  const handleAddNote = () => {
    const newNote: NoteType = {
      id: notes.length > 0 ? Math.max(...notes.map((n) => n.id)) + 1 : 1,
      title: "",
      description: "",
      isPinned: false,
      createdAt: new Date(),
    };

    addNote(newNote);
    router.push(`/notes/${newNote.id}`);
  };

  return (
    <Pressable
      className="absolute bottom-10 right-8 z-50 active:opacity-70"
      onPress={handleAddNote}>
      <View className="bg-yellow-500 dark:bg-yellow-600 w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
        <AntDesign name="plus" size={28} color="white" />
      </View>
    </Pressable>
  );
};

export default AddNoteButton;
