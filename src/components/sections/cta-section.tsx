'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useLanguage } from '@/context/language'

import { Button } from '../ui/button'

export function CTASection() {
  const { dictionary, language } = useLanguage()
  const router = useRouter()

  return (
    <motion.section
      id="home"
      className="mx-auto flex max-w-[1400px] flex-col items-center justify-center lg:flex-row my-40 md:my-0"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="flex w-full flex-col items-center gap-6 text-center sm:gap-8 md:gap-10 lg:w-1/2 lg:items-start lg:text-left"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col items-center gap-2 sm:gap-3 lg:items-start">
          <h1 className="max-w-lg break-words text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
            {dictionary.hohoho}, <br />
            {dictionary.santaIsBack}
          </h1>
          <div className="flex flex-col gap-1">
            <span className="max-w-lg break-words text-lg text-[#848780] sm:text-xl md:text-2xl">
              {dictionary.migosIsReadyToHelp}
            </span>
            <span className="max-w-lg break-words text-lg text-[#848780] sm:text-xl md:text-2xl">
              {dictionary.whatAboutYou}
            </span>
          </div>
        </div>

        <div className="w-full max-w-md sm:w-3/4 md:w-2/3 lg:w-full">
          <Button
            onClick={() => {
              router.push(`/${language}/sign-up`)
            }}
            className="flex w-full flex-row items-center justify-center bg-gradient-to-r from-primary to-primary/90 px-4 py-4 text-sm font-bold transition-all hover:opacity-90 sm:px-6 sm:py-6 sm:text-xl"
          >
            {dictionary.startMySecretSanta}
          </Button>
        </div>
      </motion.div>

      <motion.div
        className="mt-8 origin-top-left rotate-[4.53deg] lg:mt-0 lg:w-1/2"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <Image
          src="/snow-man.png"
          alt="Snow Man illustration"
          width={500}
          height={500}
          className="w-[200px] sm:w-[280px] md:w-[400px] lg:w-[500px]"
          priority
        />
      </motion.div>
    </motion.section>
  )
}
