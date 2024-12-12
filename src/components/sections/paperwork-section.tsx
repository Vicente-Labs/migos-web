'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useLanguage } from '@/context/language'

import { Button } from '../ui/button'

export function PaperworkSection() {
  const { dictionary, language } = useLanguage()
  const router = useRouter()

  return (
    <motion.section
      id="paperwork"
      className="mx-auto flex max-w-[1400px] flex-col items-center justify-center lg:flex-row mb-40 md:my-0"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      viewport={{ once: true }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
        className="order-2 lg:order-1"
      >
        <Image
          src="/gifts.png"
          alt="Gifts illustration showing wrapped presents"
          width={500}
          height={500}
          priority
          className="w-[280px] mr-32 sm:w-[400px] md:mr-12 lg:mr-40 lg:w-[500px]"
        />
      </motion.div>

      <motion.div
        className="order-1 flex w-full flex-col items-center gap-6 text-center sm:gap-8 md:gap-10 lg:order-2 lg:w-auto lg:items-start lg:text-left"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col items-center gap-2 sm:gap-3 lg:items-start">
          <h1 className="max-w-sm break-words text-4xl font-bold md:text-5xl">
            {dictionary.putThePaperworkAside}
          </h1>
          <span className="max-w-md break-words text-lg text-[#848780] sm:text-xl md:text-2xl">
            {dictionary.letUsWithTheBoringPart}
          </span>
        </div>

        <div className="w-full max-w-md sm:w-3/4 md:w-2/3 lg:w-full">
          <Button
            onClick={() => {
              router.push(`/${language}/sign-up`)
            }}
            className="flex w-full flex-row items-center justify-center bg-gradient-to-r from-primary to-primary/90 px-4 py-4 text-sm font-bold transition-all hover:opacity-90 sm:px-6 sm:py-6 sm:text-xl"
          >
            {dictionary.letsDoIt}
          </Button>
        </div>
      </motion.div>
    </motion.section>
  )
}
