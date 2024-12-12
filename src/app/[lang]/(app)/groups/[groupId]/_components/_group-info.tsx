'use client'

import { motion } from 'framer-motion'
import {
  BellIcon,
  EyeIcon,
  GiftIcon,
  HandHeart,
  PencilIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useLanguage } from '@/context/language'
import type { GetGroupsGroupId200 } from '@/http/endpoints.schemas'

import { animations } from '../page'

export function GroupInfo({
  data,
  isPending,
}: {
  data: GetGroupsGroupId200 | undefined
  isPending: boolean
}) {
  const { dictionary } = useLanguage()

  return (
    <div className="w-full lg:w-3/4 2xl:w-3/4 gap-[1.2rem] lg:gap-[1.5rem] 2xl:gap-[3rem] flex flex-col h-full">
      <motion.div
        variants={animations.item}
        className="flex flex-col lg:flex-row gap-4 lg:gap-6 2xl:gap-10"
      >
        <Card className="w-full lg:w-2/3 shadow-md rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 2xl:pb-6">
            <CardTitle className="font-poppins text-base lg:text-lg 2xl:text-2xl flex items-center gap-2 2xl:gap-4">
              <GiftIcon className="h-4 w-4 lg:h-5 lg:w-5 2xl:h-8 2xl:w-8 text-primary" />
              {dictionary.giftBudgetLimit}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 2xl:h-12 2xl:w-12"
            >
              <PencilIcon className="h-4 w-4 2xl:h-6 2xl:w-6" />
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col justify-between 2xl:py-8">
            <div className="flex flex-col items-end gap-1 2xl:gap-3">
              {isPending ? (
                <div className="flex flex-col items-end gap-2 2xl:gap-4">
                  <Skeleton className="h-8 lg:h-10 2xl:h-14 w-[150px] 2xl:w-[250px]" />
                  <Skeleton className="h-3 lg:h-4 2xl:h-6 w-[200px] 2xl:w-[300px]" />
                </div>
              ) : (
                <>
                  <div className="flex items-baseline gap-2 2xl:gap-3">
                    <span className="text-2xl lg:text-4xl 2xl:text-6xl font-semibold tracking-tight">
                      R$ {data?.group.budget?.toLocaleString() ?? 0}
                    </span>
                    <span className="text-xs lg:text-sm 2xl:text-xl text-muted-foreground">
                      /per person
                    </span>
                  </div>
                  <span className="text-xs lg:text-sm 2xl:text-lg text-muted-foreground">
                    Set a budget to help guide gift choices
                  </span>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="w-full lg:w-1/3 shadow-md rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 2xl:pb-6">
            <CardTitle className="font-poppins text-base lg:text-lg 2xl:text-2xl flex items-center gap-2 2xl:gap-4">
              <HandHeart className="h-4 w-4 lg:h-5 lg:w-5 2xl:h-8 2xl:w-8 text-primary" />
              Secret Match
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-1 2xl:gap-3 justify-between 2xl:py-8">
            {isPending ? (
              <div className="flex flex-col gap-2 2xl:gap-4">
                <Skeleton className="h-4 2xl:h-6 w-[200px] 2xl:w-[300px]" />
                <Skeleton className="h-9 2xl:h-14 w-full" />
              </div>
            ) : (
              <div className="flex flex-col gap-2 2xl:gap-8">
                <p className="text-sm 2xl:text-lg text-muted-foreground">
                  {dictionary.findOutWhoToGift}
                </p>
                <Button
                  id="view-my-match"
                  variant="default"
                  className="w-full gap-2 2xl:text-xl"
                >
                  <EyeIcon className="h-4 w-4 2xl:h-6 2xl:w-6" />
                  {dictionary.viewMyMatch}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={animations.item}>
        <Card className="w-full shadow-md rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 2xl:pb-6">
            <CardTitle className="font-poppins text-base lg:text-lg 2xl:text-2xl flex items-center gap-2 2xl:gap-4">
              <BellIcon className="h-4 w-4 lg:h-5 lg:w-5 2xl:h-8 2xl:w-8 text-primary" />
              Announcements
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-1 2xl:gap-3 2xl:py-8">
            {isPending ? (
              <div className="flex flex-col gap-2 2xl:gap-4">
                <Skeleton className="h-4 2xl:h-6 w-[200px] 2xl:w-[300px]" />
                <Skeleton className="h-9 2xl:h-14 w-full" />
              </div>
            ) : (
              <>
                <p className="text-sm 2xl:text-lg text-muted-foreground">
                  No announcements yet. Stay tuned for updates from the group
                  owner.
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
