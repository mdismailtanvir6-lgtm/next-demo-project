import Image from "next/image";
import Link from "next/link";

import BlogManager from "./BlogManager";

export default function BlogCard({
  blog,
  isAdmin,
}) {
  return (
    <div className="border border-gray-300 p-4 rounded-xl shadow-sm">
      <div className="space-y-4">
        <h2 className="font-bold text-lg">
          {blog.title}
        </h2>

        <Link href={`/blog/${blog.slug}`}>
          <p className="text-gray-500 text-justify line-clamp-3 hover:text-gray-700 cursor-pointer">
            {blog.content}
          </p>
        </Link>

        <Link href={`/blog/${blog.slug}`}>
          <Image
            src={blog?.thumbnail}
            alt={blog.title}
            width={400}
            height={250}
            className="rounded-lg object-cover w-full h-[220px]"
          />
        </Link>
      </div>

      {/* Client Component */}
      {isAdmin && (
        <BlogManager blog={blog} />
      )}
    </div>
  );
}