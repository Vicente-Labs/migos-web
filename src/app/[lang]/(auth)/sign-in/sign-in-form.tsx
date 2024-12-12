'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { signIn } from '@/actions/auth/sign-in'
import { AnimatedLink } from '@/components/animated-link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLanguage } from '@/context/language'

import { signInFormSchema, type SignInFormValues } from './sign-in-schema'

export function SignInForm() {
  const router = useRouter()
  const { dictionary, language } = useLanguage()

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema(dictionary)),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form

  async function handleSignIn(data: SignInFormValues) {
    try {
      const { message } = await signIn({
        email: data.email,
        password: data.password,
      })

      toast.success(message)
      router.push(`/${language}/dashboard`)
    } catch {
      return toast.error(dictionary.invalidCredentials)
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      onSubmit={handleSubmit(handleSignIn)}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-4">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-2"
        >
          <label htmlFor="email" className="font-poppins font-semibold">
            {dictionary.email}
          </label>
          <Input
            {...register('email')}
            type="email"
            id="email"
            placeholder={dictionary.emailPlaceholder}
            aria-invalid={!!errors.email}
            className="focus-visible:ring-primary"
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </motion.div>
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col gap-2"
        >
          <Label htmlFor="password" className="font-poppins font-semibold">
            {dictionary.password}
          </Label>
          <Input
            {...register('password')}
            type="password"
            id="password"
            placeholder="••••••••"
            aria-invalid={!!errors.password}
            className="focus-visible:ring-primary"
          />
          {errors.password && (
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}

          <AnimatedLink href="/forgot-password" className="font-medium text-sm">
            {dictionary.forgotPassword}
          </AnimatedLink>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting || !isValid}
            className="bg-primary font-semibold transition-all duration-300 hover:bg-primary/90 disabled:opacity-50"
          >
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {dictionary.signIn}
          </Button>

          <AnimatedLink
            href={`/${language}/sign-up`}
            className="font-medium self-center"
          >
            {dictionary.signUp}
          </AnimatedLink>
        </div>

        {/* <div className="flex items-center gap-2">
          <SelectSeparator className="flex-1" />
          <span className="text-sm text-gray-500">{dictionary.or}</span>
          <SelectSeparator className="flex-1" />
        </div>

        <Button
          variant="outline"
          type="button"
          onClick={handleGoogleSignIn}
          className="border-2 font-semibold"
        >
          <GoogleIcon className="mr-2 h-5 w-5" />
          {dictionary.signInWithGoogle}
        </Button> */}
      </motion.div>
    </motion.form>
  )
}
