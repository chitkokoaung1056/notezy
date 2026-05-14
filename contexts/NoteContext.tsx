import { getNoteData, storeNoteData } from "@/lib/noteStorage";
import { NoteContextType } from "@/types/NoteContextType";
import { NoteType } from "@/types/NoteType";
import React, { createContext, useEffect, useState } from "react";

export const NoteContext = createContext<NoteContextType | null>(null);

const NoteProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<NoteType[]>([]);

  // Load notes on mount
  useEffect(() => {
    const fetchNotes = async () => {
      const storedNotes = await getNoteData();
      if (storedNotes) setNotes(storedNotes);
    };
    fetchNotes();
  }, []);

  // Save notes whenever they change
  useEffect(() => {
    storeNoteData(notes);
  }, [notes]);

  const deleteNote = (id: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const addNote = (note: NoteType) => {
    setNotes((prevNotes) => [note, ...prevNotes]);
  };

  const updateNote = (id: number, note: NoteType) => {
    setNotes((prevNotes) =>
      prevNotes.map((n) => (n.id === id ? { ...n, ...note } : n))
    );
  };

  const deleteAllNote = () => {
    setNotes([]);
  };

  return (
    <NoteContext
      value={{ notes, deleteNote, addNote, updateNote, deleteAllNote }}
    >
      {children}
    </NoteContext>
  );
};

export default NoteProvider;
