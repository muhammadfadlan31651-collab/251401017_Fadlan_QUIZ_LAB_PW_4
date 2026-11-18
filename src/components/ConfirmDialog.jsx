export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-lg bg-white p-5 shadow-xl"
      >
        <h2 className="mb-2 text-base font-semibold">{title}</h2>
        <p className="mb-5 text-sm text-gray-600">{message}</p>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onCancel}
            className="rounded bg-gray-200 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="rounded bg-red-600 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}