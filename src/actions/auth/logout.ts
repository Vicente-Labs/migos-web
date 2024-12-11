'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import type { Language } from '@/types/languages'

export async function logout(language: Language) {
  ;(await cookies()).delete('session')
  redirect(`/${language}/sign-in`)
}
