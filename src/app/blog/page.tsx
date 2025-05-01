"use client";
import Link from "next/link";

type BlogPost = {
  title: string;
  date: string;
  url: string;
};

const blogPosts: BlogPost[] = [
  {
    title: "JANOG55 NETCON問題解説(Level3-6)",
    date: "2025/01/27",
    url: "https://note.com/kodai_06/n/nb70813433990",
  },
  {
    title: "学内CTF writeup",
    date: "2025/01/16",
    url: "https://qiita.com/kodai-160/items/db64183ba140f7118f9c",
  },
  {
    title: "Cisco Packet Tracerを使ってRIPルーティング",
    date: "2024/11/19",
    url: "https://qiita.com/kodai-160/items/7c1e353fbe303290c38e",
  },
  {
    title: "VulnHubのセットアップ方法",
    date: "2024/04/20",
    url: "https://qiita.com/kodai-160/items/c162e4741315dcf737e9",
  },
  {
    title: "HTTP request smugglingについて",
    date: "2023/12/03",
    url: "https://qiita.com/kodai-160/items/735393514a8377c50a4e",
  },
  {
    title: "TsukuCTF2023 Write up",
    date: "2023/11/11",
    url: "https://qiita.com/kodai-160/items/e039dfe99e37a46eb54a",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">ブログ一覧</h1>

        <div className="grid gap-8 md:grid-cols-2">
          {blogPosts.map((post, idx) => (
            <div
              key={idx}
              className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="p-5">
                <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
                <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                <Link
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  記事を読む →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
