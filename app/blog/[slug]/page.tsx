
import { serialize } from 'next-mdx-remote/serialize'
import fs from 'fs'
import path from 'path'
import Mdx from '@/components/ui/mdx-components'
import { notFound } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  try {
    const slug = (await params).slug
    const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.mdx`)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const source = await serialize(fileContent, { parseFrontmatter: true })

    return <Mdx {...source} />
  } catch {
    notFound()
  }
}
