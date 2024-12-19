import fs from 'fs'
import path from 'path'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

export const PrivacyPolicyContent: React.FC = () => {
  const mdPath = path.join(process.cwd(), 'src', 'components', 'privacy-policy', 'privacy-policy.md')
  const content = fs.readFileSync(mdPath, 'utf8')

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: (props) => <h1 className='mt-8 mb-4 text-3xl font-bold' {...props} />,
        h2: (props) => <h2 className='mt-6 mb-3 text-2xl font-semibold' {...props} />,
        h3: (props) => <h3 className='mt-4 mb-2 text-xl font-medium' {...props} />,
        p: (props) => <p className='my-2' {...props} />,
        ul: (props) => <ul className='list-disc pl-6 my-2' {...props} />,
        ol: (props) => <ol className='list-decimal pl-6 my-2' {...props} />,
        li: (props) => <li className='my-1' {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
