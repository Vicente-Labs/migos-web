'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useLanguage } from '@/context/language'

import { Button } from '../ui/button'

export function OurMissionSection() {
  const { dictionary, language } = useLanguage()
  const router = useRouter()

  return (
    <motion.section
      id="about-us"
      className="mx-auto flex max-w-[1400px] flex-col items-center justify-center gap-12 py-12 lg:flex-row lg:gap-20 mb-40 md:my-0"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="flex w-full flex-col items-center gap-8 text-center lg:w-1/2 lg:items-start lg:text-left"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col items-center gap-4 lg:items-start">
          <h1 className="text-4xl font-bold md:text-5xl">
            {dictionary.ourMission}
          </h1>
          <p className="max-w-md text-lg text-[#848780] sm:text-xl md:text-2xl">
            {dictionary.weWereCreatedToAddPracticalityToYourXmasWith}
          </p>

          <ul className="mt-4 flex flex-col gap-4">
            {[
              dictionary.effortlessGiftMatching,
              dictionary.organizedGroupManagement,
              dictionary.funAndEngagingFeatures,
            ].map((feature, index) => (
              <li
                key={index}
                className="flex items-center gap-3 text-[#848780]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  •
                </span>
                <span className="text-lg sm:text-xl">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <Button
          onClick={() => {
            router.push(`/${language}/sign-up`)
          }}
          className="w-full max-w-md bg-gradient-to-r from-primary to-primary/90 px-6 py-4 text-lg font-bold transition-all hover:opacity-90 sm:py-5 sm:text-xl"
        >
          {dictionary.simplifyMyXmas}
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
        className="lg:w-1/2"
      >
        <Image
          src="/bell.png"
          alt="Bell illustration representing Christmas and notifications"
          width={500}
          height={500}
          priority
          className="w-[280px] sm:w-[400px] lg:w-[500px]"
        />
      </motion.div>
    </motion.section>
  )
}
