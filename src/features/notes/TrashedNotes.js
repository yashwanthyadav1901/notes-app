import React, { useEffect, useState } from "react";
import { useGetTrashedNotesQuery, useUpdateNoteMutation } from "./noteApiSlice";
import "./notes.css";

const TrashedNotes = () => {
  const {
    data: trashedNotes,
    isLoading,
    isError,
    refetch,
  } = useGetTrashedNotesQuery();
  const [updateNote] = useUpdateNoteMutation();
  const [localTrashedNotes, setLocalTrashedNotes] = useState([]);

  useEffect(() => {
    if (trashedNotes) {
      setLocalTrashedNotes(
        trashedNotes.ids.map((id) => trashedNotes.entities[id])
      );
    }
  }, [trashedNotes]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading trashed notes.</div>;

  const handleRestoreNote = async (note) => {
    try {
      // Optimistically update the UI
      setLocalTrashedNotes((prevNotes) =>
        prevNotes.filter((n) => n.id !== note.id)
      );

      // Update the note
      await updateNote({
        ...note,
        isTrashed: false,
      }).unwrap();

      // Refetch the trashed notes to ensure the UI is in sync with the server
      refetch();
    } catch (err) {
      console.error("Failed to restore note: ", err);
      // If the update fails, revert the UI change
      setLocalTrashedNotes((prevNotes) => [...prevNotes, note]);
    }
  };

  return (
    <div className="note-container">
      <h1>Trashed Notes</h1>
      <ul>
        {localTrashedNotes.map((note) => (
          <li
            key={note.id}
            style={{
              backgroundColor: note.backgroundColor,
              padding: "10px",
              margin: "10px",
              border: "1px solid #ccc",
            }}
          >
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <div>Tags: {note.tags.join(", ")}</div>
            <button onClick={() => handleRestoreNote(note)}>Restore</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrashedNotes;
