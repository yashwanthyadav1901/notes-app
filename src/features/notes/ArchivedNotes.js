import React, { useEffect, useState } from "react";
import {
  useGetArchivedNotesQuery,
  useUpdateNoteMutation,
} from "./noteApiSlice";
import "./notes.css";

const ArchivedNotes = () => {
  const {
    data: archivedNotes,
    isLoading,
    isError,
    refetch,
  } = useGetArchivedNotesQuery();
  const [updateNote] = useUpdateNoteMutation();
  const [localArchivedNotes, setLocalArchivedNotes] = useState([]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (archivedNotes) {
      setLocalArchivedNotes(
        archivedNotes.ids.map((id) => archivedNotes.entities[id])
      );
    }
  }, [archivedNotes]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading archived notes.</div>;

  const handleUnarchiveNote = async (note) => {
    try {
      // Optimistically update the UI
      setLocalArchivedNotes((prevNotes) =>
        prevNotes.filter((n) => n.id !== note.id)
      );

      // Update the note
      await updateNote({
        ...note,
        isArchived: false,
      }).unwrap();

      // Refetch the archived notes to ensure the UI is in sync with the server
      refetch();
    } catch (err) {
      console.error("Failed to unarchive note: ", err);
      // If the update fails, revert the UI change
      setLocalArchivedNotes((prevNotes) => [...prevNotes, note]);
    }
  };

  return (
    <div className="note-container">
      <h1>Archived Notes</h1>
      <ul>
        {localArchivedNotes.map((note) => (
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
            <button onClick={() => handleUnarchiveNote(note)}>Unarchive</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArchivedNotes;
