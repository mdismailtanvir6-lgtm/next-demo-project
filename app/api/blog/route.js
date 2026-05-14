// app/api/blog/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import slugify from "slugify";

// ======= GET BLOGS ========
export async function GET() {
  try {
    await connectDB();

    const blogs = await Blog.find().sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        message: "Blogs fetched successfully!",
        total: blogs.length,
        data: blogs,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// ======== POST BLOGS =======
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { title, content, thumbnail } = body;

    const slug = slugify(title, {
      lower: true,
      strict: true,
    });

    const blog = await Blog.create({
      title,
      content,
      thumbnail,
      slug,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Blog created successfully",
        data: {
          id: blog._id,
          title: blog.title,
          content: blog.content,
          thumbnail: blog.thumbnail,
          slug: blog.slug,
          category: blog.category,
          author: blog.author,
          published: blog.published,
          createdAt: blog.createdAt,
        },
        // data : blog,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
