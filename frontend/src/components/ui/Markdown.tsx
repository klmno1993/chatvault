import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeHighlight from 'rehype-highlight'
import rehypeKatex from 'rehype-katex'
import { Check, Copy } from 'lucide-react'
import 'katex/dist/katex.min.css'

function CodeBlock({ children, className }: { children?: React.ReactNode; className?: string }) {
  const [copied, setCopied] = useState(false)

  const language = (className ?? '')
    .split(' ')
    .find(c => c.startsWith('language-'))
    ?.replace('language-', '') ?? ''

  const rawText = extractText(children)

  const handleCopy = () => {
    navigator.clipboard.writeText(rawText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <span className="code-lang">{language || 'code'}</span>
        <button className="code-copy-btn" onClick={handleCopy}>
          {copied
            ? <><Check size={12} /> 已复制</>
            : <><Copy size={12} /> 复制</>}
        </button>
      </div>
      <pre className={className}>{children}</pre>
    </div>
  )
}

function extractText(node: React.ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (Array.isArray(node)) return (node as React.ReactNode[]).map(extractText).join('')
  if (node !== null && typeof node === 'object' && 'props' in node) {
    const el = node as React.ReactElement<{ children?: React.ReactNode }>
    return extractText(el.props.children)
  }
  return ''
}

interface MarkdownProps {
  content: string
  className?: string
}

export function Markdown({ content, className }: MarkdownProps) {
  return (
    <div className={['prose-content', className].filter(Boolean).join(' ')}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeHighlight, rehypeKatex]}
        components={{
          // Custom code block with header + copy
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          pre: ({ children }) => <>{children}</>,
          code: ({ className: cls, children, ...props }) => {
            const isBlock = cls?.includes('language-')
            if (isBlock) {
              return <CodeBlock className={cls}>{children}</CodeBlock>
            }
            return <code className={cls} {...props}>{children}</code>
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
