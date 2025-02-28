import fs from 'fs'
import path from 'path'
import { MarkdownRenderer } from '../shared/MarkdownRenderer'

export const PrivacyPolicyContent: React.FC = () => {
  const mdPath = path.join(process.cwd(), 'src', 'components', 'privacy-policy', 'privacy-policy.md')
  const content = fs.readFileSync(mdPath, 'utf8')

  return <MarkdownRenderer content={content} />
}
