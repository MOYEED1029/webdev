import { useState, useEffect } from 'react';
import { Trash2, Edit2, Plus } from 'lucide-react';

export default function StickyNotesApp() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleAdd = () => {
    if (newNote.trim()) {
      if (editingId !== null) {
        setNotes(notes.map(note => note.id === editingId ? { ...note, text: newNote } : note));
        setEditingId(null);
      } else {
        setNotes([...notes, { id: Date.now(), text: newNote }]);
      }
      setNewNote('');
    }
  };

  const handleDelete = id => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleEdit = note => {
    setNewNote(note.text);
    setEditingId(note.id);
  };

  const filteredNotes = notes.filter(note => note.text.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-200 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">Sticky Notes</h1>
        <div className="flex gap-4 mb-6">
          <input
            className="flex-1 p-2 rounded border"
            placeholder="Search notes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-4 mb-6">
          <input
            className="flex-1 p-2 rounded border"
            placeholder="Write a note..."
            value={newNote}
            onChange={e => setNewNote(e.target.value)}
          />
          <button onClick={handleAdd} className="bg-yellow-400 px-4 py-2 rounded text-white">
            <Plus className="inline-block w-4 h-4 mr-1" />
            {editingId ? 'Update' : 'Add'}
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map(note => (
            <div key={note.id} className="bg-yellow-100 border-yellow-300 shadow-xl p-4 rounded">
              <p className="text-md text-gray-800 break-words mb-4">{note.text}</p>
              <div className="flex justify-end gap-2">
                <button onClick={() => handleEdit(note)} className="text-blue-600">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(note.id)} className="text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
