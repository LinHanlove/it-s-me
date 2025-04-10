import fs from 'fs'
import path from 'path'

const contentDir = './content'
const appDir = './app'

// 定义文件路径的类型
type FilePath = string

// 递归读取 content 目录
const getFiles = (dir: FilePath): FilePath[] => {
  const files = fs.readdirSync(dir)
  return files.reduce((acc: FilePath[], file: string) => {
    const filePath = path.join(dir, file)
    const stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      acc.push(...getFiles(filePath))
    } else if (file.endsWith('.mdx')) {
      acc.push(filePath)
    }
    return acc
  }, [])
}

// 创建动态路由文件
const createPageRoute = (filePath: FilePath): void => {
  const relativePath = path.relative(contentDir, filePath)
  const slug = path.basename(relativePath, '.mdx')
  const dirPath = path.dirname(relativePath)

  // 确保目录存在
  const appPath = path.join(appDir, dirPath, '[slug]')
  if (!fs.existsSync(appPath)) {
    fs.mkdirSync(appPath, { recursive: true })
  }

  const pageContent = `
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
    const filePath = path.join(process.cwd(), '${contentDir.replace(/.\//, '')}', '${dirPath}', \`\${slug}.mdx\`)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const source = await serialize(fileContent, { parseFrontmatter: true })

    return <Mdx {...source} />
  } catch {
    notFound()
  }
}
`

  const pageFilePath = path.join(appPath, 'page.tsx')
  fs.writeFileSync(pageFilePath, pageContent)
  console.log(`Generated: ${pageFilePath}`)
}

// 主函数
const generateRoutes = (): void => {
  const files = getFiles(contentDir)
  files.forEach(createPageRoute)
}

// 运行脚本
generateRoutes()
