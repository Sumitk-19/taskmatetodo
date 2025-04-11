import React, { useState } from "react";

const TaskItem = ({ task, onDelete, onToggleComplete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate?.substring(0, 10),
    category: task.category,
  });

  const handleChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    onUpdate(task._id, editedTask);
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <div>
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
          />
          <input
            type="date"
            name="dueDate"
            value={editedTask.dueDate}
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            value={editedTask.category}
            onChange={handleChange}
          />
          <div className="task-buttons">
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p><strong>Due:</strong> {task.dueDate?.substring(0, 10)}</p>
            <p><strong>Category:</strong> {task.category}</p>
          </div>
          <div className="task-buttons">
            <button onClick={() => onToggleComplete(task._id)}>
              {task.completed ? "Undo" : "Done"}
            </button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(task._id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
