"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navigation() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <nav className="w-full flex justify-center items-center mt-6 py-6">
      <ul className="flex gap-8 text-gray-600 text-lg font-medium">
        <li>
          <Link href="/" className="hover:text-black border-b-2 border-transparent hover:border-black cursor-pointer">
            Home
          </Link>
        </li>
        <li>
          <Link href="/introduce" className="hover:text-black border-b-2 border-transparent hover:border-black cursor-pointer">
            自己紹介
          </Link>
        </li>
        <li>
          <Link href="/skill" className="hover:text-black border-b-2 border-transparent hover:border-black cursor-pointer">
            スキル
          </Link>
        </li>
        <li>
          <Link href="/event" className="hover:text-black border-b-2 border-transparent hover:border-black cursor-pointer">
            イベント参加履歴
          </Link>
        </li>
        <li>
          <Link href="/blog" className="hover:text-black border-b-2 border-transparent hover:border-black cursor-pointer">
            ブログ
          </Link>
        </li>
      </ul>
    </nav>
  );
}
