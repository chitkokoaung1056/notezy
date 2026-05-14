import { NoteType } from "@/types/NoteType";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeNoteData = async (notes: NoteType[]) => {
  try {
    const jsonValue = JSON.stringify(notes);
    await AsyncStorage.setItem("notes", jsonValue);
  } catch (e) {
    console.error("Error storing note data:", e);
  }
};

export const getNoteData = async (): Promise<NoteType[] | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem("notes");
    if (!jsonValue) return null;

    // Convert createdAt strings back to Date
    const parsed: NoteType[] = JSON.parse(jsonValue).map((n: any) => ({
      ...n,
      createdAt: new Date(n.createdAt),
    }));

    return parsed;
  } catch (e) {
    console.error("Error retrieving note data:", e);
    return null;
  }
};
