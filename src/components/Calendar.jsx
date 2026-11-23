
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays
} from "lucide-react";

function Calendar({ tasks }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date().toLocaleDateString("en-CA");

  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });

  function changeMonth(direction) {
    setCurrentDate(
      new Date(year, month + direction, 1)
    );
  }

  function formatDate(day) {
    const date = new Date(year, month, day);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
  }

  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const selectedTasks = tasks.filter(
    (task) => task.dueDate === selectedDate
  );

  return (
    <section className="calendar-section" id="calendar">

      <div className="calendar-heading">
        <div>
          <p className="section-label">PLAN YOUR WORK</p>
          <h3>Calendar</h3>
          <p>View your tasks and upcoming deadlines.</p>
        </div>

        <CalendarDays size={28} />
      </div>

      <div className="calendar-container">

        <div className="calendar-top">

          <h3>{monthName}</h3>

          <div className="calendar-navigation">

            <button
              type="button"
              onClick={() => changeMonth(-1)}
              aria-label="Previous month"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </button>

            <button
              type="button"
              onClick={() => changeMonth(1)}
              aria-label="Next month"
            >
              <ChevronRight size={20} />
            </button>

          </div>

        </div>

        <div className="calendar-grid">

          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day) => (
              <div className="calendar-weekday" key={day}>
                {day}
              </div>
            )
          )}

          {calendarDays.map((day, index) => {
            if (day === null) {
              return (
                <div
                  className="calendar-day empty"
                  key={`empty-${index}`}
                />
              );
            }

            const dateKey = formatDate(day);

            const dayTasks = tasks.filter(
              (task) => task.dueDate === dateKey
            );

            return (
              <button
                type="button"
                key={dateKey}
                className={`calendar-day
                  ${dateKey === today ? "today" : ""}
                  ${dateKey === selectedDate ? "selected" : ""}
                `}
                onClick={() => setSelectedDate(dateKey)}
              >
                <span className="calendar-day-number">
                  {day}
                </span>

                {dayTasks.length > 0 && (
                  <span className="calendar-task-count">
                    {dayTasks.length} {dayTasks.length === 1 ? "task" : "tasks"}
                  </span>
                )}

              </button>
            );
          })}

        </div>

      </div>

      <div className="calendar-selected-tasks">

        <h4>
          Tasks for{" "}
          {new Date(`${selectedDate}T00:00:00`).toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
              year: "numeric"
            }
          )}
        </h4>

        {selectedTasks.length === 0 ? (
          <p className="calendar-empty">
            No tasks scheduled for this date.
          </p>
        ) : (
          selectedTasks.map((task) => (
            <div className="calendar-task-item" key={task.id}>
              <div>
                <h5>{task.title}</h5>
                <p>{task.category}</p>
              </div>

              <span className={`status-badge ${
                task.status.toLowerCase().replace(/\s+/g, "-")
              }`}>
                {task.status}
              </span>
            </div>
          ))
        )}

      </div>

    </section>
  );
}

export default Calendar;
