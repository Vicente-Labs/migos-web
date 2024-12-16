import { Footer } from '@/components/footer'
// import Header from '@/components/header'
import { NewGroupModal } from '@/components/new-group-modal'
import { AppWrapper } from '@/context/app'
import { GroupModalContextProvider } from '@/context/group-modal'
import { LanguageContextProvider } from '@/context/language'
import type { Language } from '@/types/languages'
import { getDictionary } from '@/utils/dictionaries'

import { SUPPORTED_LANGUAGES } from '../../../../languages'

export async function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang: lang.value }))
}

export const dynamic = 'force-dynamic'

type RootLayoutProps = {
  children: React.ReactNode
  params: Promise<{ lang: Language }>
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { lang } = await params

  const dictionary = await getDictionary(lang)

  return (
    <AppWrapper>
      <LanguageContextProvider language={lang} dictionary={dictionary}>
        <GroupModalContextProvider>
          {/* <Header /> */}

          {children}

          <NewGroupModal />

          <Footer />
        </GroupModalContextProvider>
      </LanguageContextProvider>
    </AppWrapper>
  )
}
