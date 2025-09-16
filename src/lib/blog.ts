import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  content?: string;
  isLocal: boolean;
  url?: string;
};

// 外部ブログ記事の定義
export const externalPosts: BlogPost[] = [
    {
    slug: 'seccamp',
    title: "セキュリティキャンプ2025 B【プロダクトセキュリティクラス】 応募課題晒し",
    date: "2025/06/26",
    url: "https://zenn.dev/kodai_160/articles/54cd845cc91a77",
    isLocal: false,
  },
  {
    slug: 'janog55-netcon',
    title: "JANOG55 NETCON問題解説(Level3-6)",
    date: "2025/01/27",
    url: "https://note.com/kodai_06/n/nb70813433990",
    isLocal: false,
  },
  {
    slug: 'school-ctf-writeup',
    title: "学内CTF writeup",
    date: "2025/01/16",
    url: "https://qiita.com/kodai-160/items/db64183ba140f7118f9c",
    isLocal: false,
  },
  {
    slug: 'cisco-packet-tracer',
    title: "Cisco Packet Tracerを使ってRIPルーティング",
    date: "2024/11/19",
    url: "https://qiita.com/kodai-160/items/7c1e353fbe303290c38e",
    isLocal: false,
  },
  {
    slug: 'vulnhub-setup',
    title: "VulnHubのセットアップ方法",
    date: "2024/04/20",
    url: "https://qiita.com/kodai-160/items/c162e4741315dcf737e9",
    isLocal: false,
  },
  {
    slug: 'http-smuggling',
    title: "HTTP request smugglingについて",
    date: "2023/12/03",
    url: "https://qiita.com/kodai-160/items/735393514a8377c50a4e",
    isLocal: false,
  },
  {
    slug: 'tsuku-ctf',
    title: "TsukuCTF2023 Write up",
    date: "2023/11/11",
    url: "https://qiita.com/kodai-160/items/e039dfe99e37a46eb54a",
    isLocal: false,
  },
];

// 日付を YYYY/MM/DD の文字列に正規化
export function formatDate(value: Date): string {
	// value が既に文字列か Date かを受けて処理
	if (!value) return '';
	const d = new Date(value);
	if (isNaN(d.getTime())) {
		// パースできない場合は文字列として返す
		return String(value);
	}
	const yyyy = d.getFullYear();
	const mm = String(d.getMonth() + 1).padStart(2, '0');
	const dd = String(d.getDate()).padStart(2, '0');
	return `${yyyy}/${mm}/${dd}`;
}

// 文字列日付をタイムスタンプに変換（ソート用）
function toTimestamp(dateStr: string): number {
	if (!dateStr) return 0;
	// 'YYYY/MM/DD' や 'YYYY-MM-DD' に対応
	const normalized = dateStr.replace(/\//g, '-');
	const t = new Date(normalized).getTime();
	return isNaN(t) ? 0 : t;
}

// マークダウンブログの読み込み
export function getLocalBlogPosts(): BlogPost[] {
  try {
    const blogsDirectory = path.join(process.cwd(), 'src/content/blogs');
    
    if (!fs.existsSync(blogsDirectory)) {
      return [];
    }
    
    const fileNames = fs.readdirSync(blogsDirectory);
    
    const posts = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        // ファイル名からスラッグを取得
        const slug = fileName.replace(/\.md$/, '');
        
        // ファイルの内容を読み取る
        const fullPath = path.join(blogsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        
        // Front Matter（メタデータ）を解析
        const { data, content } = matter(fileContents);
        
        // 日付を正規化（Date オブジェクトや文字列を YYYY/MM/DD にする）
        const date = data && data.date ? formatDate(data.date) : new Date().toISOString().split('T')[0].replace(/-/g, '/');
        
        return {
          slug,
          title: data.title || slug,
          date,
          excerpt: data.excerpt || content.substring(0, 150) + '...',
          content,
          isLocal: true,
        };
      })
      .sort((a, b) => toTimestamp(b.date) - toTimestamp(a.date));
      
    return posts;
  } catch (error) {
    console.error('ローカルブログの読み込みエラー:', error);
    return [];
  }
}

// すべてのブログ記事を取得
export function getAllBlogPosts(): BlogPost[] {
  const localPosts = getLocalBlogPosts();
  const allPosts = [...localPosts, ...externalPosts];
  
  // 日付を文字列として比較（安定したソート）
  return allPosts.sort((a, b) => {
    return toTimestamp(b.date) - toTimestamp(a.date);
  });
}