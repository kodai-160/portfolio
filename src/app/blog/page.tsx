import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";

export default function BlogPage() {
  const blogPosts = getAllBlogPosts();

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">ブログ一覧</h1>

        <div className="grid gap-8 md:grid-cols-2">
          {blogPosts.map((post, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {post.title}
                  </h2>
                  {post.isLocal && (
                    <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded">
                      Local
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {post.date}
                </p>

                <Link
                  href={post.isLocal ? `/blog/${post.slug}` : post.url!}
                  target={post.isLocal ? "_self" : "_blank"}
                  rel={post.isLocal ? "" : "noopener noreferrer"}
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium inline-flex items-center"
                >
                  記事を読む
                  {post.isLocal ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  )}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}