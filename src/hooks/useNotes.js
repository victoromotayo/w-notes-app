import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useNotes = () => {
  // 1. Initialize state with robust error handling
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('w-notes-pro-data');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
      }
      return [];
    } catch (error) {
      console.error("Storage Error:", error);
      return [];
    }
  });

  const [activeNoteId, setActiveNoteId] = useState(null);

  // 2. Sync to local storage automatically
  useEffect(() => {
    localStorage.setItem('w-notes-pro-data', JSON.stringify(notes));
  }, [notes]);

  // 3. Auto-select a note if none is selected
  useEffect(() => {
    if (notes.length > 0 && !activeNoteId) {
      setActiveNoteId(notes[0].id);
    } else if (notes.length === 0) {
      setActiveNoteId(null);
    }
  }, [notes, activeNoteId]);

  // 4. CRUD Operations
  const createNote = () => {
    const newNote = {
      id: uuidv4(), // Cryptographically secure ID
      title: 'Untitled Note',
      body: '# New Note\n\nStart typing here...',
      lastModified: Date.now(),
    };
    
    setNotes((prev) => [newNote, ...prev]);
    setActiveNoteId(newNote.id);
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const updateNote = (updatedNote) => {
    setNotes((prev) =>
      prev.map((note) => {
        if (note.id === updatedNote.id) {
          return { ...updatedNote, lastModified: Date.now() };
        }
        return note;
      })
    );
  };

  const activeNote = notes.find((n) => n.id === activeNoteId);

  return {
    notes,
    activeNote,
    setActiveNoteId,
    createNote,
    deleteNote,
    updateNote
  };
};