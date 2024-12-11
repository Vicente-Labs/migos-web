'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

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

  useEffect(() => {
    if (user) {
      router.push(`/${language}/dashboard`)
    }
  }, [user, language, router])

  return (
    <main className="font-cooperBlack">
      <CTASection />

      <PaperworkSection />

      <OurMissionSection />

      <FeaturesSection />
    </main>
  )
}
