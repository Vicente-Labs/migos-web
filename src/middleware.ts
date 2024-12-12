import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextRequest, NextResponse } from 'next/server'

import { languages as appLanguages } from '../languages'

const headers = { 'accept-language': 'en-US' }
const languages = new Negotiator({ headers }).languages()

const DEFAULT_LOCALE = 'en-US'

match(languages, appLanguages, DEFAULT_LOCALE)

export async function middleware(req: NextRequest) {
  const browserLanguage =
    req.headers.get('accept-language')?.split(',')[0] ?? 'en'

  const language =
    appLanguages.find((language) => language.startsWith(browserLanguage)) ??
    DEFAULT_LOCALE

  const { pathname } = req.nextUrl

  if (!pathname.includes('maintenance')) {
    return NextResponse.redirect(new URL(`/${language}/maintenance`, req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
}
