import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import {
  fetchTasks,
  createTask,
  toggleTaskStatus,
  deleteTask,
} from '../services/taskService';

function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'Medium',
  });

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/');
    else loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    const created = await createTask(newTask);
    setTasks([created, ...tasks]);
    setNewTask({ title: '', description: '', priority: 'Medium' });
  };

  const handleToggle = async (id) => {
    const updated = await toggleTaskStatus(id);
    setTasks(tasks.map(t => (t._id === id ? updated : t)));
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter(t => t._id !== id));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <h2>Your Tasks</h2>

      <form onSubmit={handleAddTask} className="add-task-form">
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          required
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          required
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button type="submit">Add Task</button>
      </form>

      <ul className="task-list">
        {tasks.map((task) => (
          <li
            key={task._id}
            className={`task-item ${task.status === 'complete' ? 'completed' : ''}`}
          >
            <div>
              <strong>{task.title}</strong> — <em>{task.priority}</em>
              <p>{task.description}</p>
            </div>

            <div className="task-actions">
              <button onClick={() => handleToggle(task._id)}>
                {task.status === 'complete' ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <button style={{ marginTop: '30px' }} onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
