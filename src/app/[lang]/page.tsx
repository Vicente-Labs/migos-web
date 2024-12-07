'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import NumberFlow from '@number-flow/react'
import { useMutation } from '@tanstack/react-query'
import Autoplay from 'embla-carousel-autoplay'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useLanguage } from '@/context/language'
import { preRegister } from '@/http/auth/pre-register'
import type { Dictionary } from '@/utils/dictionaries'

const preRegisterFormSchema = (dictionary: Dictionary) =>
  z.object({
    email: z
      .string()
      .min(1, dictionary.emailRequired)
      .email(dictionary.emailInvalid),
  })

type PreRegisterFormValues = z.infer<ReturnType<typeof preRegisterFormSchema>>

export default function Home() {
  const [days, setDays] = useState<number>(0)
  const [hours, setHours] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(0)
  const [seconds, setSeconds] = useState<number>(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showDialog, setShowDialog] = useState(false)

  useEffect(() => {
    const targetDate = new Date('2024-12-10T12:00:00-03:00') // 12h Brasília time

    const timer = setInterval(() => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference <= 0) {
        clearInterval(timer)
        setDays(0)
        setHours(0)
        setMinutes(0)
        setSeconds(0)
        return
      }

      const newDays = Math.floor(difference / (1000 * 60 * 60 * 24))
      const newHours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      )
      const newMinutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60),
      )
      const newSeconds = Math.floor((difference % (1000 * 60)) / 1000)

      if (newDays !== days) setDays(newDays)
      if (newHours !== hours) setHours(newHours)
      if (newMinutes !== minutes) setMinutes(newMinutes)
      if (newSeconds !== seconds) setSeconds(newSeconds)
    }, 1000)

    return () => clearInterval(timer)
  }, [days, hours, minutes, seconds])

  const { dictionary, language } = useLanguage()

  const form = useForm<PreRegisterFormValues>({
    resolver: zodResolver(preRegisterFormSchema(dictionary)),
    defaultValues: {
      email: '',
    },
  })

  const { mutate: preRegisterMutation, isPending } = useMutation({
    mutationFn: async (data: PreRegisterFormValues) => {
      return await preRegister({ dictionary, language, ...data })
    },
    onSuccess: () => {
      form.reset()
      setShowConfetti(true)
      setShowDialog(true)
      toast.success(dictionary.preRegisterSuccess)
      setTimeout(() => {
        setShowConfetti(false)
      }, 5000)
    },
    onError: () => toast.error(dictionary.preRegisterError),
  })

  function handleSubmit(data: PreRegisterFormValues) {
    preRegisterMutation(data)
  }

  return (
    <motion.main
      className="mt-8 flex min-h-[calc(100vh-15rem)] flex-col items-center justify-center gap-8 font-cooperBlack"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Thank for Pre-registering!</DialogTitle>
            <DialogDescription className="pt-4">
              We appreciate your interest! You will be the first to know when
              Migos is ready to launch. Prepare yourself for an unforgettable
              Secret Santa experience!
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="w-full">
            <Button className="w-full" onClick={() => setShowDialog(false)}>
              Dismiss
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex w-full max-w-7xl flex-col gap-8 px-4 lg:flex-row">
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="flex flex-wrap justify-center gap-8 sm:gap-8">
            <motion.div
              className="text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <NumberFlow
                value={days}
                className="text-4xl sm:text-6xl"
                continuous
              />
              <div className="text-base sm:text-xl">{dictionary.days}</div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <NumberFlow
                value={hours}
                className="text-4xl sm:text-6xl"
                continuous
                digits={{ 1: { max: 9 }, 0: { max: 9 } }}
              />
              <div className="text-base sm:text-xl">{dictionary.hours}</div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <NumberFlow
                value={minutes}
                className="text-4xl sm:text-6xl"
                continuous
                digits={{ 1: { max: 10 }, 0: { max: 10 } }}
              />
              <div className="text-base sm:text-xl">{dictionary.minutes}</div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <NumberFlow
                value={seconds}
                className="text-4xl sm:text-6xl"
                continuous
                digits={{ 1: { max: 10 }, 0: { max: 10 } }}
              />
              <div className="text-base sm:text-xl">{dictionary.seconds}</div>
            </motion.div>
          </div>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="mt-8 flex w-full max-w-md flex-col gap-4 px-4 sm:px-0"
          >
            <Input
              type="email"
              {...form.register('email')}
              placeholder={dictionary.email}
            />
            {form.formState.errors.email && (
              <span className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </span>
            )}
            <TooltipProvider>
              <Tooltip delayDuration={30}>
                <TooltipTrigger asChild>
                  <Button className="w-full" type="submit" disabled={isPending}>
                    {isPending ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      dictionary.preRegister
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  align="center"
                  className="hidden max-w-md text-center font-poppins text-sm sm:text-base md:block"
                >
                  {dictionary.preRegisterCTA}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <span className="block max-w-md text-center font-poppins text-sm sm:text-base md:hidden">
              {dictionary.mobilePreRegisterCTA}
            </span>
          </form>
        </div>

        <div className="hidden lg:block lg:flex-1">
          <Carousel
            className="w-full"
            opts={{ loop: true, dragFree: false }}
            plugins={[
              Autoplay({
                delay: 3400,
                stopOnFocusIn: true,
                stopOnInteraction: false,
              }),
            ]}
          >
            <CarouselContent>
              <CarouselItem className="flex aspect-square items-center justify-center rounded-lg bg-primary/5 p-4 sm:p-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold sm:text-2xl">
                    {dictionary.betaAccessAndProgressUpdates}
                  </h3>
                  <p className="mt-2 font-poppins text-sm sm:text-base">
                    {dictionary.earlyAccessToNewFeatures}
                  </p>
                </div>
              </CarouselItem>
              <CarouselItem className="flex aspect-square items-center justify-center rounded-lg bg-primary/5 p-4 sm:p-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold sm:text-2xl">
                    {dictionary.featureRequest}
                  </h3>
                  <p className="mt-2 font-poppins text-sm sm:text-base">
                    {dictionary.shapeTheFutureOfMigos}
                  </p>
                </div>
              </CarouselItem>
              <CarouselItem className="flex aspect-square items-center justify-center rounded-lg bg-primary/5 p-4 sm:p-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold sm:text-2xl">
                    {dictionary.pioneerBenefits}
                  </h3>
                  <p className="mt-2 font-poppins text-sm sm:text-base">
                    {dictionary.receivePioneerBenefits}
                  </p>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="hidden xl:flex" />
            <CarouselNext className="hidden xl:flex" />
          </Carousel>
        </div>
      </div>
    </motion.main>
  )
}
