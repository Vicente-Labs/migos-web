'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { GoogleIcon } from '@/components/icons/google-icon'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SelectSeparator } from '@/components/ui/select'
import { usePostAuthenticatePassword } from '@/http/auth'

const signInFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

type SignInFormData = z.infer<typeof signInFormSchema>

export default function SignInPage() {
  const router = useRouter()

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
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
        if ('errors' in error) {
          return toast.error('Invalid email or password')
        }
        return toast.error(
          'An error occurred while signing in. Please try again.',
        )
      },
    },
  })

  function handleGoogleSignIn() {
    toast.info('Google sign in coming soon!')
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-row items-center justify-center gap-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-40 hidden lg:flex lg:flex-col lg:items-center lg:justify-center"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-cooperBlack text-5xl lg:text-7xl"
        >
          migos
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="relative size-[300px] lg:size-[500px]"
        >
          <Image
            src="/gifts.png"
            alt="Gifts"
            fill
            priority
            className="object-contain"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex w-full max-w-sm flex-col gap-6 rounded-lg p-6"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-cooperBlack text-3xl"
        >
          Welcome Back
        </motion.h2>

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
                Email Address
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
                <span className="text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}
            </motion.div>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-2"
            >
              <label htmlFor="password" className="font-poppins font-semibold">
                Password
              </label>
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
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>

            <div className="flex items-center gap-2">
              <SelectSeparator className="flex-1" />
              <span className="text-sm text-gray-500">or</span>
              <SelectSeparator className="flex-1" />
            </div>

            <Button
              variant="outline"
              type="button"
              onClick={handleGoogleSignIn}
              className="border-2 font-semibold"
            >
              <GoogleIcon className="mr-2 h-5 w-5" />
              Sign in with Google
            </Button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  )
}
