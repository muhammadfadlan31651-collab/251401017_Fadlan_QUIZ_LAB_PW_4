import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import TodoModal from "../components/TodoModal";

export default function TodoDetailPage({ todos, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showUpdate, setShowUpdate] = useState(false);

  const todo = todos.find((t) => t.id === Number(id));

  if (!todo) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3">
        <p className="text-sm text-gray-600">Tugas tidak ditemukan.</p>
        <Link
          to="/"
          className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Kembali
        </Link>
      </div>
    );
  }

  const handleUpdate = (data) => {
    onUpdate(todo.id, data);
    setShowUpdate(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="grid w-full max-w-2xl grid-cols-1 gap-6 rounded-xl border border-gray-100 p-6 shadow-sm sm:grid-cols-2">
        <div>
          <h2 className="font-bold">Judul</h2>
          <p className="mb-3 text-sm">{todo.title}</p>
          <h2 className="font-bold">Deskripsi</h2>
          <div className="h-28 overflow-auto rounded border border-gray-200 p-2 text-sm">
            {todo.description}
          </div>
        </div>

        <div>
          <h2 className="font-bold">Status</h2>
          <p className="mb-3 text-sm">{todo.status}</p>
          <h2 className="font-bold">Prioritas</h2>
          <p className="mb-3 text-sm">{todo.priority}</p>
          <h2 className="font-bold">Deadline</h2>
          <p className="mb-4 text-sm">{todo.deadline}</p>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/")}
              className="rounded bg-red-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-red-700"
            >
              Kembali
            </button>
            <button
              onClick={() => setShowUpdate(true)}
              className="rounded bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {showUpdate && (
        <TodoModal
          mode="update"
          initialData={todo}
          onClose={() => setShowUpdate(false)}
          onSubmit={handleUpdate}
        />
      )}
    </div>
  );
}