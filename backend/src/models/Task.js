import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },  // <-- NEW
    title: { type: String, required: true },
    description: { type: String, default: "" },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
