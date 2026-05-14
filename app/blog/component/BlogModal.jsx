"use client";

export default function BlogModal({
  modalOpen,
  setModalOpen,
  editMode,
  form,
  handleChange,
  handleSubmit,
}) {
  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white w-[500px] p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">
          {editMode
            ? "Update Blog"
            : "Create Blog"}
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />

        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          rows={6}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="text"
          name="thumbnail"
          placeholder="Thumbnail URL"
          value={form.thumbnail}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={() =>
              setModalOpen(false)
            }
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editMode
              ? "Update"
              : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}