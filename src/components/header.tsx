'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

import { useGroupModalState } from '@/context/group-modal'
import { useLanguage } from '@/context/language'
import { useSession } from '@/context/session'
import { cn } from '@/lib/utils'

import AvatarHeader from './avatar-header'
import { LangSwitcher } from './lang-switcher'
import { MobileHeader } from './mobile-header'
import { MobileHeaderDrawer } from './mobile-header-drawer'
import { NotificationsCenter } from './notifications-center'
import { Button, buttonVariants } from './ui/button'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useLanguage()
  const { user } = useSession()

  const navLinks = [
    { href: '#about-us', label: 'about us' },
    { href: '#blog', label: 'blog' },
  ]

  const authLinks = [
    {
      href: `/${language}/sign-in`,
      label: 'sign in',
      variant: 'outline' as const,
      className: 'transition-all duration-300 hover:bg-primary/10',
    },
    {
      href: `/${language}/sign-up`,
      label: 'sign up',
      variant: 'default' as const,
      className: 'w-44',
    },
  ]

  const commonMotionProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5, delay: 0.3 },
  }

  const { setIsNewGroupModalOpen } = useGroupModalState()

  return (
    <>
      <motion.header
        className="text-smooth m-10 hidden items-center justify-between font-poppins md:flex w-fit-content"
        {...commonMotionProps}
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/" className="font-cooperBlack text-3xl font-semibold">
            migos
          </Link>
        </motion.div>

        <motion.div
          className="flex items-center gap-4 text-xl font-medium"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {!user ? (
            <>
              <ul className="flex items-center gap-4">
                {navLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      scroll={true}
                      className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'transition-all duration-300 hover:bg-primary/10',
                      )}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              <LangSwitcher />

              <span className="h-6 w-px rounded-full bg-foreground/20" />

              <div className="flex items-center gap-4">
                {authLinks.map(({ href, label, variant, className }) => (
                  <Link
                    key={href}
                    href={href}
                    className={cn(buttonVariants({ variant }), className)}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-8">
              <Button
                className="w-48"
                onClick={() => setIsNewGroupModalOpen(true)}
              >
                new group
              </Button>

              <NotificationsCenter />

              <AvatarHeader user={user} />
            </div>
          )}
        </motion.div>
      </motion.header>

      <MobileHeader setIsOpen={setIsOpen} />
      <MobileHeaderDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
