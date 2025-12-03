import React, { useEffect, useState } from "react";

export default function TaskForm({ onSubmit, initial = {} }) {
  const [title, setTitle] = useState(initial.title || "");
  const [description, setDescription] = useState(initial.description || "");
  const [completed, setCompleted] = useState(initial.completed || false);

  useEffect(() => {
    setTitle(initial.title || "");
    setDescription(initial.description || "");
    setCompleted(initial.completed || false);
  }, [initial]);

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return; // prevent submit if empty
    onSubmit({ title, description, completed });
    setTitle("");
    setDescription("");
    setCompleted(false);
  };

  
  const isDisabled = !title.trim() || !description.trim();

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow space-y-3">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full border p-2 rounded"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full border p-2 rounded"
        rows="3"
      />
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          Completed
        </label>
        <button
          type="submit"
          disabled={isDisabled} // ✅ disabled if title or description is empty
          className={`ml-auto px-4 py-1 rounded text-white ${
            isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-green-600"
          }`}
        >
          {initial._id ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
}
