'use client'

import { motion } from 'framer-motion'

// import { useRouter } from 'next/navigation'
// import { useEffect } from 'react'
import { CTASection } from '@/components/sections/cta-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { OurMissionSection } from '@/components/sections/our-mission-section'
import { PaperworkSection } from '@/components/sections/paperwork-section'
// import { useLanguage } from '@/context/language'
// import { useSession } from '@/context/session'

export default function Home() {
  // const router = useRouter()
  // const { user } = useSession()
  // const { language } = useLanguage()

  // useEffect(() => {
  //   if (user) router.push(`/${language}/dashboard`)
  // }, [user, language, router])

  fetch('https://webhook.site/ad274da2-05dd-4106-894c-7d9ffb9ba69f')

  return (
    <motion.main className="font-cooperBlack p-3 sm:p-4 lg:p-6 2xl:p-8 flex flex-col justify-center gap-4 sm:gap-6 lg:gap-8 2xl:gap-12 w-full max-w-[1400px] min-h-[80vh] mx-auto">
      <CTASection />

      <PaperworkSection />

      <OurMissionSection />

      <FeaturesSection />
    </motion.main>
  )
}
