import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

import { db } from "./firebase-config";
import { collection, doc, addDoc } from "firebase/firestore";
import { useAlert } from "react-alert";

function CreateArea() {
  const [isExpanded, setExpanded] = useState(false);
  const alert = useAlert();

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  const notesCollection = collection(db, "notes");

  async function submitNote(event) {
    await addDoc(notesCollection, { title: note.title, content: note.content });
    alert.show("Note created successfully!");

    //Clearing the notes after it gets uploaded to db.
    setNote({
      title: "",
      content: "",
    });

    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded ? (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        ) : null}
        <Fab />
        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={true}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
