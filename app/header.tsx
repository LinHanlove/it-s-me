'use client'
import Logo from '@/components/ui/logo'
import NavBar from '@/components/ui/navbar'
import Link from 'next/link'

export function Header() {
  return (
    <header className="z-40 mb-8 flex items-center justify-between px-12">
      <Link href="/">
        <Logo />
      </Link>
      <div className="spacer" />
      <NavBar />
    </header>
  )
}
