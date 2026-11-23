
import { useState } from "react";
import TaskCard from "./TaskCard";
import {
  Plus,
  Search,
  SlidersHorizontal
} from "lucide-react";

function TaskList({
  tasks,
  onAdd,
  onEdit,
  onDelete,
  onStatusChange
}) {
  const [searchText, setSearchText] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");

  const statusOptions = [
    "All",
    "To do",
    "In progress",
    "Completed"
  ];

  const filteredTasks = tasks.filter((task) => {
    const searchValue = searchText.trim().toLowerCase();

    const matchesSearch = [
      task.title,
      task.description,
      task.category
    ].some((value) =>
      String(value || "").toLowerCase().includes(searchValue)
    );

    const matchesStatus =
      activeStatus === "All" ||
      task.status === activeStatus;

    const matchesPriority =
      selectedPriority === "All" ||
      task.priority === selectedPriority;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });

  return (
    <section className="task-section" id="tasks">

      <div className="task-section-heading">
        <div>
          <p className="section-label">YOUR WORKSPACE</p>
          <h3>My Tasks</h3>
        </div>

        <button
          className="add-task-button"
          onClick={onAdd}
          type="button"
        >
          <Plus size={17} />
          Add Task
        </button>
      </div>

      <div className="task-count">
        Showing {filteredTasks.length} of {tasks.length} Tasks
      </div>

      <div className="task-filters">

        <div className="task-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search tasks..."
            value={searchText}
            onChange={(event) =>
              setSearchText(event.target.value)
            }
            aria-label="Search tasks"
          />
        </div>

        <div className="priority-filter">
          <SlidersHorizontal size={17} />

          <select
            value={selectedPriority}
            onChange={(event) =>
              setSelectedPriority(event.target.value)
            }
            aria-label="Filter tasks by priority"
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
        </div>

      </div>

      <div className="status-tabs">
        {statusOptions.map((status) => (
          <button
            key={status}
            type="button"
            className={
              activeStatus === status
                ? "status-tab active"
                : "status-tab"
            }
            onClick={() => setActiveStatus(status)}
            aria-pressed={activeStatus === status}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="task-list">

        {filteredTasks.length === 0 ? (
          <div className="empty-tasks">
            <h4>No tasks found</h4>
            <p>
              Try another search term or clear filters.
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))
        )}

      </div>

    </section>
  );
}

export default TaskList;
