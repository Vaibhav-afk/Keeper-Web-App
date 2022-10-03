import React, { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Note from "./Note.jsx";
import CreateArea from "./CreateArea.jsx";

import { db } from "./firebase-config.js";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import { useAlert } from "react-alert";

function App() {
  const [notes, setNotes] = useState([]);
  const notesCollection = collection(db, "notes");
  const alert = useAlert();

  useEffect(() => {
    const fetchNotes = async () => {
      const note = await getDocs(notesCollection);
      const data = note.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setNotes(data);
    };

    fetchNotes();
  }, [notes]);

  async function deleteNote(id) {
    const noteDoc = doc(db, "notes", id);
    await deleteDoc(noteDoc);
    alert.show("Deleted successfully!!");
  }

  return (
    <div>
      <Header />
      <CreateArea />
      {notes.map((noteItem, index) => {
        return (
          <div key={index}>
            <Note
              id={noteItem.id}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          </div>
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
