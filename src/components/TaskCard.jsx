
import { Pencil, Trash2 } from "lucide-react";

function formatDueDate(date) {
  if (!date) return "No due date";

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const statusClass = task.status
    .toLowerCase()
    .replace(/\s+/g, "-");

  const priorityClass = task.priority.toLowerCase();

  return (
    <div className="task-card">
      <div className="task-info">
        <h4>{task.title}</h4>

        <p>{task.description}</p>

        <div className="task-meta">
          <span>{task.category}</span>

          <span className={`status-badge ${statusClass}`}>
            {task.status}
          </span>

          <span className={`priority-badge ${priorityClass}`}>
            {task.priority}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <span className="task-date">
          {formatDueDate(task.dueDate)}
        </span>

        <select
          className="task-status-select"
          value={task.status}
          onChange={(event) =>
            onStatusChange(task.id, event.target.value)
          }
          aria-label={`Change status for ${task.title}`}
        >
          <option value="To do">To do</option>
          <option value="In progress">In progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button
          type="button"
          onClick={() => onEdit(task)}
          aria-label={`Edit ${task.title}`}
          className="edit-task-button"
        >
          <Pencil size={17} />
        </button>

        <button
          type="button"
          onClick={() => onDelete(task)}
          aria-label={`Delete ${task.title}`}
          className="delete-task-button"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
