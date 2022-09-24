import { useTasks } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";

const TaskCard = ({ task }) => {
  const { deleteTask, toggleTaskDone } = useTasks();
  const navigate = useNavigate();

  const handleDone = async () => {
    await toggleTaskDone(task.id);
  };

  return (
    <div className="bg-slate-300 rounded-md p-4">
      <h2 className="text-sm font-bold">{task.title}</h2>
      <header className="text-sm font-bold flex justify-between">
        <p>{task.description}</p>
        <span>{task.done ? "✔️" : "❌"}</span>
      </header>
      <div className="flex gap-x-1">
        <button
          className="bg-red-500 px-2 py-1 text-white"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
        <button
          className="bg-slate-800 px-2 py-1 text-white"
          onClick={() => navigate(`/edit/${task.id}`)}
        >
          Edit
        </button>
        <button
          className="bg-green-500 px-2 py-1 text-white"
          onClick={() => handleDone(task.id)}
        >
          Toggle Task
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
