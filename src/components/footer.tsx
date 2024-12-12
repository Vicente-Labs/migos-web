'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import Link from 'next/link'

import { AnimatedLink } from './animated-link'

export function Footer() {
  return (
    <motion.footer
      className="p-3 sm:p-4 lg:p-6 2xl:p-8 flex flex-col items-center justify-between gap-4 sm:gap-6 font-poppins w-full max-w-[1400px] mx-auto my-4 sm:my-6 lg:my-8 md:flex-row"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col items-center gap-2 font-cooperBlack font-semibold md:items-start">
        <span className="text-lg sm:text-xl lg:text-2xl">migos</span>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 text-xs sm:text-sm lg:text-base text-center md:flex-row md:text-left">
        <Link
          href="mailto:support@migos.vicentesan.dev"
          className="hover:text-primary transition-colors duration-200"
        >
          support
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
