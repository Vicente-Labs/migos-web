import type { Locale } from 'date-fns'
import { enUS, es, ptBR } from 'date-fns/locale'

import type { Language } from '@/types/languages'

export const locale: Record<Language, Locale> = {
  'es-ES': es,
  'en-US': enUS,
  'pt-BR': ptBR,
}
