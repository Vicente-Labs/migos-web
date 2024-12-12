'use client'

import { motion } from 'framer-motion'
import { PlusIcon } from 'lucide-react'
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
import { Button, buttonVariants } from './ui/button'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, dictionary } = useLanguage()
  const { user } = useSession()

  const navLinks = [
    { href: '#about-us', label: dictionary.aboutUs },
    // { href: `/blog`, label: 'blog' },
  ]

  const authLinks = [
    {
      href: `/${language}/sign-in`,
      label: dictionary.signIn,
      variant: 'outline' as const,
      className: 'transition-all duration-300 hover:bg-primary/10',
    },
    {
      href: `/${language}/sign-up`,
      label: dictionary.signUp,
      variant: 'default' as const,
      className: 'w-full sm:w-44',
    },
  ]

  const commonMotionProps = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration: 0.5, delay: 0.3 },
    viewport: { once: true },
  }

  const { setIsNewGroupModalOpen } = useGroupModalState()
  // const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

  return (
    <>
      <motion.header
        className="flex justify-between w-full flex-row gap-6 lg:items-center lg:gap-12 max-w-[1400px] px-3 sm:px-4 lg:px-6 2xl:px-8 my-4 sm:my-6 lg:my-8 mx-auto"
        {...commonMotionProps}
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex items-center"
        >
          <Link
            href="/"
            className="font-cooperBlack text-xl sm:text-2xl lg:text-3xl font-semibold"
          >
            migos
          </Link>
        </motion.div>

        <motion.div
          className="flex items-center gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm lg:text-base font-medium"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {!user ? (
            <>
              <ul className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                {navLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      scroll={false}
                      onClick={() => {
                        if (href.includes('#')) {
                          document.querySelector(href)?.scrollIntoView({
                            behavior: 'smooth',
                          })
                        }
                      }}
                      className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'transition-all duration-300 hover:bg-primary/10 h-8 sm:h-9 lg:h-10 text-xs sm:text-sm lg:text-base px-2 sm:px-3 lg:px-4',
                      )}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              <LangSwitcher />

              <span className="h-6 w-px rounded-full bg-foreground/20" />

              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                {authLinks.map(({ href, label, variant, className }) => (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      buttonVariants({ variant }),
                      className,
                      'h-8 sm:h-9 lg:h-10 text-xs sm:text-sm lg:text-base px-2 sm:px-3 lg:px-4',
                    )}
                  >
                    {label}
                  </Link>
                ))}
              </div>

              <MobileHeader setIsOpen={setIsOpen} />
              <MobileHeaderDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
            </>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              <Button
                className="hidden lg:flex gap-2 h-8 sm:h-9 lg:h-10 text-xs sm:text-sm lg:text-base px-2 sm:px-3 lg:px-4"
                variant="outline"
                onClick={() => setIsNewGroupModalOpen(true)}
              >
                <PlusIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4" />
                {dictionary.newGroup}
              </Button>

              {/* <NotificationsCenter /> */}

              <AvatarHeader user={user} />
            </div>
          )}
        </motion.div>
      </motion.header>
    </>
  )
}
