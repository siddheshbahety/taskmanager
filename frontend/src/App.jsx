import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  //fetch
  const fetchTasks = async () => {
    const res = await fetch(`http://127.0.0.1:8000/tasks`);
    const data = await res.json();
    setTasks(data);
  };
  //add
  const addTask = async () => {
    if (!title.trim()) return;

    const res = await fetch(`http://127.0.0.1:8000/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) {
      console.error("Failed to add task");
      return;
    }

    setTitle("");
    fetchTasks();
  };

  //del
  const deleteTask = async (id) => {
    await fetch(`http://127.0.0.1:8000/tasks/${id}`, {
      method: "DELETE",
    });
    fetchTasks();
  };
  useEffect(() => {
    fetchTasks();
  }, []);
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
    </div>
  );
}
export default App;
