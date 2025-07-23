
import { useNavigate } from "react-router-dom";

export default function TaskList({ tasks, handleDelete }) {
  const navigate = useNavigate();

  return (
    <div className="mt-10 space-y-4">
      {tasks.map((task) => {
        const isOverdue = new Date(task.due_date) < new Date();
        return (
          <div
            key={task._id}
            className={`p-5 rounded-xl shadow-md border transition transform hover:scale-[1.01] ${
              isOverdue ? "bg-red-50 border-red-300" : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">{task.title}</h2>
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
  );
}
