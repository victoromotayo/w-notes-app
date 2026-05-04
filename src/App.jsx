import { useState } from 'react';
import { useNotes } from './hooks/useNotes';
import { useTheme } from './hooks/useTheme';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import './styles.css';

const App = () => {
  const { notes, activeNote, setActiveNoteId, createNote, deleteNote, updateNote } = useNotes();
  const { theme, toggleTheme } = useTheme();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="app-layout">
      <Sidebar 
        notes={notes}
        activeNote={activeNote}
        setActiveNoteId={setActiveNoteId}
        createNote={createNote}
        deleteNote={deleteNote}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar} /* <--- Added this line */
      />
      
      <Editor 
        activeNote={activeNote}
        updateNote={updateNote}
        toggleSidebar={toggleSidebar}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </div>
  );
};

export default App;