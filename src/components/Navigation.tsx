"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (pathname === "/") return null;

  return (
    <nav className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ロゴ/ホームリンク */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Portfolio
            </Link>
          </div>

          {/* デスクトップメニュー */}
          <div className="hidden md:block">
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
          </div>

          {/* モバイルメニューボタン */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className="md:hidden">
            <ul className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900">
              <li>
                <Link href="/" className="block px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/introduce" className="block px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white" onClick={() => setIsMenuOpen(false)}>
                  自己紹介
                </Link>
              </li>
              <li>
                <Link href="/skill" className="block px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white" onClick={() => setIsMenuOpen(false)}>
                  スキル
                </Link>
              </li>
              <li>
                <Link href="/event" className="block px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white" onClick={() => setIsMenuOpen(false)}>
                  イベント参加履歴
                </Link>
              </li>
              <li>
                <Link href="/blog" className="block px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white" onClick={() => setIsMenuOpen(false)}>
                  ブログ
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
