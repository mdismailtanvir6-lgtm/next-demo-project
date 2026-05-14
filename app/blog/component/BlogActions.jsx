"use client";

export function AddBlogButton({
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
    >
      Add Blog
    </button>
  );
}

export function EditButton({
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
    >
      Edit
    </button>
  );
}

export function DeleteButton({
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
    >
      Delete
    </button>
  );
}