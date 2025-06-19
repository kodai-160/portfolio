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
        
        return {
          slug,
          title: data.title || slug,
          date: data.date || new Date().toISOString().split('T')[0],
          excerpt: data.excerpt || content.substring(0, 150) + '...',
          content,
          isLocal: true,
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
    return posts;
  } catch (error) {
    console.error('ローカルブログの読み込みエラー:', error);
    return [];
  }
}

// すべてのブログ記事を取得
export function getAllBlogPosts(): BlogPost[] {
  const localPosts = getLocalBlogPosts();
  return [...localPosts, ...externalPosts];
}