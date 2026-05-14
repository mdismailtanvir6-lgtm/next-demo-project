// src/lib/blogs
import connectDB from "./mongodb";
import Blog from "../models/Blog";
// import Blog from "@/models/Blog";

// ==== getBlogs function ======
export async function getBlogs() {
  await connectDB();

  const blogData = await Blog.find().lean();
  return JSON.parse(JSON.stringify(blogData));
}

// // ===== get single blog ======
export async function getSingleBlog(slug) {
  await connectDB();

  const singleBlogData = await Blog.findOne({ slug }).lean();
  return JSON.parse(JSON.stringify(singleBlogData));
}

