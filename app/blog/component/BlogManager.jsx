"use client";

import { useState } from "react";

import BlogModal from "./BlogModal";

import {
  AddBlogButton,
  EditButton,
  DeleteButton,
} from "./BlogActions";

export default function BlogManager({
  blog,
}) {
  const [modalOpen, setModalOpen] =
    useState(false);

  const [editMode, setEditMode] =
    useState(false);

  const initialForm = {
    title: "",
    content: "",
    thumbnail: "",
    category: "General",
    author: "Admin",
    published: true,
  };

  const [form, setForm] =
    useState(initialForm);

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

  // Submit
  const handleSubmit = async () => {
    try {
      if (editMode) {
        await fetch(`/api/blog/${blog.slug}`, {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        });
      } else {
        await fetch(`/api/blog`, {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        });
      }

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  // Delete
  const handleDelete = async () => {
    try {
      await fetch(`/api/blog/${blog.slug}`, {
        method: "DELETE",
      });

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="mt-6 flex gap-3 flex-wrap">
        <EditButton onClick={openEdit} />

        <DeleteButton
          onClick={handleDelete}
        />

        <AddBlogButton
          onClick={openCreate}
        />
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