import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask } from "../services/taskApi";
import { useNavigate } from "react-router-dom";

export default function Home({ setIsLoggedIn }) {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    due_date: "",
    status: "pending",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createTask(form);
      setForm({ title: "", description: "", due_date: "", status: "pending" });
      fetchTasks();
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      setError(message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this task?")) {
      await deleteTask(id);
      fetchTasks();
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-yellow-600 text-center">
          📝 Task Manager
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold shadow"
        >
          🚪 Logout
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-yellow-50 p-6 rounded-2xl shadow-lg"
      >
        <input
          type="text"
          placeholder="Task Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={4}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <input
          type="date"
          value={form.due_date}
          onChange={(e) => setForm({ ...form, due_date: e.target.value })}
          required
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-md transition duration-300"
        >
          ➕ Add Task
        </button>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
            {error}
          </div>
        )}
      </form>

      <div className="mt-10 space-y-4">
        {tasks.map((task) => {
          const isOverdue = new Date(task.due_date) < new Date();
          return (
            <div
              key={task._id}
              className={`p-5 rounded-xl shadow-md border transition transform hover:scale-[1.01] ${
                isOverdue
                  ? "bg-red-50 border-red-300"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                  {task.title}
                </h2>
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {task.status}
                </span>
              </div>

              <p className="text-gray-600 mt-2">{task.description}</p>

              <p className="text-sm text-gray-500 mt-1">
                Due Date:{" "}
                <span className="font-medium text-gray-700">
                  {new Date(task.due_date).toLocaleDateString()}
                </span>
              </p>

              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => navigate(`/edit/${task._id}`)}
                  className="text-blue-600 hover:underline"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-600 hover:underline"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
