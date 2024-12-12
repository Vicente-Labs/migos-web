'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import Link from 'next/link'

import { useLanguage } from '@/context/language'

import { AnimatedLink } from './animated-link'
import { GitHubIcon } from './icons/github-icon'
import { TwitterIcon } from './icons/twitter-icon'

export function Footer() {
  const { dictionary } = useLanguage()

  return (
    <motion.footer
      className="p-4 sm:p-5 lg:p-7 2xl:p-9 flex flex-col items-center justify-between gap-5 sm:gap-7 font-poppins w-full max-w-[1400px] mx-auto my-5 sm:my-7 lg:my-9 md:flex-row"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col items-center gap-2 font-cooperBlack font-semibold md:items-start">
        <span className="text-lg sm:text-xl lg:text-2xl">migos</span>

        <div className="flex flex-row items-center justify-center gap-4">
          <Link
            href="https://twitter.com/trymigos"
            className="hover:text-primary transition-colors duration-200"
          >
            <TwitterIcon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
          </Link>
          <Link
            href="https://github.com/vicente-labs"
            className="hover:text-primary transition-colors duration-300"
          >
            <GitHubIcon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 text-xs sm:text-sm lg:text-base text-center md:flex-row md:text-left">
        <Link
          href="mailto:support@migos.vicentesan.dev"
          className="hover:text-primary transition-colors duration-200"
        >
          {dictionary.support}
        </Link>
        <span className="hidden md:inline">•</span>
        <span className="md:hidden">•</span>
        <span className="flex flex-row items-center justify-center gap-2 text-primary">
          with <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" /> by{' '}
          <AnimatedLink
            href="https://vicentesan.dev"
            className="text-xs sm:text-sm lg:text-base"
          >
            Vicente Sanchez
          </AnimatedLink>
        </span>
      </div>
    </motion.footer>
  )
}
