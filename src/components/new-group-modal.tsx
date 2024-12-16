'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { CheckCircle, ChevronRight, Loader2, PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { createGroupAction } from '@/actions/groups/create-group'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useGroupModalState } from '@/context/group-modal'
import { useLanguage } from '@/context/language'
import { useSession } from '@/context/session'
import { animations } from '@/utils/animations'
import type { Dictionary } from '@/utils/dictionaries'

import { NewGroupFormFields } from './new-group-form-fields'
import { Button } from './ui/button'
import { Form } from './ui/form'

const formSchema = (dictionary: Dictionary) =>
  z
    .object({
      avatarUrl: z.string().optional(),
      currency: z.enum(['USD', 'EUR', 'BRL']),
      budget: z.coerce
        .number()
        .min(1, { message: dictionary.budgetMustBeGreaterThanZero })
        .multipleOf(0.01, {
          message: dictionary.budgetMustHaveAtMost2Decimals,
        }),
      name: z.string().min(3, {
        message: dictionary.groupNameMin,
      }),
      description: z.string().optional(),
      drawDate: z
        .date()
        .min(new Date(), { message: dictionary.drawDateMustBeInFuture }),
      endDate: z
        .date()
        .min(new Date(), { message: dictionary.endDateMustBeInFuture }),
    })
    .refine((data) => data.endDate > data.drawDate, {
      message: dictionary.endDateMustBeAfterDrawDate,
      path: ['endDate'],
    })

export type FormValues = z.infer<ReturnType<typeof formSchema>>

export function NewGroupModal() {
  const { isNewGroupModalOpen, setIsNewGroupModalOpen } = useGroupModalState()
  const [step, setStep] = useState<1 | 2>(1)
  const { dictionary, language } = useLanguage()

  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema(dictionary)),
    defaultValues: {
      avatarUrl: '',
      currency: 'USD',
      budget: 0.0,
      description: '',
      drawDate: new Date(new Date().setDate(new Date().getDate() + 2)),
      endDate: new Date(new Date().setDate(new Date().getDate() + 6)),
      name: '',
    },
  })

  const queryClient = useQueryClient()

  const { token } = useSession()

  async function onSubmit(values: FormValues) {
    try {
      const result = await createGroupAction({
        data: {
          name: values.name.trim(),
          budget: values.budget,
          currency: values.currency,
          description: values.description?.trim(),
          drawDate: values.drawDate.toISOString(),
          endDate: values.endDate.toISOString(),
          avatarUrl: values.avatarUrl?.trim(),
        },
        token,
      })

      if (!('id' in result)) {
        switch (result.message) {
          case 'Validation error': {
            if (result.errors) {
              Object.entries(result.errors).forEach(([field, messages]) => {
                if (!field.includes('root')) {
                  return form.setError(field as keyof FormValues, {
                    message: messages?.[0] || '',
                  })
                }
              })
            }
            return
          }
          default:
            return toast.error(dictionary.unexpectedError)
        }
      }

      queryClient.invalidateQueries({ queryKey: ['groups'] })

      toast.success(`${values.name} group created successfully!`, {
        action: {
          label: 'Go to group',
          onClick: () => {
            router.push(`/${language}/groups/${result.id}`)
          },
        },
      })

      form.reset()
      setIsNewGroupModalOpen(false)
      return setStep(1)
    } catch (error) {
      if (error instanceof Error) {
        form.setError('root', {
          type: 'submit',
          message: 'Failed to create group. Please try again.',
        })
      }
      console.error('Failed to create group:', error)
    }
  }

  const handleNextStep = async () => {
    const isValid = await form.trigger()
    if (!isValid) return

    if (step === 1) {
      setStep(2)
      return
    }
    form.handleSubmit(onSubmit)()
  }

  const handleBackStep = () => {
    if (step === 1) {
      setIsNewGroupModalOpen(false)
      form.reset()
      return
    }
    setStep(1)
  }

  return (
    <Dialog open={isNewGroupModalOpen} onOpenChange={setIsNewGroupModalOpen}>
      <DialogContent className="sm:max-w-md">
        <motion.div
          variants={animations.container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-4"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <PlusCircle className="h-5 w-5 text-primary" />
              Create a new group
            </DialogTitle>
            <DialogDescription>
              To start your Secret Santa, you just need to add a name, budget
              and when it will occur.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: step === 1 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: step === 1 ? 20 : -20 }}
                transition={{ duration: 0.2 }}
              >
                <NewGroupFormFields form={form} step={step} />
              </motion.div>

              <div className="flex flex-col gap-2 sm:gap-4 w-full pt-2">
                <div className="flex gap-2 sm:gap-0 w-full">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBackStep}
                    disabled={form.formState.isSubmitting}
                  >
                    {step === 1 ? 'Cancel' : 'Back'}
                  </Button>

                  <Button
                    type="button"
                    onClick={handleNextStep}
                    disabled={form.formState.isSubmitting}
                    className="gap-2 w-full"
                  >
                    {form.formState.isSubmitting && (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                    {step === 1 ? (
                      <>
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Create Group
                        <CheckCircle className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
