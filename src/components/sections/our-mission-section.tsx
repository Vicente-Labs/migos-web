'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { toast } from 'sonner'

import { useLanguage } from '@/context/language'

import { Button } from '../ui/button'

export function OurMissionSection() {
  const { dictionary } = useLanguage()

  return (
    <motion.section
      id="about-us"
      className="flex flex-col items-center justify-center gap-8 px-4 py-12 md:gap-16 lg:flex-row lg:gap-[420px] lg:px-20 lg:py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="flex w-full flex-col items-center gap-6 text-center md:gap-10 lg:w-auto lg:items-start lg:text-left"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col items-center gap-2 sm:gap-3 lg:items-start">
          <h1 className="text-4xl md:text-5xl">{dictionary.ourMission}</h1>
          <span className="max-w-md text-lg text-[#848780] sm:text-xl md:text-2xl">
            {dictionary.weWereCreatedToAddPracticalityToYourXmasWith}
          </span>

          <ul className="flex flex-col items-center gap-2 sm:gap-3 lg:items-start">
            <li className="flex flex-row items-center gap-2 text-[#848780]">
              <span className="text-4xl">•</span>
              <span className="text-lg sm:text-xl">
                {dictionary.effortlessGiftMatching}
              </span>
            </li>
            <li className="flex flex-row items-center gap-2 text-[#848780]">
              <span className="text-4xl">•</span>
              <span className="text-lg sm:text-xl">
                {dictionary.organizedGroupManagement}
              </span>
            </li>
            <li className="flex flex-row items-center gap-2 text-[#848780]">
              <span className="text-4xl">•</span>
              <span className="text-lg sm:text-xl">
                {dictionary.funAndEngagingFeatures}
              </span>
            </li>
          </ul>
        </div>

        <Button
          onClick={() => {
            toast.error(`We're not launched yet.`)
          }}
          className="flex w-full flex-row items-center justify-center px-4 py-4 text-sm sm:px-6 sm:py-6 sm:text-xl"
        >
          {dictionary.simplifyMyXmas}
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <Image
          src="/bell.png"
          alt="Bell"
          width={500}
          height={500}
          className="w-[280px] sm:w-[400px] lg:w-[500px]"
        />
      </motion.div>
    </motion.section>
  )
}
