"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Twitter,
} from "lucide-react";

export default function Introduce() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-5 py-10">
      <section className="flex flex-col items-center justify-center">
        <div className="relative w-40 h-40 rounded-full overflow-hidden mb-6 shadow-2xl ring-4 ring-blue-200">
          <Image
            src="/images/icon.png"
            alt="プロフィール写真"
            fill
            className="object-cover"
          />
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-6 max-w-xl w-full">
          <h1 className="text-4xl font-bold mb-6 text-center text-blue-600 border-b-2 border-blue-300 pb-2">
            sugimori kodai
          </h1>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-center text-lg">
              出身：石川県
            </li>
            <li className="flex items-center text-lg">
              大学：金沢工業大学工学部情報工学科4年
            </li>
            <li className="flex items-center text-lg">
              研究室：中沢実研究室
            </li>
            <li className="flex items-start text-lg">
              <span>
                研究内容：<span className="whitespace-nowrap">OpenStack, k8sを使用したプライベートクラウドの実装</span>
              </span>
            </li>
            <li className="flex items-center text-lg">
              趣味：ポケポケ、ドライブ、LIVEに行く
            </li>
            <li className="flex items-center text-lg">
              CTFチーム：sknb
            </li>
            <li className="flex items-center text-lg">
              興味分野：webセキュリティ、Network、クラウド
            </li>
            <li className="flex items-center text-lg">
              <Twitter className="mr-2 text-blue-500" size={20} />
              <Link
                href="https://x.com/kodai_06_it"
                target="_blank"
                className="text-blue-500 underline hover:text-blue-700"
              >
                @kodai_06_it
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
