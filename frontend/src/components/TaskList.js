import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onDelete, onToggleComplete, onUpdate }) => {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        tasks.map((task) => (
            <TaskItem
            key={task._id}
            task={task}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
            onUpdate={onUpdate}
          />
          
        ))
      )}
    </div>
  );
};

export default TaskList;
