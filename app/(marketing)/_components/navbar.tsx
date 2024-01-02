'use client'

import { ModeToggle } from '@/components/mode-toggle'
import { useScrollTop } from '@/Hooks/use-scroll-top'
import { cn } from '@/lib/utils'
import { Logo } from './logo'
import { SignUpButton } from '@/firebase/components/useSignUpButton'

export const Navbar = () => {
  const scrolled = useScrollTop();
  return (
    <div className={ cn('flex items-center justify-between py-3 px-8 fixed top-0 bg-white dark:bg-[#1F1F1F] z-50 w-full', scrolled && 'border-b dark:border-2 shadow')}>
      <div>
       <Logo/>
      </div>
      <div className='flex gap-3 items-center w-full sm:w-auto justify-between'>
        <SignUpButton name='Sign In'/>
        <ModeToggle />
      </div>
    </div>
  )
}
