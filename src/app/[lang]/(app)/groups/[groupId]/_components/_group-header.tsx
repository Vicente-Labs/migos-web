'use client'

import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { CloverIcon, CogIcon, Loader2, TrashIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useLanguage } from '@/context/language'
import { generateMatches } from '@/http/groups/generate-matches'
import type { GetGroup200 } from '@/http/groups/get-group'
import { animations } from '@/utils/animations'

import { ConfirmDrawParticipantsModal } from './_confirm-draw-participants-modal'

export function GroupHeader({
  isPending,
  data,
}: {
  isPending: boolean
  data: GetGroup200 | undefined
}) {
  const [
    isConfirmDrawParticipantsModalOpen,
    setIsConfirmDrawParticipantsModalOpen,
  ] = useState(false)

  const { dictionary } = useLanguage()

  const { mutateAsync, isPending: isGeneratingMatches } = useMutation({
    mutationFn: (groupId: string) => generateMatches({ groupId }),
  })

  async function handleDraw() {
    if (data) {
      if (data.group.membersCount % 2)
        return toast.error(
          'You need to have an even number of participants to draw',
        )

      await mutateAsync(data.group.id)

      toast.success(dictionary.matchesGeneratedSuccessfully, {
        action: {
          label: dictionary.wannaSeeYours,
          onClick: () => {
            document.getElementById('view-my-match')?.focus({
              preventScroll: false,
            })
          },
        },
      })
    }
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-3 sm:gap-4 lg:gap-6 2xl:gap-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={animations.slideIn}
          viewport={{ once: true }}
          className="flex items-center gap-3 sm:gap-4 lg:gap-6 2xl:gap-8"
        >
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 2xl:gap-8">
            {!isPending && data?.group.avatarUrl ? (
              <Avatar className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 2xl:h-16 2xl:w-16 flex-shrink-0">
                <AvatarFallback>{data.group.name[0]}</AvatarFallback>
              </Avatar>
            ) : (
              <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 2xl:h-16 2xl:w-16 rounded-full flex-shrink-0" />
            )}

            <div className="flex flex-col gap-1.5 sm:gap-2">
              <h1 className="font-poppins text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-bold truncate max-w-[200px] sm:max-w-xs lg:max-w-lg 2xl:max-w-2xl">
                {data?.group.name}
              </h1>
              <span className="text-xs sm:text-sm lg:text-base text-muted-foreground line-clamp-2 max-w-[250px] sm:max-w-md lg:max-w-xl 2xl:max-w-2xl">
                {data?.group.description}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          variants={animations.slideInRight}
          viewport={{ once: true }}
          className="flex items-center gap-2 sm:gap-3 lg:gap-4 w-full sm:w-auto justify-end"
        >
          {isPending ? (
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              <Button
                className="gap-2 text-xs sm:text-sm lg:text-base h-8 sm:h-9 lg:h-10"
                disabled
              >
                <Skeleton className="h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full" />
                <Skeleton className="h-4 w-20 sm:w-24 lg:w-28 rounded-md" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="h-8 sm:h-9 lg:h-10 w-8 sm:w-9 lg:w-10"
                disabled
              >
                <Skeleton className="h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="h-8 sm:h-9 lg:h-10 w-8 sm:w-9 lg:w-10"
                disabled
              >
                <Skeleton className="h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              <Button
                className="gap-2 text-xs sm:text-sm lg:text-base h-8 sm:h-9 lg:h-10"
                disabled={isGeneratingMatches}
                title={'draw participants'}
                onClick={() => setIsConfirmDrawParticipantsModalOpen(true)}
              >
                <CloverIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {isGeneratingMatches ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <span className="hidden sm:inline">
                      {dictionary.drawParticipants}
                    </span>
                    <span className="sm:hidden">{dictionary.draw}</span>
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                title="Group settings"
                size="icon"
                onClick={() => toast.info(dictionary.weAreWorkingOnItRightNow)}
                className="h-8 sm:h-9 lg:h-10 w-8 sm:w-9 lg:w-10"
              >
                <CogIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>

              <Button
                variant="outline"
                title="Delete group"
                size="icon"
                onClick={() => toast.info(dictionary.weAreWorkingOnItRightNow)}
                className="h-8 sm:h-9 lg:h-10 w-8 sm:w-9 lg:w-10"
              >
                <TrashIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
            </div>
          )}
        </motion.div>
      </div>

      <ConfirmDrawParticipantsModal
        isOpen={isConfirmDrawParticipantsModalOpen}
        onOpenChange={setIsConfirmDrawParticipantsModalOpen}
        onConfirm={handleDraw}
        isLoading={isGeneratingMatches}
      />
    </>
  )
}
