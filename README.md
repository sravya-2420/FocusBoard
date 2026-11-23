
# FocusBoard – Task Management Dashboard

FocusBoard is a responsive task management dashboard built using React. It helps users organize daily activities, manage tasks, track progress, and improve productivity.

## Features

- Dashboard with dynamic task statistics
- Create, edit, and delete tasks
- Update task status
- Set task priority: Low, Medium, and High
- Search tasks by title
- Filter tasks by status and priority
- Focus Notes carousel with three slides
- Save tasks using browser localStorage
- Responsive layout for desktop, tablet, and mobile

## Technologies Used

- React.js
- JavaScript
- HTML5
- CSS3
- Vite
- Lucide React
- Browser localStorage

## Project Structure

```text
src/
├── components/
│   ├── Sidebar.jsx
│   ├── Header.jsx
│   ├── StatCard.jsx
│   ├── FocusNotes.jsx
│   ├── TaskList.jsx
│   ├── TaskCard.jsx
│   └── TaskForm.jsx
├── data/
│   ├── sampleTasks.js
│   └── focusNotes.js
├── App.jsx
├── main.jsx
└── index.css
```

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Open the project folder:

   ```bash
   cd FocusBoard
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in your terminal.

## Build for Production

```bash
npm run build
```

## Data Storage

Tasks are stored in the browser's localStorage, so they remain available after refreshing the page in the same browser.

## Author

Sravya Kemidi
