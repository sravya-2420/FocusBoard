
import { useState } from "react";
import { X } from "lucide-react";

function TaskForm({ initialTask, onSave, onCancel }) {
  const [title, setTitle] = useState(initialTask?.title || "");
  const [description, setDescription] = useState(
    initialTask?.description || ""
  );
  const [category, setCategory] = useState(
    initialTask?.category || "Development"
  );
  const [status, setStatus] = useState(
    initialTask?.status || "To do"
  );
  const [priority, setPriority] = useState(
    initialTask?.priority || "Medium"
  );
  const [dueDate, setDueDate] = useState(
    initialTask?.dueDate || ""
  );
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Please enter a task title.");
      return;
    }

    if (!dueDate) {
      setError("Please select a due date.");
      return;
    }

    onSave({
      title: title.trim(),
      description: description.trim(),
      category,
      status,
      priority,
      dueDate
    });
  }

  return (
    <div className="modal-overlay">
      <div
        className="task-form-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-title"
      >
        <div className="form-heading">
          <div>
            <h2 id="task-form-title">
              {initialTask ? "Edit Task" : "Create New Task"}
            </h2>
            <p>Fill in the details of your task.</p>
          </div>

          <button
            type="button"
            className="close-button"
            onClick={onCancel}
            aria-label="Close form"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="task-title">Task Title *</label>
          <input
            id="task-title"
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
          />

          <label htmlFor="task-description">Description</label>
          <textarea
            id="task-description"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label htmlFor="task-category">Category</label>
          <select
            id="task-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Development</option>
            <option>Design</option>
            <option>Testing</option>
            <option>Research</option>
          </select>

          <label htmlFor="task-status">Status *</label>
          <select
            id="task-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>To do</option>
            <option>In progress</option>
            <option>Completed</option>
          </select>

          <label htmlFor="task-priority">Priority *</label>
          <select
            id="task-priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <label htmlFor="task-date">Due Date *</label>
          <input
            id="task-date"
            type="date"
            value={dueDate}
            onChange={(e) => {
              setDueDate(e.target.value);
              setError("");
            }}
          />

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <div className="form-buttons">
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
            >
              Cancel
            </button>

            <button type="submit" className="save-button">
              {initialTask ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
