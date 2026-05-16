"use client";

import { useState } from "react";
import BlogModal from "./BlogModal";
import { AddBlogButton, EditButton, DeleteButton } from "./BlogActions";
import { useRouter } from "next/navigation";


export default function BlogManager({ blog }) {

  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const initialForm = {
    title: "",
    content: "",
    thumbnail: "",
    category: "General",
    author: "Admin",
    published: true,
  };
  const [form, setForm] = useState(initialForm);

  // Edit Open
  const openEdit = () => {
    setEditMode(true);

    setForm({
      title: blog.title,
      content: blog.content,
      thumbnail: blog.thumbnail,
      category: blog.category,
      author: blog.author,
      published: blog.published,
    });

    setModalOpen(true);
  };

  // Create Open
  const openCreate = () => {
    setEditMode(false);

    setForm(initialForm);

    setModalOpen(true);
  };

  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ======== Edit blog and add blog ==========
  const handleSubmit = async () => {
    try {
      if (editMode) {
        await fetch(`/api/blog/${blog._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
      } else {
        await fetch(`/api/blog`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
      }

      setModalOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  // ======== delete blog ==========
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/blog/${blog._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete blog");
      }

      router.refresh(); // only this
    } catch (error) {
      console.error(error);
    }
  };

  // ======== Main ui here ==========
  return (
    <>
      <div className="mt-6 flex gap-3 flex-wrap">
        <EditButton onClick={openEdit} />

        <DeleteButton onClick={handleDelete} />

        <AddBlogButton onClick={openCreate} />
      </div>

      <BlogModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        editMode={editMode}
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
