import React from "react";

export default function TaskList({ tasks, onEdit, onDelete, onToggle }) {
  if (!tasks) return null;
  return (
    <div className="space-y-3">
      {tasks.length === 0 && <div className="text-gray-500">No tasks yet</div>}
      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-white p-3 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h3 className={`font-semibold ${task.completed ? "line-through text-gray-500" : ""}`}>{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
          </div>
          <div className="mt-3 md:mt-0 flex gap-2 items-center">
            <button onClick={() => onToggle(task)} className="px-3 py-1 border rounded">
              {task.completed ? "Mark pending" : "Complete"}
            </button>
            <button onClick={() => onEdit(task)} className="px-3 py-1 border rounded">Edit</button>
            <button onClick={() => onDelete(task._id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
