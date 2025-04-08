'use client'
import Link from 'next/link'
import React from 'react'
import { Icon } from '@iconify/react'
import ToggleTheme from './toggleTheme'

export default function Navbar() {
  return (
    <div className="right flex items-center gap-x-8">
      <Link href="/posts" title="Blog">
        <span className="hidden md:block">Blog</span>
        <Icon icon="ri:article-line" className="block md:hidden" />
      </Link>
      <Link href="/projects" title="Projects">
        <span className="hidden md:block">Projects</span>
        <Icon icon="ri:lightbulb-line" className="block md:hidden" />
      </Link>

      <Link href="/products" title="Products">
        <span className="hidden md:block">Products</span>
        <Icon icon="eos-icons:products-outlined" className="block md:hidden" />
      </Link>
      <Link href="/interesting" title="Interesting">
        <span className="hidden md:block">Interesting</span>
        <Icon icon="solar:star-rings-broken" className="block md:hidden" />
      </Link>
      {/* <Link to="/demos" title="Demos">
            <div i-ri-screenshot-line />
          </Link> */}
      <a
        href="https://github.com/LinHanlove"
        target="_blank"
        title="GitHub"
        className="hidden md:block"
      >
        <Icon icon="uil:github-alt" />
      </a>
      <ToggleTheme />
    </div>
  )
}
