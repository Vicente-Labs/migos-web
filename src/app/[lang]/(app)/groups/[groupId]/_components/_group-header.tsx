'use client'

import { motion } from 'framer-motion'
import { CloverIcon, CogIcon, TrashIcon } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import type { GetGroupsGroupId200 } from '@/http/endpoints.schemas'

import { animations } from '../page'

export function GroupHeader({
  isPending,
  data,
}: {
  isPending: boolean
  data: GetGroupsGroupId200 | undefined
}) {
  return (
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
              disabled={!data?.group.members.length}
              title={
                !data?.group.members.length
                  ? 'Need members to draw'
                  : 'Draw participants'
              }
            >
              <CloverIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Draw participants</span>
              <span className="sm:hidden">Draw</span>
            </Button>

            <Button
              variant="outline"
              title="Group settings"
              size="icon"
              className="h-8 sm:h-9 lg:h-10 w-8 sm:w-9 lg:w-10"
            >
              <CogIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>

            <Button
              variant="outline"
              title="Delete group"
              size="icon"
              className="hover:bg-destructive hover:text-destructive-foreground h-8 sm:h-9 lg:h-10 w-8 sm:w-9 lg:w-10"
            >
              <TrashIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  )
}
