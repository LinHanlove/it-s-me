'use client'

import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote'

export default function Mdx(props: MDXRemoteProps) {
  console.log('MDXRemoteProps', props)

  return (
    <>
      <h1>{props.frontmatter.title as string}</h1>
      <MDXRemote {...props} />
    </>
  )
}
