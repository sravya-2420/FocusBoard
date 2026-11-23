
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
    const savedTasks = localStorage.getItem("focusboard_tasks");

    if (savedTasks) {
      try {
        return JSON.parse(savedTasks);
      } catch {
        return sampleTasks;
      }
    }

    return sampleTasks;
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const [globalSearch, setGlobalSearch] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "focusboard_tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === editingTask.id
            ? { ...taskData, id: editingTask.id }
            : task
        )
      );
    } else {
      setTasks((previousTasks) => [
        ...previousTasks,
        { ...taskData, id: Date.now() }
      ]);
    }

    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleDeleteTask = (task) => {
    setTaskToDelete(task);
  };

  const confirmDelete = () => {
    setTasks((previousTasks) =>
      previousTasks.filter(
        (task) => task.id !== taskToDelete.id
      )
    );

    setTaskToDelete(null);
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus }
          : task
      )
    );
  };

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status.toLowerCase() === "completed"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status.toLowerCase() === "in progress"
  ).length;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="app-container">

      <Sidebar />

      <main className="main-content">

        <Header onSearch={setGlobalSearch} />

        <div className="dashboard-content">

          <div className="page-heading" id="dashboard">
            <div>
              <p className="section-label">OVERVIEW</p>
              <h1>Dashboard</h1>
              <p>Track your progress and stay productive.</p>
            </div>
          </div>

          <div className="stats-grid">

            <StatCard
              title="Total Tasks"
              value={totalTasks}
              icon={ListTodo}
            />

            <StatCard
              title="In Progress"
              value={inProgressTasks}
              icon={Clock}
            />

            <StatCard
              title="Completed"
              value={completedTasks}
              icon={CheckCircle}
            />

            <StatCard
              title="Completion Rate"
              value={`${completionRate}%`}
              icon={TrendingUp}
            />

          </div>

          <FocusNotes />

          <TaskList
            tasks={tasks}
            onAdd={handleAddTask}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
            globalSearch={globalSearch}
          />

        </div>
      </main>

      {isFormOpen && (
        <TaskForm
          task={editingTask}
          onSave={handleSaveTask}
          onClose={() => {
            setIsFormOpen(false);
            setEditingTask(null);
          }}
        />
      )}

      {taskToDelete && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">

            <button
              type="button"
              className="close-button"
              onClick={() => setTaskToDelete(null)}
            >
              <X size={18} />
            </button>

            <Trash2 size={30} />

            <h3>Delete Task?</h3>

            <p>
              Are you sure you want to delete
              "{taskToDelete.title}"?
            </p>

            <div className="form-buttons">
              <button
                type="button"
                className="cancel-button"
                onClick={() => setTaskToDelete(null)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="save-button"
                onClick={confirmDelete}
              >
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
