import { NoteType } from "./NoteType";

export interface NoteContextType {
  notes: NoteType[];
  deleteNote: (id: number) => void;
  addNote: (note: NoteType) => void;
  updateNote: (id: number, note: NoteType) => void;
  deleteAllNote: () => void;
}
