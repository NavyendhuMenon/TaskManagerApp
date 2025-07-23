
export default function TaskForm({ form, setForm, handleSubmit }) {
  return (
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
    </form>
  );
}
