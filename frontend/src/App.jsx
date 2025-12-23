import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const API_URL = "http://127.0.0.1:8000";
  const login = async () => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      alert("Login failed");
      return;
    }

    const data = await res.json();
    setToken(data.access_token);
    setUsername("");
    setPassword("");
    fetchTasks(data.access_token); // fetch tasks immediately
  };
  const fetchTasks = async (jwtToken = token) => {
    if (!jwtToken) return; // prevent fetching if not logged in
    const res = await fetch(`${API_URL}/tasks/`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    const data = await res.json();
    setTasks(data);
  };
  const addTask = async () => {
    if (!title.trim() || !token) return;

    await fetch(`${API_URL}/tasks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  if (!token) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Login</h1>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Manager</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task"
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
      <button onClick={() => setToken("")}>Logout</button>
    </div>
  );
}
export default App;
