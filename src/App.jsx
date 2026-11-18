import { useRef, useState } from "react";
import { Route, Routes } from "react-router";
import { dummyTodos } from "./data/dummyTodos";
import TodoListPage from "./pages/TodoListPage";
import TodoDetailPage from "./pages/TodoDetailPage";

function App() {
  const [todos, setTodos] = useState(dummyTodos);
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const showToast = (message, type = "success") => {
    clearTimeout(timerRef.current);
    setToast({ message, type });
    timerRef.current = setTimeout(() => setToast(null), 2500);
  };

  const addTodo = (data) => {
    setTodos((prev) => {
      const nextId = prev.reduce((max, t) => Math.max(max, t.id), 0) + 1;
      return [...prev, { ...data, id: nextId }];
    });
    showToast("Tugas berhasil ditambahkan");
  };

  const updateTodo = (id, data) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...data, id } : t)));
    showToast("Tugas berhasil diperbarui");
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    showToast("Tugas berhasil dihapus", "error");
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <TodoListPage
              todos={todos}
              onAdd={addTodo}
              onDelete={deleteTodo}
            />
          }
        />
        <Route
          path="/todo/:id"
          element={<TodoDetailPage todos={todos} onUpdate={updateTodo} />}
        />
      </Routes>

      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-[60] rounded-md px-4 py-3 text-sm font-medium text-white shadow-lg ${
            toast.type === "error" ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {toast.message}
        </div>
      )}
    </>
  );
}

export default App;