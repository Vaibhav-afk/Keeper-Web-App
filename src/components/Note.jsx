import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditModal from "./EditModal.jsx";

function Note(props) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <div className="delete-button" onClick={handleClick}>
        <DeleteIcon />
      </div>
      <div className="edit-button" onClick={() => setIsOpen(true)}>
        <EditIcon />
      </div>

      {isOpen && (
        <EditModal
          setIsOpen={setIsOpen}
          heading="Edit your note"
          id={props.id}
          title={props.title}
          content={props.content}
        />
      )}

      <h1>{props.title}</h1>
      <p>{props.content}</p>
    </div>
  );
}

export default Note;
