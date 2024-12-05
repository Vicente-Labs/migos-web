import { z } from 'zod'

import type { Dictionary } from '@/utils/dictionaries'

export const firstStepFormSchema = (dictionary: Dictionary) =>
  z.object({
    name: z.string().min(2, dictionary.nameRequired),
    email: z.string().email(dictionary.emailInvalid),
    password: z.string().min(8, dictionary.passwordLength),
  })

// export const secondStepFormSchema = z.object({
//   picture: z.instanceof(File),
// })

export const signUpFormSchema = (dictionary: Dictionary) =>
  z.object({
    ...firstStepFormSchema(dictionary).shape,
    // ...secondStepFormSchema.shape,
  })

export type SignUpFormValues = z.infer<ReturnType<typeof signUpFormSchema>>
