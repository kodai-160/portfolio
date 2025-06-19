"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navigation() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <nav className="w-full flex justify-center items-center mt-6 py-6">
      <ul className="flex gap-8 text-gray-600 dark:text-gray-400 text-lg font-medium">
        <li>
          <Link href="/" className="hover:text-black dark:hover:text-white border-b-2 border-transparent hover:border-black dark:hover:border-white cursor-pointer">
            Home
          </Link>
        </li>
        <li>
          <Link href="/introduce" className="hover:text-black dark:hover:text-white border-b-2 border-transparent hover:border-black dark:hover:border-white cursor-pointer">
            自己紹介
          </Link>
        </li>
        <li>
          <Link href="/skill" className="hover:text-black dark:hover:text-white border-b-2 border-transparent hover:border-black dark:hover:border-white cursor-pointer">
            スキル
          </Link>
        </li>
        <li>
          <Link href="/event" className="hover:text-black dark:hover:text-white border-b-2 border-transparent hover:border-black dark:hover:border-white cursor-pointer">
            イベント参加履歴
          </Link>
        </li>
        <li>
          <Link href="/blog" className="hover:text-black dark:hover:text-white border-b-2 border-transparent hover:border-black dark:hover:border-white cursor-pointer">
            ブログ
          </Link>
        </li>
      </ul>
    </nav>
  );
}
