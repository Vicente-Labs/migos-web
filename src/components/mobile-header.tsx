'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

import { Button } from './ui/button'

type MobileHeaderProps = {
  setIsOpen: (isOpen: boolean) => void
}

export function MobileHeader({ setIsOpen }: MobileHeaderProps) {
  const commonMotionProps = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration: 0.5, delay: 0.3 },
    viewport: { once: true },
  }

  return (
    <motion.header
      className="p-4 flex items-center justify-between font-poppins lg:hidden max-w-6xl mx-auto"
      {...commonMotionProps}
    >
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <Link href="/" className="font-cooperBlack text-3xl font-semibold">
          migos
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
        className="flex items-center"
      >
        <Button
          variant="ghost"
          className="text-xl font-medium"
          onClick={() => setIsOpen(true)}
        >
          sla
        </Button>
      </motion.div>
    </motion.header>
  )
}
