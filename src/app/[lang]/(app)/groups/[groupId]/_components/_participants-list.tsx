import { motion } from 'framer-motion'
import {
  MoreVerticalIcon,
  PlusIcon,
  ShieldEllipsisIcon,
  TrashIcon,
  UsersIcon,
} from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import type { GetGroupsGroupId200 } from '@/http/endpoints.schemas'

import { animations } from '../page'

type Participant = Pick<
  GetGroupsGroupId200['group']['members'][number],
  'id' | 'name' | 'avatarUrl'
>

export function ParticipantsList({
  isPending,
  ownerId,
  participants,
}: {
  isPending: boolean
  ownerId: string | undefined
  participants: Participant[] | undefined
}) {
  const renderSkeletonParticipant = (index: number) => (
    <div
      key={index}
      className="flex items-center justify-between border-b border-border p-3 sm:p-4 lg:p-5 2xl:p-6"
    >
      <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-3 2xl:gap-4">
        <Skeleton className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 2xl:h-12 2xl:w-12 rounded-full" />
        <Skeleton className="h-2.5 sm:h-3 lg:h-4 2xl:h-6 w-[50px] sm:w-[60px] lg:w-[80px] 2xl:w-[120px]" />
      </div>
      <Skeleton className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 2xl:h-12 2xl:w-12" />
    </div>
  )

  const renderParticipant = (member: Participant) => (
    <motion.div
      key={member.id}
      variants={animations.item}
      className="flex items-center justify-between border-b border-border p-2 sm:p-4 lg:p-5 2xl:p-6 rounded-md hover:bg-muted/50 transition-colors duration-200"
    >
      <div className="flex items-center gap-1.5 sm:gap-2.5 lg:gap-3 2xl:gap-5 w-full">
        <Avatar className="h-6 w-6 sm:h-6 sm:w-6 lg:h-8 lg:w-8 2xl:h-12 2xl:w-12 ring-2 ring-primary/20 ring-offset-1 flex-shrink-0">
          <AvatarFallback className="bg-primary/10 text-primary font-medium text-[11px] sm:text-xs lg:text-sm 2xl:text-lg">
            {member.name[0]}
          </AvatarFallback>
        </Avatar>
        <span className="text-xs sm:text-xs lg:text-sm 2xl:text-lg justify-between w-full font-medium flex items-center gap-1 2xl:gap-3">
          {member.name}
          {member.id === ownerId && (
            <ShieldEllipsisIcon
              className="h-3 w-3 sm:h-3 sm:w-3 lg:h-4 lg:w-4 2xl:h-6 2xl:w-6 text-primary"
              aria-label="Group Owner"
            />
          )}
        </span>
      </div>
      {member.id !== ownerId && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="bg-transparent hover:bg-muted rounded-full p-1 sm:p-2 2xl:p-3 transition-colors duration-300 touch-manipulation"
              aria-label="Member options"
            >
              <MoreVerticalIcon className="h-3 w-3 sm:h-3 sm:w-3 lg:h-4 lg:w-4 2xl:h-6 2xl:w-6 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-40 sm:w-44 lg:w-48 2xl:w-64"
          >
            <DropdownMenuItem className="text-destructive focus:text-destructive gap-2 text-xs sm:text-sm 2xl:text-lg py-2.5">
              <TrashIcon className="h-3.5 w-3.5 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4 2xl:h-6 2xl:w-6" />
              Remove from group
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </motion.div>
  )

  return (
    <motion.div
      variants={animations.item}
      className="w-full lg:w-[320px] xl:w-[380px] 2xl:w-[450px] shadow-md rounded-lg min-h-[250px] sm:min-h-[275px] lg:min-h-[300px] 2xl:min-h-[500px]"
    >
      <Card className="flex flex-col h-full shadow-md rounded-lg min-h-[250px] sm:min-h-[275px] lg:min-h-[300px] 2xl:min-h-[500px]">
        <CardHeader className="p-4 sm:p-5 lg:p-6 2xl:p-10">
          <CardTitle className="flex items-center gap-1.5 sm:gap-2 2xl:gap-4 font-poppins text-sm sm:text-base lg:text-lg 2xl:text-2xl">
            <UsersIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5 2xl:h-7 2xl:w-7 text-primary" />
            Participants
            {participants && (
              <span className="text-[10px] sm:text-xs lg:text-sm 2xl:text-lg font-normal text-muted-foreground">
                ({participants.length})
              </span>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col flex-1 min-w-full p-3 sm:p-4 lg:p-6 2xl:p-10">
          <ScrollArea className="flex-1 w-full mb-3 sm:mb-4 2xl:mb-8">
            <div className="space-y-2 sm:space-y-2.5 lg:space-y-3 2xl:space-y-5">
              {isPending
                ? Array.from({ length: 3 }).map((_, i) =>
                    renderSkeletonParticipant(i),
                  )
                : participants?.map(renderParticipant)}
            </div>
          </ScrollArea>

          <Button
            variant="outline"
            className="w-full gap-1.5 sm:gap-2 2xl:gap-4 mt-auto text-xs sm:text-sm 2xl:text-lg"
          >
            <PlusIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4 2xl:h-6 2xl:w-6" />
            Add participants
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
