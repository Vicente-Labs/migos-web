import { motion } from 'framer-motion'
import {
  MoreVerticalIcon,
  PlusIcon,
  ShieldEllipsisIcon,
  TrashIcon,
  UsersIcon,
} from 'lucide-react'
import { toast } from 'sonner'

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
import { useLanguage } from '@/context/language'
import type { Member } from '@/http/groups/get-group'
import { animations } from '@/utils/animations'

type ParticipantsListProps = {
  isPending: boolean
  ownerId: string | undefined
  participants: Member[] | undefined
}

export function ParticipantsList({
  isPending,
  ownerId,
  participants,
}: ParticipantsListProps) {
  const { dictionary } = useLanguage()

  const renderSkeletonParticipant = (index: number) => (
    <div
      key={index}
      className="flex items-center justify-between border-b border-border p-2"
    >
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-2.5 w-[50px]" />
      </div>
      <Skeleton className="h-5 w-5" />
    </div>
  )

  const renderParticipant = (member: Member) => {
    const isOwner = member.id === ownerId

    return (
      <motion.div
        key={member.id}
        variants={animations.item}
        className="flex items-center justify-between border-b border-border p-2 rounded-md hover:bg-muted/50 transition-colors duration-200"
      >
        <div className="flex items-center gap-2 w-full">
          <Avatar className="h-6 w-6 ring-1 ring-primary/20 ring-offset-1 flex-shrink-0">
            <AvatarFallback className="bg-primary/10 text-primary font-medium text-[11px]">
              {member.name[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs font-medium flex items-center gap-1 justify-between w-full">
            {member.name}
            {isOwner && (
              <ShieldEllipsisIcon
                className="h-3 w-3 text-primary"
                aria-label="Group Owner"
              />
            )}
          </span>
        </div>
        {!isOwner && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="bg-transparent hover:bg-muted rounded-full p-1 transition-colors duration-300 touch-manipulation"
                aria-label="Member options"
              >
                <MoreVerticalIcon className="h-3 w-3 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem className="text-destructive focus:text-destructive gap-2 text-xs py-2">
                <TrashIcon className="h-3.5 w-3.5" />
                Remove from group
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </motion.div>
    )
  }

  const participantCount = participants?.length ?? 0

  return (
    <motion.div
      variants={animations.item}
      className="w-full lg:w-[320px] xl:w-[380px]"
    >
      <Card className="h-[calc(280px+1rem)] shadow-md">
        <CardHeader className="p-3 h-[68px]">
          <CardTitle className="flex items-center gap-1.5 font-poppins text-sm">
            <UsersIcon className="h-3.5 w-3.5 text-primary" />
            Participants
            {!isPending && (
              <span className="text-[10px] font-normal text-muted-foreground">
                ({participantCount})
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 flex flex-col h-[222px]">
          <ScrollArea className="flex-1 w-full mb-3 h-[180px]">
            <div className="space-y-2">
              {isPending
                ? Array.from({ length: 3 }).map((_, i) =>
                    renderSkeletonParticipant(i),
                  )
                : participants?.map(renderParticipant)}
            </div>
          </ScrollArea>
          <Button
            variant="outline"
            className="w-full gap-1.5 h-8 text-xs"
            onClick={() => toast.info(dictionary.weAreWorkingOnItRightNow)}
          >
            <PlusIcon className="h-3 w-3" />
            Add participants
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
