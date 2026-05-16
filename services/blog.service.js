"use server";
// services/blog.service.js
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";

// ======== get all blogs from db =========
export async function getBlogs() {
  await connectDB();

  const blogData = await Blog.find().lean();
  return JSON.parse(JSON.stringify(blogData));
}

// ======== get single blog details from db =========
export async function getSingleBlog(slug) {
  await connectDB();

  const singleBlogData = await Blog.findOne({ slug }).lean();
  return JSON.parse(JSON.stringify(singleBlogData));
}

// ======== create blog on db =========
// export async function createBlog(data) {
//   await connectDB();

//   const newBlog = await Blog.create(data);

//   return JSON.parse(JSON.stringify(newBlog));
// }

// // ======== update blog from db =========
// export async function updateBlog(id, updatedData) {
//   await connectDB();

//   const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, {
//     new: true,
//   }).lean();

//   return JSON.parse(JSON.stringify(updatedBlog));
// }

// // ======== delete blog from db =========
// export async function deleteBlog(id) {
//   await connectDB();

//   const deletedBlog = await Blog.findByIdAndDelete(id);

//   return JSON.parse(JSON.stringify(deletedBlog));
// }
