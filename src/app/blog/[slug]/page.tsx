import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getLocalBlogPosts, formatDate } from '@/lib/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';

// 動的メタデータの生成を修正（params を await する）
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
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

// 特定のスラッグのブログ記事を取得（非同期化）
async function getBlogPostBySlug(slug: string) {
	const blogsDirectory = path.join(process.cwd(), 'src/content/blogs');
	const fullPath = path.join(blogsDirectory, `${slug}.md`);

	try {
		await fs.promises.access(fullPath, fs.constants.F_OK);
		const fileContents = await fs.promises.readFile(fullPath, 'utf8');
		const { data, content } = matter(fileContents);

		return {
			slug,
			title: data.title || slug,
			// date が Date オブジェクトの場合も文字列に変換して返す
			date: data && data.date ? formatDate(data.date) : '',
			content,
			excerpt: data.excerpt || '',
		};
	} catch {
		return null;
	}
}

// ブログ詳細ページのコンポーネントを修正（params を await する）
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const post = await getBlogPostBySlug(slug);

	if (!post) {
		notFound();
	}

	return (
		<main className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
			<div className="max-w-4xl mx-auto">
				<Link 
					href="/blog" 
					className="text-blue-600 dark:text-blue-400 hover:underline mb-4 sm:mb-6 inline-flex items-center text-sm sm:text-base"
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
					</svg>
					ブログ一覧に戻る
				</Link>
				
				<article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-700">
					<header className="mb-6 sm:mb-8 border-b border-gray-200 dark:border-gray-700 pb-3 sm:pb-4">
						<h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100 leading-tight">{post.title}</h1>
						<time className="text-sm sm:text-base text-gray-500 dark:text-gray-400">{post.date}</time>
					</header>
					
					<div className="prose dark:prose-invert prose-sm sm:prose-lg max-w-none markdown-content">
						<ReactMarkdown 
							remarkPlugins={[remarkGfm]}
							rehypePlugins={[rehypeRaw]}
							components={{
								h1: (props) => <h1 className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4 text-gray-900 dark:text-gray-100" {...props} />,
								h2: (props) => <h2 className="text-lg sm:text-xl font-bold mt-4 sm:mt-6 mb-2 sm:mb-3 text-gray-900 dark:text-gray-100" {...props} />,
								h3: (props) => <h3 className="text-base sm:text-lg font-bold mt-3 sm:mt-4 mb-1 sm:mb-2 text-gray-900 dark:text-gray-100" {...props} />,
								p: (props) => <p className="mb-3 sm:mb-4 leading-relaxed text-gray-800 dark:text-gray-200 text-sm sm:text-base" {...props} />,
								ul: (props) => <ul className="list-disc pl-4 sm:pl-6 mb-3 sm:mb-4 text-gray-800 dark:text-gray-200 text-sm sm:text-base" {...props} />,
								ol: (props) => <ol className="list-decimal pl-4 sm:pl-6 mb-3 sm:mb-4 text-gray-800 dark:text-gray-200 text-sm sm:text-base" {...props} />,
								li: (props) => <li className="mb-1 text-gray-800 dark:text-gray-200" {...props} />,
								code: ({ className, children, ...props }) => {
									const match = /language-(\w+)/.exec(className || '');
									return match ? (
										<pre className="bg-gray-100 dark:bg-gray-800 p-2 sm:p-4 rounded overflow-x-auto mb-3 sm:mb-4 text-xs sm:text-sm">
											<code className={className} {...props}>{children}</code>
										</pre>
									) : (
										<code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-xs sm:text-sm text-gray-800 dark:text-gray-200" {...props}>{children}</code>
									);
								},
								a: (props) => <a className="text-blue-600 dark:text-blue-400 hover:underline break-words" {...props} />,
								blockquote: (props) => <blockquote className="border-l-4 border-blue-300 dark:border-blue-700 pl-3 sm:pl-4 italic mb-3 sm:mb-4 text-gray-700 dark:text-gray-300 text-sm sm:text-base" {...props} />,
								img: ({ src, alt }) => {
									if (!src) return null;
									return (
										<div className="relative w-full h-[300px] my-4">
											<Image
												src={src}
												alt={alt ?? ''}
												fill
												className="object-contain rounded"
												sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
												priority={true}
											/>
										</div>
									);
								},
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