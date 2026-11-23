
import { useState, useEffect } from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import FocusNotes from "./components/FocusNotes";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

import sampleTasks from "./data/sampleTasks";

import {
  ListTodo,
  Clock,
  CheckCircle,
  TrendingUp,
  Trash2,
  X
} from "lucide-react";

function App() {

  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("focusboard_tasks");

      if (savedTasks !== null) {
        const parsedTasks = JSON.parse(savedTasks);

        if (Array.isArray(parsedTasks)) {
          return parsedTasks;
        }
      }
    } catch (error) {
      console.error("Unable to load saved tasks:", error);
    }

    return sampleTasks;
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [taskToDelete, setTaskToDelete] = useState(null);

  // Save tasks to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        "focusboard_tasks",
        JSON.stringify(tasks)
      );
    } catch (error) {
      console.error("Unable to save tasks:", error);
    }
  }, [tasks]);

  // Create and update tasks
  function handleSaveTask(taskData) {
    if (editingTask) {
      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === editingTask.id
            ? { ...task, ...taskData }
            : task
        )
      );
    } else {
      const newTask = {
        id: Date.now(),
        ...taskData
      };

      setTasks((previousTasks) => [
        ...previousTasks,
        newTask
      ]);
    }

    setIsFormOpen(false);
    setEditingTask(null);
  }

  // Open create form
  function handleAddTask() {
    setEditingTask(null);
    setIsFormOpen(true);
  }

  // Open edit form
  function handleEditTask(task) {
    setEditingTask(task);
    setIsFormOpen(true);
  }

  // Open delete confirmation modal
  function handleDeleteTask(id) {
    const selectedTask = tasks.find(
      (task) => task.id === id
    );

    if (selectedTask) {
      setTaskToDelete(selectedTask);
    }
  }

  // Confirm deletion
  function confirmDeleteTask() {
    if (!taskToDelete) return;

    setTasks((previousTasks) =>
      previousTasks.filter(
        (task) => task.id !== taskToDelete.id
      )
    );

    setTaskToDelete(null);
  }

  // Cancel deletion
  function cancelDeleteTask() {
    setTaskToDelete(null);
  }

  // Change task status
  function handleStatusChange(id, newStatus) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, status: newStatus }
          : task
      )
    );
  }

  // Dashboard statistics
  const totalTasks = tasks.length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const completionPercentage =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  return (
    <div className="app-container">

      <Sidebar />

      <main className="main-content">

        <Header />

        <div className="dashboard-content">

          <div className="page-heading">
            <div>
              <p className="section-label">OVERVIEW</p>
              <h1>Dashboard</h1>
              <p>
                Manage your tasks and stay productive.
              </p>
            </div>
          </div>

          <section className="stats-grid">

            <StatCard
              title="Total Tasks"
              value={totalTasks}
              icon={<ListTodo />}
              color="#E8EFFF"
            />

            <StatCard
              title="In Progress"
              value={inProgressTasks}
              icon={<Clock />}
              color="#FFF2D9"
            />

            <StatCard
              title="Completed"
              value={completedTasks}
              icon={<CheckCircle />}
              color="#DFF7EA"
            />

            <StatCard
              title="Completion"
              value={`${completionPercentage}%`}
              icon={<TrendingUp />}
              color="#F0E8FF"
            />

          </section>

          <FocusNotes />

          <TaskList
            tasks={tasks}
            onAdd={handleAddTask}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
          />

        </div>

      </main>

      {/* Create and Edit Task Modal */}
      {isFormOpen && (
        <TaskForm
          initialTask={editingTask}
          onSave={handleSaveTask}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingTask(null);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {taskToDelete && (
        <div
          className="delete-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              cancelDeleteTask();
            }
          }}
        >
          <div
            className="delete-modal"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
            aria-describedby="delete-modal-description"
          >

            <div className="delete-modal-icon">
              <Trash2 size={25} />
            </div>

            <button
              type="button"
              className="delete-modal-close"
              onClick={cancelDeleteTask}
              aria-label="Close confirmation"
            >
              <X size={20} />
            </button>

            <h3 id="delete-modal-title">
              Delete Task
            </h3>

            <p id="delete-modal-description">
              Are you sure you want to delete this task?
            </p>

            <p className="delete-task-name">
              {taskToDelete.title}
            </p>

            <div className="delete-modal-actions">

              <button
                type="button"
                className="cancel-delete-button"
                onClick={cancelDeleteTask}
              >
                Cancel
              </button>

              <button
                type="button"
                className="confirm-delete-button"
                onClick={confirmDeleteTask}
              >
                <Trash2 size={16} />
                Delete
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;
