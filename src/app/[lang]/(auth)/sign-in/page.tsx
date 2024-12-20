'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

import { SignInForm } from './sign-in-form'

export default function SignInPage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-row items-center justify-center gap-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-40 hidden lg:flex lg:flex-col lg:items-center lg:justify-center"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-cooperBlack text-5xl lg:text-7xl"
        >
          migos
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="relative size-[300px] lg:size-[500px]"
        >
          <Image
            src="/gifts.png"
            alt="Gifts"
            fill
            priority
            className="object-contain"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex w-full max-w-sm flex-col gap-6 rounded-lg p-6"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-cooperBlack text-3xl"
        >
          Welcome Back
        </motion.h2>

        <SignInForm />
      </motion.div>
    </div>
  )
}
