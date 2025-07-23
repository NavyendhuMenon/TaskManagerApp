import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTasks, updateTask } from "../services/taskApi";

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getTasks().then((res) => {
      const found = res.data.find((t) => t._id === id);
      if (found) setTask(found);
    });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await updateTask(id, task);
      navigate("/");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      setError(message);
    }
  };

    if (!task) return <p>Loading...</p>;

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-extrabold text-yellow-600 mb-6 text-center">
        ✏️ Edit Task
      </h2>

      <form
        onSubmit={handleUpdate}
        className="space-y-4 bg-yellow-50 p-6 rounded-2xl shadow-lg"
      >
        <input
          type="text"
          placeholder="Task Title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          required
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <textarea
          placeholder="Description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          rows={4}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <input
          type="date"
          value={task.due_date.slice(0, 10)}
          onChange={(e) => setTask({ ...task, due_date: e.target.value })}
          required
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <select
          value={task.status}
          onChange={(e) => setTask({ ...task, status: e.target.value })}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value="pending">🕒 Pending</option>
          <option value="in-progress">🚧 In Progress</option>
          <option value="completed">✅ Completed</option>
        </select>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-md transition duration-300"
        >
          💾 Update Task
        </button>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
