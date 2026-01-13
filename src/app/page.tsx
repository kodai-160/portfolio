"use client";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <section className="flex flex-col sm:flex-row items-center justify-between mt-4 mb-8 sm:mb-12 relative">
          <div className="relative flex flex-col text-center sm:text-left">
            <span className="block text-2xl sm:text-[32px] text-black dark:text-white translate-y-[5px] sm:translate-y-[10px] pl-0 sm:pl-1">
              Kodaiの
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold tracking-tighter leading-tight text-black dark:text-white">
              portfolio.
            </h1>
          </div>
        </section>
      </div>

      {/* 無限スクロールエリア */}
      <div className="w-full overflow-hidden">
        <div className="flex gap-2 sm:gap-4 animate-scroll">
          <Image src="/images/minicamp.jpg" alt="スライド1" width={400} height={256} className="w-1/3 sm:w-1/4 h-32 sm:h-48 md:h-64 object-cover rounded-lg flex-shrink-0" />
          <Image src="/images/secprj.png" alt="スライド2" width={400} height={256} className="w-1/3 sm:w-1/4 h-32 sm:h-48 md:h-64 object-cover rounded-lg flex-shrink-0" />
          <Image src="/images/X.png" alt="スライド3" width={400} height={256} className="w-1/3 sm:w-1/4 h-32 sm:h-48 md:h-64 object-cover rounded-lg flex-shrink-0" />
          <Image src="/images/github.png" alt="スライド4" width={400} height={256} className="w-1/3 sm:w-1/4 h-32 sm:h-48 md:h-64 object-cover rounded-lg flex-shrink-0" />
          <Image src="/images/icon.png" alt="スライド5" width={400} height={256} className="w-1/3 sm:w-1/4 h-32 sm:h-48 md:h-64 object-cover rounded-lg flex-shrink-0" />
          
          <Image src="/images/minicamp.jpg" alt="スライド1" width={400} height={256} className="w-1/3 sm:w-1/4 h-32 sm:h-48 md:h-64 object-cover rounded-lg flex-shrink-0" />
          <Image src="/images/secprj.png" alt="スライド2" width={400} height={256} className="w-1/3 sm:w-1/4 h-32 sm:h-48 md:h-64 object-cover rounded-lg flex-shrink-0" />
          <Image src="/images/X.png" alt="スライド3" width={400} height={256} className="w-1/3 sm:w-1/4 h-32 sm:h-48 md:h-64 object-cover rounded-lg flex-shrink-0" />
          <Image src="/images/github.png" alt="スライド4" width={400} height={256} className="w-1/3 sm:w-1/4 h-32 sm:h-48 md:h-64 object-cover rounded-lg flex-shrink-0" />
          <Image src="/images/icon.png" alt="スライド5" width={400} height={256} className="w-1/3 sm:w-1/4 h-32 sm:h-48 md:h-64 object-cover rounded-lg flex-shrink-0" />
        </div>
      </div>

      {/* ナビゲーションを中央配置 */}
      <nav className="w-full flex justify-center items-center mt-8 sm:mt-16 py-4 sm:py-6">
        <ul className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 text-gray-600 dark:text-gray-400 text-base sm:text-lg font-medium text-center">
          <li>
            <Link href="/introduce" className="hover:text-black dark:hover:text-white border-b-2 border-transparent hover:border-black dark:hover:border-white cursor-pointer block sm:inline">
              自己紹介
            </Link>
          </li>
          <li>
            <Link href="/skill" className="hover:text-black dark:hover:text-white border-b-2 border-transparent hover:border-black dark:hover:border-white cursor-pointer block sm:inline">
              スキル
            </Link>
          </li>
          <li>
            <Link href="/event" className="hover:text-black dark:hover:text-white border-b-2 border-transparent hover:border-black dark:hover:border-white cursor-pointer block sm:inline">
              イベント参加履歴
            </Link>
          </li>
          <li>
            <Link href="/blog" className="hover:text-black dark:hover:text-white border-b-2 border-transparent hover:border-black dark:hover:border-white cursor-pointer block sm:inline">
              ブログ
            </Link>
          </li>
          <li>
            <a href="https://kodai-160.github.io/" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
              writeup置き場
            </a>
          </li>
        </ul>
      </nav>

      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          display: flex;
          white-space: nowrap;
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </>
  );
}