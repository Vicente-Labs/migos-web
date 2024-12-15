'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { redirect, useParams } from 'next/navigation'

import { useSession } from '@/context/session'
import { getGroup } from '@/http/groups/get-group'
import { animations } from '@/utils/animations'

import { GroupHeader } from './_components/_group-header'
import { GroupInfo } from './_components/_group-info'
import { ParticipantsList } from './_components/_participants-list'

export default function GroupPage() {
  const { groupId } = useParams<{ groupId: string }>()
  const { user } = useSession()

  if (!user) redirect('/')

  const { data, isPending } = useQuery({
    queryKey: ['group', groupId],
    queryFn: () => getGroup({ groupId }),
  })

  if (data && !('group' in data)) redirect('/')

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
