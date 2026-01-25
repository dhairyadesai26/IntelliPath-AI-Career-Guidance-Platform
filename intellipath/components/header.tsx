import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from './ui/button';
import { LayoutDashboard } from 'lucide-react';
const Header = () => {
  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-backdrop-filter:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
     <Link href='/ '>
     <Image src='/ChatGPT Image Jan 25, 2026, 07_35_34 PM.png' alt='IntelliPath Logo' width={200} height={60} className="h-25 py-1 w-auto object-contain "/>
     </Link>
      <div>
        <SignedIn>
          <Link href='/dashboard'>
          <Button>
            <LayoutDashboard className="h-4 w-4" />
          <span className="hidden md:block" >Industry Insights</span> 
          </Button>
          </Link>
        </SignedIn>
      </div>
     
      </nav>
      <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton/>
            </SignedIn>
    </header>
  )
}

export default Header
