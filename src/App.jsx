import { Route, Routes } from "react-router-dom";
import "./App.css";

import { TasksContextProvider } from "./context/TaskContext";

import TasksPage from "./pages/TasksPage";
import TaskForm from "./pages/TaskForm";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="bg-zinc-900 h-full-screen">
      <Navbar />
      <div className="container mx-auto py-4 px-20">
        <TasksContextProvider>
          <Routes>
            <Route path="/" element={<TasksPage />} />
            <Route path="/new" element={<TaskForm />} />
            <Route path="/edit/:id" element={<TaskForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TasksContextProvider>
      </div>
    </div>
  );
}

export default App;
