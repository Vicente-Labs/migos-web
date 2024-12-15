'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { signUp } from '@/actions/auth/sign-up'
import { AnimatedLink } from '@/components/animated-link'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useLanguage } from '@/context/language'

import { signUpFormSchema, type SignUpFormValues } from './sign-up-schema'

export function SignUpForm() {
  const { dictionary, language } = useLanguage()
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema(dictionary)),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  })

  const {
    handleSubmit,
    formState: { errors, isValid },
  } = form

  async function handleSignUp(data: SignUpFormValues) {
    try {
      const result = await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
      })

      if ('message' in result) {
        switch (result.message) {
          case 'Validation error': {
            if (result.errors) {
              Object.entries(result.errors).forEach(([field, messages]) => {
                if (field === 'email' || field === 'password') {
                  form.setError(field, {
                    message: messages?.[0] || '',
                  })
                }
              })
            }
            return
          }
          case 'User with same email already exists': {
            return toast.error(dictionary.emailAlreadyInUse)
          }
          default: {
            router.push(`/${language}/sign-in`)
            return toast.success(dictionary.accountCreatedSuccessfully)
          }
        }
      }
    } catch {
      return toast.error(dictionary.unexpectedError)
    }
  }

  return (
    <Form {...form}>
      <motion.form
        onSubmit={handleSubmit(handleSignUp)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-2"
          >
            <FormItem>
              <Label htmlFor="name" className="font-poppins font-semibold">
                {dictionary.name}
              </Label>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    id="name"
                    placeholder={dictionary.namePlaceholder}
                    aria-invalid={!!errors.name}
                    className="focus-visible:ring-primary"
                  />
                )}
              />
              <FormMessage>{errors.name?.message}</FormMessage>
            </FormItem>
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col gap-2"
          >
            <FormItem>
              <Label htmlFor="email" className="font-poppins font-semibold">
                {dictionary.email}
              </Label>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    id="email"
                    placeholder={dictionary.emailPlaceholder}
                    aria-invalid={!!errors.email}
                    className="focus-visible:ring-primary"
                  />
                )}
              />
              <FormMessage>{errors.email?.message}</FormMessage>
            </FormItem>

            <FormItem>
              <Label htmlFor="password" className="font-poppins font-semibold">
                {dictionary.password}
              </Label>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <>
                    <div className="flex space-x-2">
                      <Input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        placeholder="••••••••"
                        aria-invalid={!!errors.password}
                        className="focus-visible:ring-primary"
                      />

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => setShowPassword((prev) => !prev)}
                              type="button"
                              data-testid="toggle-password"
                            >
                              {showPassword ? (
                                <Eye size={16} />
                              ) : (
                                <EyeOff size={16} />
                              )}
                            </Button>
                          </TooltipTrigger>

                          <TooltipContent>
                            <p>
                              {showPassword
                                ? dictionary.hidePassword
                                : dictionary.showPassword}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </>
                )}
              />
              <FormMessage>{errors.password?.message}</FormMessage>
            </FormItem>
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
              {dictionary.signUp}
            </Button>

            <AnimatedLink href="/sign-in" className="font-medium self-center">
              {dictionary.signIn}
            </AnimatedLink>
          </div>
        </motion.div>
      </motion.form>
    </Form>
  )
}
