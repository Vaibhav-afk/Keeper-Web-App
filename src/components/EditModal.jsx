import React, { useState } from "react";
import { db } from "./firebase-config.js";
import { doc, updateDoc } from "firebase/firestore";
import { useAlert } from "react-alert";

export default function EditModal({ setIsOpen, heading, id, title, content }) {
  const [editedNote, setEditedNote] = useState({});
  const alert = useAlert();

  async function submitNote() {
    const currentDoc = doc(db, "notes", id);
    await updateDoc(currentDoc, editedNote);
    setIsOpen(false);
    alert.show("Edit successful!");
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setEditedNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  return (
    <>
      <div className="EditDarkBG" onClick={() => setIsOpen(false)}></div>
      <div className="EditCentered">
        <div className="EditModal">
          <div className="EditModalUsersContainer">
            <form className="EditForm">
              <input
                name="title"
                onChange={handleChange}
                defaultValue={title}
                placeholder="Title"
              />
              <textarea
                name="content"
                onChange={handleChange}
                defaultValue={content}
                placeholder="Edit a note..."
                rows={3}
              />
            </form>
          </div>

          <hr style={{ height: "0px solid #F9F9F9" }} />
          <div className="EditModalHeader">
            <h5 className="EditHeading">{heading}</h5>
          </div>

          <button className="EditBtn" onClick={() => submitNote()}>
            Edit
          </button>
          <button className="EditCloseBtn" onClick={() => setIsOpen(false)}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}
