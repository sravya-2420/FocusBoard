
import { useState } from "react";
import TaskCard from "./TaskCard";
import { Plus, Search, SlidersHorizontal, X } from "lucide-react";

function TaskList({
  tasks,
  onAdd,
  onEdit,
  onDelete,
  onStatusChange,
  globalSearch = ""
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

  const searchValue = (
    searchText || globalSearch
  ).trim().toLowerCase();

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = [
      task.title,
      task.description,
      task.category
    ].some((value) =>
      String(value || "")
        .toLowerCase()
        .includes(searchValue)
    );

    const matchesStatus =
      activeStatus === "All" ||
      task.status.toLowerCase() === activeStatus.toLowerCase();

    const matchesPriority =
      selectedPriority === "All" ||
      task.priority.toLowerCase() === selectedPriority.toLowerCase();

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleLocalSearch = (event) => {
    setSearchText(event.target.value);
  };

  const clearSearch = () => {
    setSearchText("");
  };

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
            type="search"
            placeholder="Search tasks by keyword..."
            value={searchText}
            onChange={handleLocalSearch}
            aria-label="Search tasks"
          />

          {searchText && (
            <button
              type="button"
              className="clear-search"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
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
            <p>Try another keyword or clear your filters.</p>
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
