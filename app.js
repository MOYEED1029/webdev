let notes = JSON.parse(localStorage.getItem('notes')) || [];
let editingId = null;

const noteInput = document.getElementById('noteInput');
const addBtn = document.getElementById('addBtn');
const notesContainer = document.getElementById('notesContainer');
const searchInput = document.getElementById('searchInput');

function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

function renderNotes(filter = '') {
  notesContainer.innerHTML = '';
  notes
    .filter(note => note.text.toLowerCase().includes(filter.toLowerCase()))
    .forEach(note => {
      const card = document.createElement('div');
      card.className = 'bg-yellow-100 border border-yellow-300 p-4 rounded-lg shadow-lg flex flex-col justify-between';

      const text = document.createElement('p');
      text.className = 'text-gray-800 mb-4 break-words';
      text.textContent = note.text;

      const actions = document.createElement('div');
      actions.className = 'flex justify-end gap-2';

      const editBtn = document.createElement('button');
      editBtn.className = 'text-blue-600 hover:underline';
      editBtn.textContent = 'Edit';
      editBtn.onclick = () => {
        noteInput.value = note.text;
        editingId = note.id;
        addBtn.textContent = 'Update';
      };

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'text-red-600 hover:underline';
      deleteBtn.textContent = 'Delete';
      deleteBtn.onclick = () => {
        notes = notes.filter(n => n.id !== note.id);
        saveNotes();
        renderNotes(searchInput.value);
      };

      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);

      card.appendChild(text);
      card.appendChild(actions);
      notesContainer.appendChild(card);
    });
}

addBtn.onclick = () => {
  const value = noteInput.value.trim();
  if (!value) return;

  if (editingId) {
    notes = notes.map(n => (n.id === editingId ? { ...n, text: value } : n));
    editingId = null;
    addBtn.textContent = 'Add';
  } else {
    notes.push({ id: Date.now(), text: value });
  }

  noteInput.value = '';
  saveNotes();
  renderNotes(searchInput.value);
};

searchInput.oninput = () => {
  renderNotes(searchInput.value);
};

// Initial render
renderNotes();
