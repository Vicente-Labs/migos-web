'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { useLanguage } from '@/context/language'

export function FeaturesSection() {
  const { dictionary, language } = useLanguage()
  const router = useRouter()

  return (
    <section className="relative overflow-hidden py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col items-center gap-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl text-center">
            <motion.h2
              className="mb-6 font-bold md:text-6xl text-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {dictionary.whyChooseMigos}
            </motion.h2>

            <motion.p
              className="font-poppins text-xl font-medium text-[#848780]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {dictionary.effortlesslyOrganizeYourSecretSanta}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="group relative overflow-hidden rounded-2xl bg-card p-6 shadow-lg transition-all hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
              <Image
                src="/features/groups.png"
                alt="Group Management"
                width={500}
                height={500}
                className="mb-6 rounded-xl shadow-md transition-transform group-hover:scale-105"
                priority
                quality={100}
              />
              <h3 className="text-2xl">{dictionary.groupManagement}</h3>
              <p className="font-poppins font-medium text-[#848780]">
                {dictionary.groupManagementBenefits}
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-card p-6 shadow-lg transition-all hover:shadow-xl">
              <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
              <Image
                src="/features/groups.png"
                alt="Invitation Management"
                width={500}
                height={500}
                className="mb-6 rounded-xl shadow-md transition-transform group-hover:scale-105"
                priority
                quality={100}
              />
              <h3 className="text-2xl">{dictionary.effortlessInvitations}</h3>
              <p className="font-poppins font-medium text-[#848780]">
                {dictionary.effortlessInvitationsBenefits}
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-card p-6 shadow-lg transition-all hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
              <Image
                src="/features/groups.png"
                alt="Gift Matching"
                width={500}
                height={500}
                className="mb-6 rounded-xl shadow-md transition-transform group-hover:scale-105"
                priority
                quality={100}
              />
              <h3 className="text-2xl">{dictionary.smartGiftMatching}</h3>
              <p className="font-poppins font-medium text-[#848780]">
                {dictionary.smartGiftMatchingBenefits}
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-card p-6 shadow-lg transition-all hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
              <Image
                src="/features/groups.png"
                alt="Gift Tip"
                width={500}
                height={500}
                className="mb-6 rounded-xl shadow-md transition-transform group-hover:scale-105"
                priority
                quality={100}
              />
              <h3 className="text-2xl">{dictionary.personalizedGiftTips}</h3>
              <p className="font-poppins font-medium text-[#848780]">
                {dictionary.personalizedGiftTipsBenefits}
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              className="w-full max-w-md bg-gradient-to-r from-primary to-primary/90 px-6 py-4 text-lg font-bold transition-all hover:opacity-90 sm:py-5 sm:text-xl"
              onClick={() => {
                router.push(`/${language}/sign-up`)
              }}
            >
              {dictionary.startMyAdventure}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
