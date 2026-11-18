import { useState } from "react";
import { Link } from "react-router";
import { Eye, Trash2 } from "lucide-react";
import TodoModal from "../components/TodoModal";
import ConfirmDialog from "../components/ConfirmDialog";

export default function TodoListPage({ todos, onAdd, onDelete }) {
  const [showAdd, setShowAdd] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleAdd = (data) => {
    onAdd(data);
    setShowAdd(false);
  };

  const handleDelete = () => {
    onDelete(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Todo List</h1>
        <button
          onClick={() => setShowAdd(true)}
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Tambah Todo
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="w-2/5 px-3 py-2 font-bold">Judul</th>
              <th className="px-3 py-2 font-bold">Status</th>
              <th className="px-3 py-2 font-bold">Prioritas</th>
              <th className="px-3 py-2 font-bold">Deadline</th>
              <th className="px-3 py-2 text-center font-bold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id} className="border-b border-gray-100">
                <td className="truncate px-3 py-3">{todo.title}</td>
                <td className="px-3 py-3">{todo.status}</td>
                <td className="px-3 py-3">{todo.priority}</td>
                <td className="px-3 py-3">{todo.deadline}</td>
                <td className="px-3 py-3">
                  <div className="flex justify-center gap-1">
                    <Link
                      to={`/todo/${todo.id}`}
                      className="rounded bg-blue-600 p-1.5 text-white hover:bg-blue-700"
                      aria-label="Lihat detail"
                    >
                      <Eye size={14} />
                    </Link>
                    <button
                      onClick={() => setDeleteTarget(todo)}
                      className="rounded bg-red-600 p-1.5 text-white hover:bg-red-700"
                      aria-label="Hapus"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {todos.length === 0 && (
          <p className="py-10 text-center text-sm text-gray-500">
            Belum ada tugas. Klik "Tambah Todo" untuk membuat tugas baru.
          </p>
        )}
      </div>

      {showAdd && (
        <TodoModal
          mode="add"
          onClose={() => setShowAdd(false)}
          onSubmit={handleAdd}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Hapus Tugas"
          message={`Yakin ingin menghapus "${deleteTarget.title}"?`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}