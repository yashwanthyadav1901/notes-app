import React, { useState } from "react";
import {
  useGetNotesQuery,
  useGetNotesByTagQuery,
  useUpdateNoteBackgroundColorMutation,
  useArchiveNoteMutation,
  useDeleteNoteMutation,
} from "./noteApiSlice";
import "./notes.css";

const colors = [
  "#FFDDC1",
  "#FFABAB",
  "#FFC3A0",
  "#FF677D",
  "#D6A4A4",
  "#6A0572",
  "#D3D3D3",
  "#B9FBC0",
  "#FF61A6",
];

const NoteMain = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [updateNoteBackgroundColor] = useUpdateNoteBackgroundColorMutation();
  const [archiveNote] = useArchiveNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();

  // Fetch all notes
  const {
    data: allNotes,
    isLoading: isLoadingAllNotes,
    isError: isErrorAllNotes,
  } = useGetNotesQuery();

  // Fetch notes by tag
  const {
    data: notesByTag,
    isLoading: isLoadingNotesByTag,
    isError: isErrorNotesByTag,
  } = useGetNotesByTagQuery(selectedTag, {
    skip: !selectedTag,
  });

  // Filter notes based on search term
  const filteredNotes =
    searchTerm && !selectedTag
      ? allNotes?.ids.filter((id) =>
          allNotes.entities[id].title
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      : selectedTag
      ? notesByTag?.ids
      : allNotes?.ids;

  const handleColorChange = async (noteId, color) => {
    try {
      await updateNoteBackgroundColor({
        id: noteId,
        backgroundColor: color,
      }).unwrap();
    } catch (err) {
      console.error("Failed to update background color: ", err);
    }
  };

  const handleArchive = async (noteId) => {
    try {
      await archiveNote({
        id: noteId,
      }).unwrap();
    } catch (err) {
      console.error("Failed to archive note: ", err);
    }
  };

  const handleDelete = async (noteId) => {
    try {
      await deleteNote({
        id: noteId,
      }).unwrap();
    } catch (err) {
      console.error("Failed to delete note: ", err);
    }
  };

  if (isLoadingAllNotes || isLoadingNotesByTag) return <div>Loading...</div>;
  if (isErrorAllNotes || isErrorNotesByTag)
    return <div>Error loading notes.</div>;

  return (
    <div className="note-container">
      <h1>All Notes</h1>
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        value={selectedTag}
        onChange={(e) => setSelectedTag(e.target.value)}
      >
        <option value="">All Tags</option>
        {allNotes &&
          Array.from(
            new Set(allNotes.ids.flatMap((id) => allNotes.entities[id].tags))
          ).map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
      </select>
      <ul>
        {filteredNotes &&
          filteredNotes.map((id) => {
            const note = selectedTag
              ? notesByTag.entities[id]
              : allNotes.entities[id];
            return (
              <li
                key={id}
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
                <div className="color-buttons">
                  {colors.map((color) => (
                    <button
                      key={color}
                      style={{ backgroundColor: color, margin: "2px" }}
                      onClick={() => handleColorChange(id, color)}
                      className="color-toggle"
                    />
                  ))}
                </div>
                <div className="note-actions">
                  <button onClick={() => handleArchive(id)}>Archive</button>
                  <button onClick={() => handleDelete(id)}>Trash</button>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default NoteMain;
