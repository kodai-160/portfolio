"use client";
import Link from "next/link";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Home() {
  return (
    <>
      <div className="w-full px-5">
        <section className="flex flex-row items-center justify-between mt-4 mb-12 md:mb-12 relative">
          {/* 左側 (Kodaiの portfolio.) */}
          <div className="relative flex flex-col">
            <span className="block text-[32px] text-black translate-y-[10px] pl-1">
              Kodaiの
            </span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight">
              portfolio.
            </h1>
          </div>

        </section>
      </div>

      {/* 無限スクロールエリア */}
      <div className="w-full overflow-hidden">
        <div className="flex gap-4 animate-scroll">
          {/* 画像たちにwidth/heightを追加 */}
          <Image src="/images/minicamp.jpg" alt="スライド1" width={400} height={256} className="w-1/3 h-64 object-cover rounded-lg" />
          <Image src="/images/secprj.png" alt="スライド2" width={400} height={256} className="w-1/3 h-64 object-cover rounded-lg" />
          <Image src="/images/X.png" alt="スライド3" width={400} height={256} className="w-1/3 h-64 object-cover rounded-lg" />
          <Image src="/images/github.png" alt="スライド4" width={400} height={256} className="w-1/3 h-64 object-cover rounded-lg" />
          <Image src="/images/icon.png" alt="スライド5" width={400} height={256} className="w-1/3 h-64 object-cover rounded-lg" />
          
          {/* 複製画像も同様に */}
          <Image src="/images/minicamp.jpg" alt="スライド1" width={400} height={256} className="w-1/3 h-64 object-cover rounded-lg" />
          <Image src="/images/secprj.png" alt="スライド2" width={400} height={256} className="w-1/3 h-64 object-cover rounded-lg" />
          <Image src="/images/X.png" alt="スライド3" width={400} height={256} className="w-1/3 h-64 object-cover rounded-lg" />
          <Image src="/images/github.png" alt="スライド4" width={400} height={256} className="w-1/3 h-64 object-cover rounded-lg" />
          <Image src="/images/icon.png" alt="スライド5" width={400} height={256} className="w-1/3 h-64 object-cover rounded-lg" />
        </div>
      </div>

      {/* ナビゲーションを中央配置 */}
      <nav className="w-full flex justify-center items-center mt-16 py-6">
        <ul className="flex gap-8 text-gray-600 text-lg font-medium">
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
