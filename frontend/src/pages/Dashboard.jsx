import React, { useEffect, useState } from "react";
import api from "../api/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState(""); // input field text
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(false);

  const fetchTasks = async (searchValue, statusValue) => {
    setLoading(true);
    try {
      const params = {};
      if (searchValue) params.q = searchValue;
      if (statusValue !== "all") params.status = statusValue;

      const { data } = await api.get("/tasks", { params });
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchTasks(search, status);
    }, 300); // 300ms delay

    return () => clearTimeout(debounce); // cleanup on next effect
  }, [search, status]);

  const createTask = async (payload) => {
    try {
      await api.post("/tasks", payload);
      fetchTasks(search, status);
    } catch (err) {
      console.error(err);
    }
  };

  const updateTask = async (payload) => {
    try {
      await api.put(`/tasks/${editing._id}`, payload);
      setEditing(null);
      fetchTasks(search, status);
    } catch (err) {
      console.error(err);
    }
  };

  const removeTask = async (id) => {
    if (!confirm("Delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks(search, status);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleComplete = async (task) => {
    try {
      await api.put(`/tasks/${task._id}`, { completed: !task.completed });
      fetchTasks(search, status);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded w-full"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <h3 className="font-semibold mb-2">{editing ? "Edit Task" : "New Task"}</h3>
          <TaskForm initial={editing || {}} onSubmit={editing ? updateTask : createTask} />
        </div>

        <div className="md:col-span-2">
          <h3 className="font-semibold mb-2">
            Tasks {loading && "(loading...)"}
          </h3>

          <TaskList
            tasks={tasks}
            onEdit={(task) => setEditing(task)}
            onDelete={removeTask}
            onToggle={toggleComplete}
          />
        </div>
      </div>
    </div>
  );
}
