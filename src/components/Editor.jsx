import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import DOMPurify from 'dompurify';

const Editor = ({ activeNote, updateNote, toggleSidebar, theme, toggleTheme }) => {
  const [isSaving, setIsSaving] = useState(false);

  if (!activeNote) {
    return (
      <main className="workspace">
        <header className="top-bar">
          <button className="btn-icon" onClick={toggleSidebar}>☰</button>
          <button className="btn-theme" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </header>
        <div className="empty-workspace">
          <h2>Select a note, or create a new one.</h2>
        </div>
      </main>
    );
  }

  const sanitizedContent = DOMPurify.sanitize(activeNote.body);

  // Fakes a "Saving" UX interaction even though React auto-saves instantly
  const handleManualSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 800);
  };

  return (
    <main className="workspace">
      {/* New Top Navigation Bar */}
      <header className="top-bar">
        <div className="top-bar-left">
          <button className="btn-icon" onClick={toggleSidebar}>☰</button>
          <input
            type="text"
            className="title-input"
            value={activeNote.title}
            onChange={(e) => updateNote({ ...activeNote, title: e.target.value })}
            placeholder="Note Title"
          />
        </div>
        
        <div className="top-bar-right">
          <button className={`btn-save ${isSaving ? 'saving' : ''}`} onClick={handleManualSave}>
            {isSaving ? '✓ Saved' : '💾 Save'}
          </button>
          <button className="btn-theme" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </header>
      
      <div className="editor-container">
        <div className="editor-pane">
          <textarea
            className="markdown-input"
            value={activeNote.body}
            onChange={(e) => updateNote({ ...activeNote, body: e.target.value })}
            placeholder="Write your markdown here... Use # for headings."
          />
        </div>
        
        <div className="preview-pane">
          <div className="markdown-preview">
            <ReactMarkdown>{sanitizedContent}</ReactMarkdown>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Editor;