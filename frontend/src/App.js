import React, { useEffect, useState } from "react";
import API from "./services/api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, [searchTerm, filterCategory]);

  const fetchTasks = () => {
    API.get("/tasks", {
      params: {
        search: searchTerm,
        category: filterCategory,
      },
    })
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  };

  const handleTaskAdded = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  const handleDelete = async (id) => {
    await API.delete(`/tasks/${id}`);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  const handleToggleComplete = async (id) => {
    const task = tasks.find((t) => t._id === id);
    const updated = await API.put(`/tasks/${id}`, { completed: !task.completed });
    setTasks(tasks.map((t) => (t._id === id ? updated.data : t)));
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const res = await API.put(`/tasks/${id}`, updatedData);
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };
  

  return (
    <div className="app-container">
    <div className="container">
      <h1>Task Mate - ToDo App</h1>

      <div className="search-filter">
  <input
    type="text"
    placeholder="Search by title or description"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <input
    type="text"
    placeholder="Filter by category"
    value={filterCategory}
    onChange={(e) => setFilterCategory(e.target.value)}
  />
  <button onClick={() => {
    setSearchTerm("");
    setFilterCategory("");
  }}>Clear Filters</button>
</div>
<div className="top-section">
        <TaskForm onTaskAdded={handleTaskAdded} />
      </div>

      <TaskList
  tasks={tasks}
  onDelete={handleDelete}
  onToggleComplete={handleToggleComplete}
  onUpdate={handleUpdate}
/>

    </div>
    </div>
  );
}

export default App;
