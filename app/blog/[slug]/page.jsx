// app/blogContent/[slug]/route
import { getSingleBlog } from "@/lib/blogs";
import Image from "next/image";
import { notFound } from "next/navigation";

// ======== metadata for seo =========
// const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
// export async function generateMetadata({ params }) {
//   const { slug } = await params;

//   // get blog using helper function
//   const blog = await getSingleBlog(slug);

//   // if blog not found
//   if (!blog) {
//     return {
//       title: "Blog Not Found",
//     };
//   }

//   return {
//     title: blog.title,
//     description: blog.description?.slice(0, 160),

//     openGraph: {
//       title: blog.title,
//       description: blog.description?.slice(0, 160),
//       url: `${baseUrl}/blog/${blog.slug}`,
//       type: "article",
//       images: [
//         {
//           url: `${baseUrl}/og/${blog.slug}`,
//           width: 1200,
//           height: 630,
//           alt: blog.title,
//         },
//       ],
//     },

//     alternates: {
//       canonical: `${baseUrl}/blog/${blog.slug}`,
//     },
//   };
// }

// ======== main component =========
export default async function SingleBlog({ params }) {
  const { slug } = await params;

  // get blog using helper function
  const blog = await getSingleBlog(slug);

  // if blog not found
  if (!blog) {
    return notFound();
  }

  return (
    <div className="container mx-auto my-20 flex flex-col gap-y-10 px-0 md:px-10 lg:px-20">
      <h2 className="text-center text-2xl font-bold">{blog.title}</h2>

      <picture className="w-full rounded-lg overflow-hidden">
        {/* <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full rounded-lg"
        /> */}
        <Image
          src={blog?.thumbnail}
          alt={blog.title}
          width={400}
          height={300}
          className="rounded-lg object-cover w-full"
        />
      </picture>

      <p className="text-justify text-gray-400">{blog.content}</p>
    </div>
  );
}
