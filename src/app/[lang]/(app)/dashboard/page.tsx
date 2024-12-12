'use client'

import { motion } from 'framer-motion'
import { CalendarIcon, GiftIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Skeleton } from '@/components/ui/skeleton'
import { useSession } from '@/context/session'
import { useGetGroups } from '@/http/group'

export default function Dashboard() {
  const { user } = useSession()
  const { data, isLoading } = useGetGroups()

  if (!user) redirect('/')

  return (
    <main className="p-4 lg:p-8 flex flex-col gap-8 max-w-6xl mx-auto">
      <motion.div
        className="flex w-full items-center justify-between"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <h1 className="font-cooperBlack text-3xl">Groups</h1>
      </motion.div>

      <motion.div
        className="flex flex-col min-h-[calc(100vh-20rem)] items-start justify-start gap-8 px-4 lg:px-2 h-fit"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {isLoading && !data ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full h-fit">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-36 rounded-lg border bg-card p-4">
                <div className="flex items-start gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex flex-col gap-2 flex-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </div>
                <div className="mt-auto flex items-center justify-center gap-4">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : data?.groups.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full gap-4 py-12 h-full">
            <h2 className="text-foreground font-cooperBlack text-2xl">
              You are not yet part of a group
            </h2>
            <p className="text-muted-foreground font-poppins text-center text-sm">
              To create a new group, click on the "new group" button above.
            </p>

            <div className="relative size-[300px] lg:size-[500px] ml-12">
              <Image
                src="/snow-man.png"
                alt="Gifts"
                fill
                className="object-contain"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full h-fit">
            {data?.groups.map((group, i) => (
              <Link key={group.id} href={`/groups/${group.id}`}>
                <motion.div
                  className="flex flex-col h-36 cursor-pointer rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-full bg-muted flex-shrink-0" />
                    <div className="flex flex-col gap-1">
                      <h3 className="font-medium">{group.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {group.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      <span>
                        {new Date(group.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GiftIcon className="h-4 w-4" />
                      <span>
                        {new Date(group.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </motion.div>
    </main>
  )
}
