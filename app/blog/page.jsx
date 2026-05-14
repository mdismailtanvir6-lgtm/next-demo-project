import BlogList from "./component/BlogList";
import { getBlogs } from "../../lib/blogs";

// =========== metadata for seo ========
// const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// export const metadata = {
//   title: "Blog | My Website",
//   description: "Browse all our blogs and tutorials on web development",

//   openGraph: {
//     title: "Blog | My Website",
//     description: "Browse all our blogs and tutorials on web development",
//     url: `${baseUrl}/blog`,
//     type: "website",
//     siteName: "My Website",

//     images: [
//       {
//         url: `${baseUrl}/og/blog.png`,
//         width: 1200,
//         height: 630,
//         alt: "Blog Page",
//       },
//     ],
//   },

//   alternates: {
//     canonical: `${baseUrl}/blog`,
//   },
// };

// =========== main blog page component ========
export default async function BlogPage() {
  const blogs = await getBlogs();

  // Example auth
  const isAdmin = true;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">All Blogs</h1>
      </div>

      <BlogList blogs={blogs} isAdmin={isAdmin} />
    </div>
  );
}
