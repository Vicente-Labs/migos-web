'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { useLanguage } from '@/context/language'

export function PricingSection() {
  const { dictionary } = useLanguage()

  return (
    <motion.section
      id="plans"
      className="flex flex-col items-center gap-8 px-4 py-12 md:flex-row md:px-8 lg:flex-row lg:items-center lg:justify-center lg:px-20 lg:py-24"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex w-full flex-col gap-12 rounded-lg bg-primary p-8 md:h-[520px] md:w-[476px] md:gap-20 md:p-14">
        <div>
          <div>
            <h1 className="text-4xl text-background md:text-5xl">
              {dictionary.basic}
            </h1>

            <span className="text-6xl text-background md:text-8xl">
              $0{' '}
              <span className="-ml-4 text-base md:-ml-6 md:text-lg">
                / forever
              </span>
            </span>
          </div>

          <div className="flex flex-col text-background">
            <ul className="space-y-2">
              <li className="flex flex-row items-center gap-2">
                <CheckCircle2 className="size-4" />
                {dictionary.upTo7Groups}
              </li>

              <li className="flex flex-row items-center gap-2">
                <CheckCircle2 className="size-4" />
                {dictionary.unlimitedMembersPerGroup}
              </li>

              <li className="flex flex-row items-center gap-2">
                <CheckCircle2 className="size-4" />
                {dictionary.personalizedAnnouncements}
              </li>

              <li className="flex flex-row items-center gap-2">
                <CheckCircle2 className="size-4" />
                {dictionary.calendarSync}
              </li>

              <li className="flex flex-row items-center gap-2">
                <CheckCircle2 className="size-4" />
                {dictionary.giftSuggestions}
              </li>

              <li className="flex flex-row items-center gap-2">
                <CheckCircle2 className="size-4" />
                {dictionary.reroll}
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full">
          <Button
            onClick={() => {
              toast.error(`We're not launched yet.`)
            }}
            className="w-full border border-primary bg-background text-lg font-bold text-primary hover:bg-background/90 md:text-xl"
          >
            {dictionary.getStarted}
          </Button>
        </div>
      </div>
    </motion.section>
  )
}
