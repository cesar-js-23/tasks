import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
  updateTaskRequest,
  getTaskRequest,
  toggleTaskDoneRequest,
} from "../api/tasks.api";

export const tasksContext = createContext();

export const useTasks = () => {
  const context = useContext(tasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskContextProvider");
  }
  return context;
};

export const TasksContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  async function loadTasks() {
    const response = await getTasksRequest();
    setTasks(response.data);
  }

  const deleteTask = async (id) => {
    try {
      const response = await deleteTaskRequest(id);
      setTasks(tasks.filter((task) => task.id != id));
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async (task) => {
    try {
      const response = await createTaskRequest(task);
      // setTasks([...tasks, response.data])
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id, newFields) => {
    try {
      const response = await updateTaskRequest(id, newFields);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getTask = async (id) => {
    try {
      const response = await getTaskRequest(id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTaskDone = async (id) => {
    const taskFound = tasks.find((task) => task.id === id);
    await toggleTaskDoneRequest(id, !taskFound.done ? true : false);
    tasks.map((task) =>
      task.id === id
        ? (task.done = task.done == 0 ? 1 : 0)
        : setTasks([...tasks])
    );
  };

  return (
    <tasksContext.Provider
      value={{
        tasks,
        loadTasks,
        deleteTask,
        createTask,
        updateTask,
        getTask,
        toggleTaskDone,
      }}
    >
      {children}
    </tasksContext.Provider>
  );
};
