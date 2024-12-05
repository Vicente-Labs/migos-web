'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { AnimatedLink } from '@/components/animated-link'
import { GoogleIcon } from '@/components/icons/google-icon'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SelectSeparator } from '@/components/ui/select'
import { useLanguage } from '@/context/language'
import { usePostAuthenticatePassword } from '@/http/auth'

import { signInFormSchema, type SignInFormValues } from './sign-in-schema'

export function SignInForm() {
  const router = useRouter()
  const { dictionary } = useLanguage()

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

  const { mutate: signIn, isPending } = usePostAuthenticatePassword({
    mutation: {
      onSuccess: () => {
        toast.success('Successfully signed in')
        router.push('/dashboard')
      },
      onError: (error) => {
        if (error instanceof AxiosError && error.response?.data.message)
          return toast.error(error.response.data.message)

        return toast.error('An error occurred')
      },
    },
  })

  function handleGoogleSignIn() {
    toast.info('Google sign in coming soon!')
  }

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      onSubmit={handleSubmit((data) => signIn({ data }))}
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
            placeholder="you@example.com"
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
        <Button
          type="submit"
          disabled={isPending || !isValid}
          className="bg-primary font-semibold transition-all duration-300 hover:bg-primary/90 disabled:opacity-50"
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {dictionary.signIn}
        </Button>

        <div className="flex items-center gap-2">
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
        </Button>
      </motion.div>
    </motion.form>
  )
}
