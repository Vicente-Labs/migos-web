import { z } from 'zod'

import type { Dictionary } from '@/utils/dictionaries'

export const signInFormSchema = (dictionary: Dictionary) =>
  z.object({
    email: z
      .string()
      .min(1, dictionary.emailRequired)
      .email(dictionary.emailInvalid),

    password: z
      .string()
      .min(1, dictionary.passwordRequired)
      .min(8, dictionary.passwordLength),
  })

export type SignInFormValues = z.infer<ReturnType<typeof signInFormSchema>>
