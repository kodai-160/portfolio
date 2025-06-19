"use client";
import Link from "next/link";

type Event = {
  date: string;
  title: string;
  description?: string;
  url?: string; 
};

type YearGroup = {
  year: string;
  events: Event[];
};

const timelineData: YearGroup[] = [
  {
    year: "2022",
    events: [
      {
        date: "2022/12/16〜12/17",
        title: "セキュリティ・ミニキャンプ in 東京（オンライン開催）",
      },
    ],
  },
  {
    year: "2023",
    events: [
      {
        date: "2023/09/14〜09/17",
        title: "KITハッカソン2023 参加"
      },
      {
        date: "2023/12/02",
        title: "セキュリティ・ミニキャンプ in 石川",
      },
      {
        date: "2024/03/16〜03/17",
        title: "ICTSC 2023  本選8位",
      },
    ],
  },
  {
    year: "2024",
    events: [
      {
        date: "2024/01/19",
        title: "大学生向け 生成AIハッカソン Hackathon 2024  決勝進出",
        url: "https://www.youtube.com/watch?v=vmUFpVgwyow",
      },
      {
        date: "2024/03/23",
        title: "セキュリティ・ミニキャンプ in 大阪",
      },
      {
        date: "2024/07/03〜07/05",
        title: "JANOG54 奈良  若者支援",
      },
      {
        date: "2024/11/09〜11/10",
        title: "セキュリティ・ミニキャンプ in 北海道（オンライン開催）",
      },
    ],
  },
  {
    year: "2025",
    events: [
      {
        date: "2025/01/22〜01/24",
        title: "JANOG55 京都  NETCON委員",
      },
    ],
  },
];

export default function EventTimeline() {
    const sortedTimelineData = [...timelineData]
      .sort((a, b) => Number(b.year) - Number(a.year))
      .map((group) => ({
        ...group,
        events: [...group.events].sort(
          (a, b) => new Date(b.date.split("〜")[0]).getTime() - new Date(a.date.split("〜")[0]).getTime()
        ),
      }));
  
    return (
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">イベント参加履歴</h2>
          <div className="space-y-10">
            {sortedTimelineData.map((group) => (
              <div key={group.year}>
                <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4 border-b border-blue-200 dark:border-blue-700 pb-1">
                  {group.year}
                </h3>
                <ul className="space-y-3 pl-3 border-l-2 border-gray-300 dark:border-gray-700 relative">
                  {group.events.map((event, idx) => (
                    <li key={idx} className="pl-5 relative">
                      <span className="absolute left-[-0.4rem] top-1.5 w-2 h-2 bg-blue-400 dark:bg-blue-600 rounded-full"></span>
  
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{event.date}</p>
  
                      {event.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">{event.description}</p>
                      )}
  
                      {event.url && (
                        <Link
                          href={event.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          🔗 デモ動画
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
