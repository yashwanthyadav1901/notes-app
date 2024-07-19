import React, { useState } from "react";
import { useAddNewNoteMutation } from "./noteApiSlice";
import "./notes.css";

const AddNoteForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  const [addNewNote, { isLoading }] = useAddNewNoteMutation();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onTagsChanged = (e) => setTags(e.target.value);
  const onBackgroundColorChanged = (e) => setBackgroundColor(e.target.value);

  const canSave = [title, content].every(Boolean) && !isLoading;

  const onSaveNoteClicked = async () => {
    if (canSave) {
      try {
        await addNewNote({
          title,
          content,
          tags: tags.split(",").map((tag) => tag.trim()),
          backgroundColor,
        }).unwrap();

        setTitle("");
        setContent("");
        setTags("");
        setBackgroundColor("#ffffff");
      } catch (err) {
        console.error("Failed to save the note: ", err);
      }
    }
  };

  return (
    <section className="form-container">
      <h2>Add a New Note</h2>
      <div className="form-addnote">
        <form>
          <div>
            <label htmlFor="noteTitle">Title:</label>
            <input
              type="text"
              id="noteTitle"
              name="noteTitle"
              value={title}
              onChange={onTitleChanged}
            />
          </div>
          <div>
            <label htmlFor="noteContent">Content:</label>
            <textarea
              id="noteContent"
              name="noteContent"
              value={content}
              onChange={onContentChanged}
            />
          </div>
          <div>
            <label htmlFor="noteTags">Tags (comma separated):</label>
            <input
              type="text"
              id="noteTags"
              name="noteTags"
              value={tags}
              onChange={onTagsChanged}
            />
          </div>
          <div>
            <label htmlFor="noteBackgroundColor">Background Color:</label>
            <input
              type="color"
              id="noteBackgroundColor"
              name="noteBackgroundColor"
              value={backgroundColor}
              onChange={onBackgroundColorChanged}
            />
          </div>

          <button type="button" onClick={onSaveNoteClicked} disabled={!canSave}>
            Save Note
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddNoteForm;
