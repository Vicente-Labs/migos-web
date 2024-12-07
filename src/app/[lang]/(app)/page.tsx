'use client'

import { useRouter } from 'next/navigation'

import { CTASection } from '@/components/sections/cta-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { OurMissionSection } from '@/components/sections/our-mission-section'
import { PaperworkSection } from '@/components/sections/paperwork-section'
import { useLanguage } from '@/context/language'
import { useSession } from '@/context/session'

export default function Home() {
  const router = useRouter()
  const { user } = useSession()

  const { language } = useLanguage()

  if (user) return router.push(`/${language}/dashboard`)

  return (
    <main className="font-cooperBlack">
      <CTASection />

      <PaperworkSection />

      <OurMissionSection />

      <FeaturesSection />
    </main>
  )
}
