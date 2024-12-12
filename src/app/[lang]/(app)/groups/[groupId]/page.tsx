'use client'

import { motion } from 'framer-motion'
import { redirect, useParams } from 'next/navigation'

import { useSession } from '@/context/session'
import { useGetGroupsGroupId } from '@/http/group'

import { GroupHeader } from './_components/_group-header'
import { GroupInfo } from './_components/_group-info'
import { ParticipantsList } from './_components/_participants-list'

export const animations = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  },
  slideIn: {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0 },
    transition: { duration: 0.5, delay: 0.3 },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0 },
    transition: { duration: 0.5, delay: 0.3 },
  },
}

export default function GroupPage() {
  const { groupId } = useParams<{ groupId: string }>()
  const { user } = useSession()

  if (!user) redirect('/')

  const { data, isPending } = useGetGroupsGroupId(groupId)

  return (
    <motion.main
      variants={animations.container}
      initial="hidden"
      animate="show"
      className="p-3 sm:p-4 lg:p-6 2xl:p-8 flex flex-col justify-center gap-4 sm:gap-6 lg:gap-8 2xl:gap-12 w-full max-w-[1400px] min-h-[80vh] mx-auto"
    >
      <GroupHeader isPending={isPending} data={data} />

      <div className="flex flex-col lg:flex-row items-start justify-center gap-3 sm:gap-4 lg:gap-6 2xl:gap-8 h-full">
        <ParticipantsList
          ownerId={data?.group.ownerId}
          isPending={isPending}
          participants={data?.group.members}
        />

        <GroupInfo data={data} isPending={isPending} />
      </div>
    </motion.main>
  )
}
