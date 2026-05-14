// app/api/blog/[slug]/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import slugify from "slugify";


// ===== UPDATE BLOG =====
export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();
    const { title, content, thumbnail, category,  author, published } =
      body;
    
    const newSlug = slugify(title, {
      lower: true,
      strict: true,
    });

    const updatedBlog = await Blog.findOneAndUpdate(
      { id },
      {
        title,
        content,
        thumbnail,
        category,
        slug: newSlug,
        author,
        published,
      },
      { returnDocument: "after" },
    );

    if (!updatedBlog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}

// DELETE BLOG
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { slug } = await params;

    const deletedBlog = await Blog.findOneAndDelete({ slug });

    if (!deletedBlog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
      data: deletedBlog,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
