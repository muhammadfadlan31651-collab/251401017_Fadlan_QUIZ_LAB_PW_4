import { useState } from "react";
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from "../data/dummyTodos";

const emptyForm = {
  title: "",
  description: "",
  status: "to-do",
  priority: "low",
  deadline: "",
};

export default function TodoModal({ mode, initialData, onClose, onSubmit }) {
  const isUpdate = mode === "update";
  const [form, setForm] = useState(
    initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          status: initialData.status,
          priority: initialData.priority,
          deadline: initialData.deadline,
        }
      : emptyForm,
  );
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Judul wajib diisi";
    if (!form.deadline) newErrors.deadline = "Deadline wajib diisi";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    });
  };

  const inputClass =
    "w-full rounded border border-blue-200 px-2 py-1.5 text-sm outline-none focus:border-blue-500";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg bg-white p-5 shadow-xl"
      >
        <h2 className="mb-4 text-center text-base font-bold">
          {isUpdate ? "Update Todo" : "Tambah Todo"}
        </h2>

        <label className="mb-1 block text-sm font-bold">Judul</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className={inputClass}
        />
        {errors.title && (
          <p className="mt-1 text-xs text-red-600">{errors.title}</p>
        )}

        <label className="mb-1 mt-3 block text-sm font-bold">Deskripsi</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className={inputClass}
        />

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-bold">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className={inputClass}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-bold">Prioritas</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className={inputClass}
            >
              {PRIORITY_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label className="mb-1 mt-3 block text-sm font-bold">Deadline</label>
        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          className={inputClass}
        />
        {errors.deadline && (
          <p className="mt-1 text-xs text-red-600">{errors.deadline}</p>
        )}

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded bg-red-600 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Batal
          </button>
          <button
            type="submit"
            className="rounded bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            {isUpdate ? "Update" : "Tambah"}
          </button>
        </div>
      </form>
    </div>
  );
}