"use client";
import Image from "next/image";
import Link from "next/link";

export default function Introduce() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950 dark:via-gray-900 dark:to-purple-950 px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <section className="flex flex-col items-center justify-center">
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden mb-6 shadow-2xl ring-4 ring-blue-200 dark:ring-blue-800">
          <Image
            src="/images/icon.png"
            alt="プロフィール写真"
            fill
            className="object-cover"
          />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 max-w-xl w-full">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-center text-blue-600 dark:text-blue-400 border-b-2 border-blue-300 dark:border-blue-700 pb-2">
            sugimori kodai
          </h1>
          <ul className="space-y-3 sm:space-y-4 text-gray-700 dark:text-gray-300">
            <li className="flex items-center text-sm sm:text-base lg:text-lg">
              出身：石川県
            </li>
            <li className="flex items-start text-sm sm:text-base lg:text-lg">
              <span>大学：金沢工業大学工学部情報工学科4年</span>
            </li>
            <li className="flex items-center text-sm sm:text-base lg:text-lg">
              研究室：中沢実研究室
            </li>
            <li className="flex items-start text-sm sm:text-base lg:text-lg">
              <span>
                研究内容：
                <span className="whitespace-nowrap">
                  ノード実利用率を用いたカスタムスケジューラの作成と評価
                </span>
              </span>
            </li>
            <li className="flex items-start text-sm sm:text-base lg:text-lg">
              <span>趣味：ドライブ、LIVEに行く</span>
            </li>
            <li className="flex items-center text-sm sm:text-base lg:text-lg">
              CTFチーム：sknb, Saikyo Hacking Club
            </li>
            <li className="flex items-start text-sm sm:text-base lg:text-lg">
              <span>興味分野：webセキュリティ、Network、クラウド</span>
            </li>
            <li className="flex items-start text-sm sm:text-base lg:text-lg gap-2">
              <Image
                src="/images/X.png"
                alt="X"
                width={20}
                height={20}
                className="flex-shrink-0 mt-0.5"
              />
              <Link
                href="https://x.com/kodai_06_it"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 dark:text-blue-400 hover:underline break-all"
              >
                https://x.com/kodai_06_it
              </Link>
            </li>
            <li className="flex items-start text-sm sm:text-base lg:text-lg gap-2">
              <Image
                src="/images/github.png"
                alt="github"
                width={20}
                height={20}
                className="flex-shrink-0 mt-0.5"
              />
              <Link
                href="https://github.com/kodai-160"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 dark:text-blue-400 hover:underline break-all"
              >
                https://github.com/kodai-160
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
