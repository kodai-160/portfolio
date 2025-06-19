import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getLocalBlogPosts } from '@/lib/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Params = {
  params: {
    slug: string;
  };
};

// 動的メタデータの生成
export async function generateMetadata({ params }: Params): Promise<Metadata> {
	// await params before using its properties
	const { slug } = await params;
	const post = await getBlogPostBySlug(slug);
	if (!post) {
		notFound();
	}
	return {
		title: post.title,
		description: post.excerpt,
	};
}

// 静的生成のためのパスを列挙
export function generateStaticParams() {
	const posts = getLocalBlogPosts();
	return posts.map((post) => ({
		slug: post.slug,
	}));
}

// 特定のスラッグのブログ記事を取得
function getBlogPostBySlug(slug: string) {
	const blogsDirectory = path.join(process.cwd(), 'src/content/blogs');
	const fullPath = path.join(blogsDirectory, `${slug}.md`);
	
	if (!fs.existsSync(fullPath)) {
		return null;
	}
	
	const fileContents = fs.readFileSync(fullPath, 'utf8');
	const { data, content } = matter(fileContents);
	
	return {
		slug,
		title: data.title || slug,
		date: data.date || '',
		content,
		excerpt: data.excerpt || '',
	};
}

// ブログ詳細ページのコンポーネント
export default async function BlogPost({ params }: Params) {
	const { slug } = await params;
	const post = await getBlogPostBySlug(slug);
	
	if (!post) {
		notFound();
	}

	return (
		<main className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-6 py-12">
			<div className="max-w-4xl mx-auto">
				<Link 
					href="/blog" 
					className="text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-flex items-center"
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
					</svg>
					ブログ一覧に戻る
				</Link>
				
				<article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
					<header className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
						<h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">{post.title}</h1>
						<time className="text-gray-500 dark:text-gray-400">{post.date}</time>
					</header>
					
					<div className="prose dark:prose-invert prose-lg max-w-none markdown-content">
						<ReactMarkdown 
							remarkPlugins={[remarkGfm]}
							components={{
								h1: ({ ...props}) => <h1 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-100" {...props} />,
								h2: ({ ...props}) => <h2 className="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-gray-100" {...props} />,
								h3: ({ ...props}) => <h3 className="text-lg font-bold mt-4 mb-2 text-gray-900 dark:text-gray-100" {...props} />,
								p: ({ ...props}) => <p className="mb-4 leading-relaxed text-gray-800 dark:text-gray-200" {...props} />,
								ul: ({ ...props}) => <ul className="list-disc pl-6 mb-4 text-gray-800 dark:text-gray-200" {...props} />,
								ol: ({ ...props}) => <ol className="list-decimal pl-6 mb-4 text-gray-800 dark:text-gray-200" {...props} />,
								li: ({ ...props}) => <li className="mb-1 text-gray-800 dark:text-gray-200" {...props} />,
								code: ({
									inline,
									className,
									children,
									...props
								}: {
									inline?: boolean;
									className?: string;
									children?: React.ReactNode;
									[key: string]: any;
								}) => {
									const match = /language-(\w+)/.exec(className || '');
									return !inline && match ? (
										<pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto mb-4">
											<code className={className} {...props}>{children}</code>
										</pre>
									) : (
										<code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm text-gray-800 dark:text-gray-200" {...props}>{children}</code>
									);
								},
								a: ({ ...props}) => <a className="text-blue-600 dark:text-blue-400 hover:underline" {...props} />,
								blockquote: ({ ...props}) => <blockquote className="border-l-4 border-blue-300 dark:border-blue-700 pl-4 italic mb-4 text-gray-700 dark:text-gray-300" {...props} />,
							}}
						>
							{post.content}
						</ReactMarkdown>
					</div>
				</article>
			</div>
		</main>
	);
}