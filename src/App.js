import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import PersistLogin from "./features/auth/persistLogin";
import Sidebar from "./components/SideBar";
import TrashedNotes from "./features/notes/TrashedNotes";
import DashLayout from "./components/DashLayout";
import ArchivedNotes from "./features/notes/ArchivedNotes";
import NoteMain from "./features/notes/NoteMain";
import NewNoteForm from "./features/notes/NewNote";
import AddNoteForm from "./features/notes/NewNote";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/register" element={<Register />} />
        <Route index element={<Login />} />
        <Route element={<PersistLogin />}>
          <Route path="dash" element={<DashLayout />}>
            <Route path="/dash/main" index element={<NoteMain />} />
            <Route path="/dash/newnote" element={<AddNoteForm />} />
            <Route path="/dash/trash" element={<TrashedNotes />} />
            <Route path="/dash/archive" element={<ArchivedNotes />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
