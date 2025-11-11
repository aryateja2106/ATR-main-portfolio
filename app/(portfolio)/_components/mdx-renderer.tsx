import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';

// Custom components for MDX
const components = {
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-4xl font-bold mt-8 mb-4 text-neutral-900 dark:text-neutral-100" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-3xl font-bold mt-8 mb-4 text-neutral-900 dark:text-neutral-100" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-2xl font-bold mt-6 mb-3 text-neutral-900 dark:text-neutral-100" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="text-xl font-semibold mt-6 mb-3 text-neutral-900 dark:text-neutral-100" {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5 className="text-lg font-semibold mt-4 mb-2 text-neutral-900 dark:text-neutral-100" {...props}>
      {children}
    </h5>
  ),
  h6: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6 className="text-base font-semibold mt-4 mb-2 text-neutral-900 dark:text-neutral-100" {...props}>
      {children}
    </h6>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-7" {...props}>
      {children}
    </p>
  ),
  a: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300 underline transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-neutral-700 dark:text-neutral-300" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-neutral-700 dark:text-neutral-300" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="ml-4" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-teal-500 pl-4 py-2 my-4 italic text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-900/50"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement> & { className?: string }) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';

    // Inline code
    if (!language) {
      return (
        <code
          className="bg-neutral-100 dark:bg-neutral-800 text-teal-600 dark:text-teal-400 px-1.5 py-0.5 rounded text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      );
    }

    // Code block
    return (
      <SyntaxHighlighter
        language={language}
        style={oneDark as any}
        customStyle={{
          borderRadius: '0.5rem',
          padding: '1.5rem',
          marginBottom: '1rem',
          fontSize: '0.875rem',
        }}
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    );
  },
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="overflow-x-auto mb-4" {...props}>
      {children}
    </pre>
  ),
  img: ({ src, alt }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <div className="relative w-full h-96 my-8 rounded-lg overflow-hidden">
      <Image
        src={src || ''}
        alt={alt || ''}
        fill
        className="object-cover"
      />
    </div>
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-neutral-200 dark:border-neutral-800" {...props} />
  ),
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border border-neutral-200 dark:border-neutral-800" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-neutral-100 dark:bg-neutral-800" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-2 text-left font-semibold text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-700" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-2 text-neutral-700 dark:text-neutral-300 border-b border-neutral-200 dark:border-neutral-800" {...props}>
      {children}
    </td>
  ),
};

// YouTube embed component
export function YouTubeEmbed({
  videoId,
  title,
  startTime
}: {
  videoId: string;
  title?: string;
  startTime?: string
}) {
  const src = `https://www.youtube.com/embed/${videoId}${startTime ? `?start=${startTime}` : ''}`;

  return (
    <div className="relative w-full aspect-video my-8 rounded-lg overflow-hidden">
      <iframe
        src={src}
        title={title || 'YouTube video'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

// Code sandbox embed component
export function CodeSandbox({
  sandboxId,
  title
}: {
  sandboxId: string;
  title?: string
}) {
  return (
    <div className="relative w-full h-[500px] my-8 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800">
      <iframe
        src={`https://codesandbox.io/embed/${sandboxId}?fontsize=14&theme=dark`}
        title={title || 'Code Sandbox'}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        className="w-full h-full"
      />
    </div>
  );
}

interface MDXRendererProps {
  content: string;
}

export default async function MDXRenderer({ content }: MDXRendererProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <MDXRemote
        source={content}
        components={{
          ...components,
          YouTubeEmbed,
          CodeSandbox,
        }}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              [
                rehypePrettyCode,
                {
                  theme: 'one-dark-pro',
                  keepBackground: true,
                },
              ],
            ],
          },
        }}
      />
    </div>
  );
}
