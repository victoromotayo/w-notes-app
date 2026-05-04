const Sidebar = ({ notes, activeNote, setActiveNoteId, createNote, deleteNote, isOpen, toggleSidebar }) => {
    return (
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="brand">
            <div className="brand-badge">W.</div>
            <h2>Notes Pro</h2>
          </div>
          <div className="header-actions">
            <button className="btn-add" onClick={createNote} title="New Note">+</button>
            
            {/* This button ONLY appears on mobile screens */}
            <button className="btn-close-mobile" onClick={toggleSidebar} title="Close Sidebar">✕</button>
          </div>
        </div>
        
        <div className="notes-list">
          {notes.length === 0 ? (
            <p className="empty-sidebar">Click the + to create a note.</p>
          ) : (
            notes.map((note) => (
              <div 
                key={note.id} 
                className={`note-card ${activeNote && note.id === activeNote.id ? 'active' : ''}`}
                onClick={() => setActiveNoteId(note.id)}
              >
                <div className="note-card-title">
                  <strong>{note.title || 'Untitled Note'}</strong>
                  <button 
                    className="btn-delete" 
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote(note.id);
                    }}
                    title="Delete Note"
                  >✕</button>
                </div>
                <p className="note-card-preview">
                  {note.body ? note.body.substring(0, 40) + '...' : 'Empty note...'}
                </p>
              </div>
            ))
          )}
        </div>
      </aside>
    );
  };
  
  export default Sidebar;