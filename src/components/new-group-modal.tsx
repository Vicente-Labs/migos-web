'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle, ChevronRight, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { createGroup } from '@/actions/groups/create-group'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useGroupModalState } from '@/context/group-modal'
import { useLanguage } from '@/context/language'

import { NewGroupFormFields } from './new-group-form-fields'
import { Button } from './ui/button'
import { Form } from './ui/form'

const formSchema = z
  .object({
    avatarUrl: z.string().optional(),
    currency: z.enum(['USD', 'EUR', 'BRL']),
    budget: z.coerce
      .number()
      .min(0, { message: 'Budget must be greater than 0' })
      .multipleOf(0.01, {
        message: 'Budget must have at most 2 decimal places',
      }),
    name: z.string().min(3, {
      message: 'Group name must be at least 3 characters',
    }),
    description: z.string().optional(),
    drawDate: z
      .date()
      .min(new Date(), { message: 'Draw date must be in the future' }),
    endDate: z
      .date()
      .min(new Date(), { message: 'End date must be in the future' }),
  })
  .refine((data) => data.endDate > data.drawDate, {
    message: 'End date must be after draw date',
    path: ['endDate'],
  })

export type FormValues = z.infer<typeof formSchema>

export function NewGroupModal() {
  const { isNewGroupModalOpen, setIsNewGroupModalOpen } = useGroupModalState()
  const [step, setStep] = useState<1 | 2>(1)
  const { language } = useLanguage()

  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
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

  async function onSubmit(values: FormValues) {
    try {
      const { id } = await createGroup({
        data: {
          name: values.name.trim(),
          budget: values.budget,
          currency: values.currency,
          description: values.description?.trim(),
          drawDate: values.drawDate.toISOString(),
          endDate: values.endDate.toISOString(),
          avatarUrl: values.avatarUrl?.trim(),
        },
      })

      toast.success(`${values.name} group created successfully!`, {
        action: {
          label: 'Go to group',
          onClick: () => {
            router.push(`/${language}/groups/${id}`)
          },
        },
      })

      form.reset()
      setIsNewGroupModalOpen(false)
      setStep(1)
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
      <DialogContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
        autoFocus={false}
        className="w-[90vw] max-w-[500px] sm:w-full"
      >
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl md:text-2xl font-cooperBlack">
            Create a new group
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm md:text-base flex flex-row gap-1">
            To start your Secret Santa, you just need to add a name, budget and
            when it will occur.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: step === 1 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: step === 1 ? 20 : -20 }}
                transition={{ duration: 0.2 }}
              >
                <NewGroupFormFields form={form} step={step} />
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col gap-2 sm:gap-4 w-full pt-2">
              <motion.div
                className="flex flex-col sm:flex-row gap-2 sm:gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBackStep}
                  className="w-full text-xs sm:text-sm"
                  disabled={form.formState.isSubmitting}
                >
                  {step === 1 ? 'Cancel' : 'Back'}
                </Button>

                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full text-xs sm:text-sm"
                  disabled={form.formState.isSubmitting}
                >
                  {step === 1 ? (
                    <>
                      Next
                      <ChevronRight className="size-3 sm:size-4" />
                    </>
                  ) : form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="size-3 sm:size-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Create Group
                      <CheckCircle className="size-3 sm:size-4" />
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
