const API_URL = "http://localhost:5000/api/tasks";

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// GET all tasks
export const fetchTasks = async () => {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: getToken(),
    },
  });
  return res.json();
};

// CREATE new task
export const createTask = async (task) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken(),
    },
    body: JSON.stringify(task),
  });
  return res.json();
};

// TOGGLE complete/incomplete
export const toggleTaskStatus = async (taskId) => {
  const res = await fetch(`${API_URL}/${taskId}`, {
    method: 'PUT',
    headers: {
      Authorization: getToken(),
    },
  });
  return res.json();
};

// DELETE task
export const deleteTask = async (taskId) => {
  const res = await fetch(`${API_URL}/${taskId}`, {
    method: 'DELETE',
    headers: {
      Authorization: getToken(),
    },
  });
  return res.json();
};
