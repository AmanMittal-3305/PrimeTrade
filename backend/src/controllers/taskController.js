import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      email: req.user.email
    });

    res.json(task);
    console.log("USER FROM TOKEN:", req.user);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Could not create task" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const email = req.user.email;
    const { q, status } = req.query;

    let filter = { email };

    if (q && q.trim() !== "") {
      filter.title = { $regex: q, $options: "i" };
    }

    if (status === "completed") filter.completed = true;
    if (status === "pending") filter.completed = false;

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTask = async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  res.json(updated);
};

export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};
